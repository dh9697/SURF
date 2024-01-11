package project.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import project.lms.dto.MemberLoginDto;
import project.lms.dto.ResponseDto;
import project.lms.dto.TokenDto;
import project.lms.enumstatus.ResultCode;
import project.lms.jwt.JwtFilter;
import project.lms.jwt.TokenProvider;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:3000",
methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class AuthController {

	private final TokenProvider tokenProvider;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	
	@Autowired
	public AuthController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder) {
		super();
		this.tokenProvider = tokenProvider;
		this.authenticationManagerBuilder = authenticationManagerBuilder;
	}
	
	@PostMapping("/authenticate")
	public ResponseEntity<ResponseDto<TokenDto>> authorize(@RequestBody @Valid MemberLoginDto memberLoginDto) {
		
		// 사용자 인증을 위한 토큰 생성
		UsernamePasswordAuthenticationToken authenticationToken =
				new UsernamePasswordAuthenticationToken(memberLoginDto.getLoginId(), memberLoginDto.getPassword());
		
		// 사용자 인증
		Authentication authentication = authenticationManagerBuilder.getObject()
				.authenticate(authenticationToken);
		
		// SecurityContext에 인증 정보 설정
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		// JWT 토큰 생성
		String jwt = tokenProvider.createToken(authentication);
		
		// HTTP 헤더에 토큰 추가
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
		
		// 클라이언트에게 토큰을 담은 응답을 반환
		return new ResponseEntity<>(
				new ResponseDto<>(
						ResultCode.SUCCESS.name(),
						new TokenDto(jwt),
						ResultCode.SUCCESS.getMsg()
						), httpHeaders, HttpStatus.OK);			
	}
}
