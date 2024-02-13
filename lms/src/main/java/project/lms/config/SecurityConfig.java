package project.lms.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import project.lms.exception.CustomExceptionHandler;
import project.lms.jwt.JwtAccessDeniedHandler;
import project.lms.jwt.JwtAuthenticationEntryPoint;
import project.lms.jwt.JwtFilter;
import project.lms.jwt.TokenProvider;

// 환경설정 클래스임을 명시
@Configuration
// 웹기반 보안 활성화
@EnableWebSecurity
// 메소드 수준의 보안 활성화
// 메소드 수준이란, 컨트롤러의 메소들마다 다른 수준의 보안을 가질 수 있도록 아래의 어노테이션을 사용
// @PreAuthorize, @Secured, @RollAllowed
@EnableMethodSecurity
public class SecurityConfig {
    
	private final TokenProvider tokenProvider;
	private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

	public SecurityConfig(TokenProvider tokenProvider, JwtAccessDeniedHandler jwtAccessDeniedHandler,
			JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint) {
		super();
		this.tokenProvider = tokenProvider;
		this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
		this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
	}

	@Bean
    // 라이브러리가 사용할 BCrypt 방식의 인코딩
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 환경설정하기 위해선 SecurityFilterChain을 만들어야 하고 Bean으로 정의해야 함
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
        		// session에서 쓰는 csrf 비활성화
                .csrf(csrf -> csrf.disable())
                
                // 예외 처리
                .exceptionHandling(exceptionHandling -> exceptionHandling
                		.accessDeniedHandler(jwtAccessDeniedHandler)
                		.authenticationEntryPoint(jwtAuthenticationEntryPoint))
                
                // RestAPI 보안 여부 설정
                .authorizeHttpRequests(authorizeHttpRequests -> authorizeHttpRequests
                		.requestMatchers("/api/signup").permitAll()
                		.requestMatchers("/api/login").permitAll()
                		.requestMatchers("/api/subject").permitAll()
                		.requestMatchers("/api/cart").permitAll()
                		.requestMatchers("/api/course/list").permitAll()
                		.requestMatchers("/api/course/list/{courseId}").permitAll()
                		.requestMatchers("/api/course/subject/{subjectId}").permitAll()
                		.requestMatchers("/api/content/course/{courseId}").permitAll()
                		.requestMatchers("/api/course-reviews/list/course/{courseId}").permitAll()
                		.requestMatchers("/api/content-histories/completed").permitAll()
                		// Token이 없다면 401 Unauthorized Error                  
                        .anyRequest().authenticated()
                )

                // sessionManagement 비활성화
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS))

                // login 성공했을 때 "/"로 보내라 (SPA면 없어도 상관없음)
                .formLogin(formLoginCustomizer -> formLoginCustomizer.defaultSuccessUrl("/"))

                // 커스텀 필터
                // token의 내용을 필터
                .addFilterBefore(
                        new JwtFilter(tokenProvider),
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}