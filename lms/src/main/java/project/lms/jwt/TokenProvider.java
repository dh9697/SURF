package project.lms.jwt;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;

@Component
public class TokenProvider implements InitializingBean {

	private final Logger logger = LoggerFactory.getLogger(TokenProvider.class);
	private static final String AUTHORITIES_KEY = "auth";
	private final String secret;
	private final long tokenValidityMilliseconds;
	private Key key;
	
	// @Value를 사용하면 application properties에서 찾아서 씀
	public TokenProvider(@Value("${jwt.secret}") String secret, 
			@Value("${jwt.token-validity-in-seconds}") long tokenValidityMilliseconds) {
		super();
		this.secret = secret;
		this.tokenValidityMilliseconds = tokenValidityMilliseconds * 1000;
	}
	
	@Override
	// value로 어플리케이션 프로퍼티에서 찾고 이니셜라이즈르 
	// 다 한 다음 동작하도록 그래야 secret을 읽을 수 있기 때문
	public void afterPropertiesSet() {
		byte[] keyBytes = Decoders.BASE64.decode(secret);
		this.key = Keys.hmacShaKeyFor(keyBytes);
	}
	
	// Authentication 로그인 시 토큰 정보
	public String createToken(Authentication authentication) {
		String authorities = authentication.getAuthorities().stream()
			.map(GrantedAuthority::getAuthority)
			.collect(Collectors.joining(","));
		
		long now = (new Date()).getTime();
		// 현재 시간 + 만료 시간 = 만료되었는지 validation
		Date validity = new Date(now + this.tokenValidityMilliseconds);
		
		return Jwts.builder()
			.setSubject(authentication.getName())
			.claim(AUTHORITIES_KEY, authorities)
			.signWith(key, SignatureAlgorithm.HS512)
			.setExpiration(validity)
			.compact();
	}
	
	// getAuthentication 토큰에서 다시 정보를 꺼내기
	public Authentication getAuthentication(String token) {
		Claims claims = Jwts
			.parserBuilder()
			.setSigningKey(key)
			.build()
			.parseClaimsJws(token)
			.getBody();
		
		Collection<? extends GrantedAuthority> authorities =
			Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
				.map(SimpleGrantedAuthority::new)
				.collect(Collectors.toList());
		User principal = new User(claims.getSubject(), "", authorities);
		return new UsernamePasswordAuthenticationToken(principal, null, authorities);
	}
	
	// 토큰의 validation
	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return true;
		// 토큰이 위조되었거나 변경되었을 때
		} catch (SecurityException | MalformedJwtException e){
			logger.info("잘못된 JWT 서명입니다.");
		// 토큰이 만료된 경우	
		} catch (ExpiredJwtException e) {
			logger.info("만료된 JWT 토큰입니다.");
		// JWT 토큰이 예상과 다른 형식이거나 지원되지 않는 알고리즘을 사용하는 경우.	
		} catch (UnsupportedJwtException e) {
			logger.info("지원되지 않는 JWT 토큰입니다.");
		// null 또는 빈 문자열을 토큰으로 전달한 경우.	
		} catch (IllegalArgumentException e) {
			logger.info("JWT 토큰이 잘못되었습니다.");
		} 
		return false;
	}
}