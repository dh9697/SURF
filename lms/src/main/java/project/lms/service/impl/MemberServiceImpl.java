package project.lms.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.lms.dto.ResponseDto;
import project.lms.dto.MemberDto;
import project.lms.dto.MemberLoginDto;
import project.lms.enumstatus.Gender;
import project.lms.enumstatus.Nationality;
import project.lms.enumstatus.ResultCode;
import project.lms.exception.InvalidRequestException;
import project.lms.model.Authority;
import project.lms.model.Member;
import project.lms.model.Withdrawal;
import project.lms.repository.MemberRepository;
import project.lms.repository.WithdrawalRepository;
import project.lms.service.MemberService;
import project.lms.util.SecurityUtil;

@Service
public class MemberServiceImpl implements MemberService {

	@Autowired
	private final MemberRepository memberRepository;
	
	@Autowired
	private final WithdrawalRepository withdrawalRepository;
	
	private final PasswordEncoder passwordEncoder;
	
	public MemberServiceImpl(MemberRepository memberRepository, WithdrawalRepository withdrawalRepository,
			PasswordEncoder passwordEncoder) {
		super();
		this.memberRepository = memberRepository;
		this.withdrawalRepository = withdrawalRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Transactional
	public ResponseDto<MemberDto> signUp(MemberDto memberDto){
		if(memberRepository.findOneWithAuthoritiesByLoginId(memberDto.getLoginId()).orElse(null) != null) {
			throw new InvalidRequestException(memberDto.getLoginId(), "이미 등록된 ID 입니다.");
		}
		
		Authority authority = new Authority();
		authority.setAuthorityName("ROLE_USER");
		
		Member member = new Member();
		member.setMemberId(null);
		member.setAuthorities(Collections.singleton(authority));
		member.setLoginId(memberDto.getLoginId());
		member.setPassword(passwordEncoder.encode(memberDto.getPassword()));
		member.setName(memberDto.getName());
		member.setBirthDate(LocalDate.parse(memberDto.getBirthDate(),
				DateTimeFormatter.ofPattern("yyyy-MM-dd")));
		member.setGender(Gender.valueOf(memberDto.getGender()));
		member.setNationality(Nationality.valueOf(memberDto.getNationality()));
		member.setEmail(memberDto.getEmail());
		member.setPhoneNum(memberDto.getPhoneNum());
		member.setActive(true);
		member.setJoinDate(LocalDateTime.now());
		
		memberRepository.save(member);
		
		// 회원가입 성공 후 해당 회원 정보 뜨게
		MemberDto createdMemberDto = MemberDto.from(member);
		return new ResponseDto<>(
				ResultCode.SUCCESS.name(),
				createdMemberDto,
				"회원가입이 성공하였습니다.");
	}

	@Override
	public ResponseDto<MemberLoginDto> login(MemberLoginDto memberLoginDto){
		Member member = memberRepository.findByLoginId(memberLoginDto.getLoginId());
		if(member != null &&
				 passwordEncoder.matches(memberLoginDto.getPassword(), member.getPassword())) {
			return new ResponseDto<MemberLoginDto>(
					ResultCode.SUCCESS.name(),
					memberLoginDto,
					"로그인이 성공하였습니다.");
		}else {
			throw new InvalidRequestException("Invalid Id / Password", "ID 또는 Password가 올바르지 않습니다.");
		}
	}
	
	// admin 권한이 DB에서 member 정보를 찾아 옴
	@Transactional(readOnly = true)
	public MemberDto getMemberWithAuthorities(String loginId) {
		return MemberDto.from(memberRepository.findOneWithAuthoritiesByLoginId(loginId).orElseThrow(() -> new InvalidRequestException(loginId, "member not found")));
	}
	
	// member, admin 상관없이 사용, SecurityContextHolder 안의 정보를 찾아옴
	@Transactional(readOnly = true)
	public MemberDto getCurrentMemberWithAuthorities() {
		return MemberDto.from(SecurityUtil.getCurrentloginId().flatMap(memberRepository::findOneWithAuthoritiesByLoginId).orElseThrow(() -> new InvalidRequestException("No current member", "member not found")));
	}
	
	// 회원 탈퇴
	@Transactional
	public void withdrawalMember(Long memberId, String withdrawReason) {
		Member member = memberRepository.findById(memberId).orElse(null);
		
		if(member != null) {
			member.setActive(false);
			memberRepository.save(member);
		}
		
		Withdrawal withdrawal = new Withdrawal();
		withdrawal.setMember(member);
		withdrawal.setWithdrawalTime(LocalDateTime.now());
		withdrawal.setReason(withdrawReason);
		withdrawalRepository.save(withdrawal);
	}
		
}