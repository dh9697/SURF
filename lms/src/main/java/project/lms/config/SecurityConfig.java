package project.lms.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

// 환경설정 클래스임을 명시
@Configuration
// 웹기반 보안 활성화
@EnableWebSecurity
public class SecurityConfig {
    
    public SecurityConfig() {
        super();
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
//                .exceptionHandling(exceptionHandling -> exceptionHandling
//                        .accessDeniedHandler(jwtAccessDeniedHandler)
//                        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
//                )
                
                // RestAPI 보안 여부 설정
                .authorizeHttpRequests(authorizeHttpRequests -> authorizeHttpRequests
                        .requestMatchers("/test/member").permitAll()
                        // Token이 없다면 401 Unauthorized Error
                        // Postman에서 Auth의 Type을 Bearer Token으로 바꾸고 Token값을 넣어주면 볼 수 있음
                        // .requestMatchers("/api/board").permitAll()
                        .anyRequest().authenticated()
                )

                // sessionManagement 비활성화
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS))

                // login 성공했을 때 "/"로 보내라 (SPA면 없어도 상관없음)
                .formLogin(formLoginCustomizer -> formLoginCustomizer.defaultSuccessUrl("/"));

                // 커스텀 필터
                // token의 내용을 필터
//                .addFilterBefore(
//                        new JwtFilter(tokenProvider),
//                        UsernamePasswordAuthenticationFilter.class
//                );

        return http.build();
    }
}