package project.lms.service.impl;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import project.lms.dto.ResponseDto;
import project.lms.dto.MemberDto;
import project.lms.dto.MemberLoginDto;
import project.lms.enumstatus.Gender;
import project.lms.enumstatus.Nationality;
import project.lms.enumstatus.ResultCode;
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
	
	public ResponseDto<Void> signUp(MemberDto memberDto){
		Member member = memberRepository.findByLoginId(memberDto.getLoginId());
		if(member != null) {
			throw new InvalidRequestException(memberDto.getLoginId(), "이미 등록된 ID 입니다.");
		}
		member = new Member();
		member.setMemberId(null);
		member.setLoginId(memberDto.getLoginId());
		member.setPassword(memberDto.getPassword());
		member.setName(memberDto.getName());
		member.setBirthDate(LocalDate.parse(memberDto.getBirthDate(),
				DateTimeFormatter.ofPattern("yyyy-MMMM-dd")));
		member.setGender(Gender.valueOf(memberDto.getGender()));
		member.setNationality(Nationality.valueOf(memberDto.getNationality()));
		member.setEmail(memberDto.getEmail());
		member.setPhoneNum(memberDto.getPhoneNum());
		
		memberRepository.save(member);
		return new ResponseDto<Void>(
				ResultCode.SUCCESS.name(),
				null,
				"회원가입이 성공하였습니다.");
	}
	
	@Override
	public ResponseDto<Void> login(MemberLoginDto memberLoginDto){
		Member member = memberRepository.findByLoginId(memberLoginDto.getLoginId());
		if(member != null &&
				member.getPassword().matches(memberLoginDto.getPassword())) {
			return new ResponseDto<Void>(
					ResultCode.SUCCESS.name(),
					null,
					"로그인이 성공하였습니다.");
		}else {
			throw new InvalidRequestException("Invalid Id / Password", "ID 또는 Password가 올바르지 않습니다.");
		}
	}
}