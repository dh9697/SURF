package project.lms.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.lms.dto.ResponseDto;
import project.lms.dto.MemberDto;
import project.lms.dto.MemberLoginDto;
import project.lms.dto.MemberSignUpDto;
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
	public ResponseDto<MemberSignUpDto> signUp(MemberSignUpDto memberSignUpDto){
		if(memberRepository.findOneWithAuthoritiesByLoginId(memberSignUpDto.getLoginId()).orElse(null) != null) {
			throw new InvalidRequestException(memberSignUpDto.getLoginId(), "이미 등록된 ID 입니다.");
		}
		
		Authority authority = new Authority();
		authority.setAuthorityName("ROLE_USER");
		
		Member member = new Member();
		member.setMemberId(null);
		member.setAuthorities(Collections.singleton(authority));
		member.setLoginId(memberSignUpDto.getLoginId());
		member.setPassword(passwordEncoder.encode(memberSignUpDto.getPassword()));
		member.setName(memberSignUpDto.getName());
		member.setBirthDate(LocalDate.parse(memberSignUpDto.getBirthDate(),
				DateTimeFormatter.ofPattern("yyyy-MM-dd")));
		member.setGender(Gender.valueOf(memberSignUpDto.getGender()));
		member.setNationality(Nationality.valueOf(memberSignUpDto.getNationality()));
		member.setEmail(memberSignUpDto.getEmail());
		member.setPhoneNum(memberSignUpDto.getPhoneNum());
		member.setActive(true);
		member.setJoinDate(LocalDateTime.now());
		
		memberRepository.save(member);
		
		MemberSignUpDto createdMemberDto = MemberSignUpDto.from(member);
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
	
	// 모든 멤버 조회
	@Override
	public ResponseDto<List<MemberDto>> getAllSurfers() {
		List<Member> members = memberRepository.findAll();
	    List<MemberDto> memberDtos = members.stream()
	        .map(member -> MemberDto.from(member))
	        .collect(Collectors.toList());
	    
	    return new ResponseDto<List<MemberDto>>(
	            ResultCode.SUCCESS.name(),
	            memberDtos,
	            "모든 멤버 조회가 성공하였습니다.");
		
	}
	
	// user 조회
	@Override
	public ResponseDto<List<MemberDto>> getAllUsers() {
	    List<Member> users = memberRepository.findAllByAuthorities_AuthorityName("ROLE_USER");
	    List<MemberDto> userDtos = users.stream()
	        .map(MemberDto::from)
	        .collect(Collectors.toList());

	    return new ResponseDto<List<MemberDto>>(
	            ResultCode.SUCCESS.name(),
	            userDtos,
	            "모든 사용자 조회가 성공하였습니다.");
	}
	
	// member 조회
	@Override
	public ResponseDto<List<MemberDto>> getAllMembers() {
	    List<Member> members = memberRepository.findAllByAuthorities_AuthorityName("ROLE_MEMBER");
	    List<MemberDto> memberDtos = members.stream()
	        .map(MemberDto::from)
	        .collect(Collectors.toList());

	    return new ResponseDto<List<MemberDto>>(
	            ResultCode.SUCCESS.name(),
	            memberDtos,
	            "모든 멤버 조회가 성공하였습니다.");
	}
	
	// 강사 조회
	@Override
    public List<Member> getAllInstructors(){
		return memberRepository.findAllByAuthorities_AuthorityName("ROLE_INSTRUCTOR");
	}
	
	// admin 권한이 DB에서 member 정보를 찾아 옴
	@Transactional(readOnly = true)
	public MemberDto getMemberWithAuthorities(String loginId) {
		return MemberDto.from(memberRepository.findOneWithAuthoritiesByLoginId(loginId)
				.orElseThrow(() -> new InvalidRequestException(loginId, "member not found")));
	}
	
	// member, admin 상관없이 사용, SecurityContextHolder 안의 정보를 찾아옴
	@Transactional(readOnly = true)
	public MemberDto getCurrentMemberWithAuthorities() {
		return MemberDto.from(SecurityUtil.getCurrentloginId()
				.flatMap(memberRepository::findOneWithAuthoritiesByLoginId)
				.orElseThrow(() -> new InvalidRequestException("No current member", "member not found")));
	}
		
}