package project.lms.controller;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

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
import project.lms.dto.AuthorityDto;
import project.lms.dto.MemberLoginDto;
import project.lms.dto.ResponseDto;
import project.lms.dto.TokenDto;
import project.lms.enumstatus.ResultCode;
import project.lms.jwt.JwtFilter;
import project.lms.jwt.TokenProvider;
import project.lms.model.LoginHistory;
import project.lms.model.Member;
import project.lms.repository.LoginHistoryRepository;
import project.lms.repository.MemberRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:3000",
methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class AuthController {

    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final LoginHistoryRepository loginHistoryRepository;  // LoginHistoryRepository 추가

    @Autowired
    private MemberRepository memberRepository;
    
    @Autowired
    public AuthController(TokenProvider tokenProvider, 
                          AuthenticationManagerBuilder authenticationManagerBuilder, 
                          LoginHistoryRepository loginHistoryRepository) { // 생성자에 LoginHistoryRepository 추가
        super();
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.loginHistoryRepository = loginHistoryRepository;  // 필드에 LoginHistoryRepository 추가
    }
	
    @PostMapping("/login")
    public ResponseEntity<ResponseDto<TokenDto>> authorize(@RequestBody @Valid MemberLoginDto memberLoginDto) {
        // 사용자 인증을 위한 토큰 생성
        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(memberLoginDto.getLoginId(), memberLoginDto.getPassword());
        
        // 사용자 인증
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        
        // SecurityContext에 인증 정보 설정
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        // JWT 토큰 생성
        String jwt = tokenProvider.createToken(authentication);
        
        // HTTP 헤더에 토큰 추가
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
        
        // 로그인 이력 생성 및 저장
        LoginHistory loginHistory = new LoginHistory();
        // loginId를 사용하여 Member 객체 불러오기
        Member member = memberRepository.findByLoginId(memberLoginDto.getLoginId()); 
        // 로그인 이력에 Member 객체를 설정
        loginHistory.setMember(member); 
        loginHistory.setLoginTime(LocalDateTime.now()); // 현재 시간을 로그인 시간으로 설정
        loginHistoryRepository.save(loginHistory); // 로그인 이력 저장

        // 로그인된 사용자의 권한 정보를 불러옴
        Set<AuthorityDto> authorityDtos = member.getAuthorities().stream()
        	    .map(authority -> new AuthorityDto(authority.getAuthorityName()))
        	    .collect(Collectors.toSet());
        	TokenDto tokenDto = new TokenDto(jwt, authorityDtos);
        tokenDto.setAuthorities(authorityDtos);

        // 클라이언트에게 토큰과 권한 정보를 담은 응답을 반환
        return new ResponseEntity<>(
            new ResponseDto<>(
                ResultCode.SUCCESS.name(),
                tokenDto,
                ResultCode.SUCCESS.getMsg()
            ), httpHeaders, HttpStatus.OK);    
    }
}
