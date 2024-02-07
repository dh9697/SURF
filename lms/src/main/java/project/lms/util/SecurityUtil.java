package project.lms.util;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class SecurityUtil {

	private static final Logger logger = LoggerFactory.getLogger(SecurityUtil.class);
	
	private SecurityUtil() {}
	
	// 로그인 시 SecurityContextHolder 안의 정보로 loginId를 얻음
	public static Optional<String> getCurrentloginId(){
		final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		if(authentication == null) {
			logger.debug("Security Context에 인증 정보가 없습니다.");
			return Optional.empty();
		}
		
		String loginId = null;
		if(authentication.getPrincipal() instanceof UserDetails) {
			UserDetails springSecurityMember = (UserDetails) authentication.getPrincipal();
			loginId = springSecurityMember.getUsername();
		} else if (authentication.getPrincipal() instanceof String) {
			loginId = (String) authentication.getPrincipal();
		}
		return Optional.ofNullable(loginId);
	}
}