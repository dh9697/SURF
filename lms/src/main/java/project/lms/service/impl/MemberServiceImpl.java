package project.lms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import project.lms.dto.BaseResponse;
import project.lms.dto.MemberDto;
import project.lms.exception.InvalidRequestException;
import project.lms.model.Member;
import project.lms.repository.MemberRepository;
import project.lms.service.MemberService;

@Service
@Transactional
public class MemberServiceImpl implements MemberService {

	private final MemberRepository memberRepository;
	
	@Autowired
	public MemberServiceImpl(MemberRepository memberRepository) {
		super();
		this.memberRepository = memberRepository;
	}
	
	@Override
	public BaseResponse<Void> signUp(MemberDto memberDto){
		Member member = memberRepository.findByLoginId(memberDto.getLoginId());
		if(member != null) {
			throw new InvalidRequestException(memberDto.getLoginId(), message: "이미 등록된 ID 입니다.");
		}
		member = new Member();
		Member.setMemberId(null);
		member.setLoginId(memberDto.getLoginId());
		member.setPassword(memberDto.getPassword());
		member.setName(memberDto.getName());
		member.setBirthDate(memberDto.getBirthDate());
		member.setGender(memberDto.getGender());
		member.setNationality(memberDto.getNationality());
		member.setEmail(memberDto.getEmail());
		member.setPhoneNum(memberDto.getPhoneNum());
	}
}
