package project.lms.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import project.lms.exception.InvalidRequestException;
import project.lms.model.Member;
import project.lms.repository.MemberRepository;

@Component("memberDetailsService")
public class MemberDetailService implements UserDetailsService{

	private final MemberRepository memberRepository;

	public MemberDetailService(MemberRepository memberRepository) {
		super();
		this.memberRepository = memberRepository;
	}
	
	@Override
	@org.springframework.transaction.annotation.Transactional
	// Spring Security에서 UserDetailsService를 구현할 때 loadUserByUsername 메소드 사용
	public UserDetails loadUserByUsername(final String loginId) {
		return memberRepository.findOneWithAuthoritiesByLoginId(loginId)
				.map(member -> createMember(loginId, member))
				.orElseThrow(() -> new InvalidRequestException(loginId, 
						loginId + "를 데이터베이스에서 찾을 수 없습니다."));
	}
	
	private User createMember(String loginId, Member member) {
		if(!member.isActive()) {
			throw new RuntimeException(loginId + " 활성화 되어 있지 않습니다.");
		}
		
		List<GrantedAuthority> grantedAuthorities = member.getAuthorities().stream()
				.map(authority -> new SimpleGrantedAuthority(authority.getAuthorityName()))
				.collect(Collectors.toList());
		return new User(member.getLoginId(),
				member.getPassword(), grantedAuthorities);
	}
}