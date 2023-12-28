package project.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import project.lms.model.Member;
import project.lms.repository.MemberRepository;

@Service
public class MemberService {

	private final MemberRepository memberRepository;
	
	public MemberService(MemberRepository memberRepository) {
		this.memberRepository = memberRepository;
	}
	
	public List<Member> getAllMembers() {
		return memberRepository.findAll();
	}
	
	public Member createMember(Member member) {
		return memberRepository.save(member);
	}
}
