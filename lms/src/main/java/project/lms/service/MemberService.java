package project.lms.service;

import project.lms.dto.ResponseDto;
import project.lms.model.Member;

import java.util.List;

import project.lms.dto.MemberDto;
import project.lms.dto.MemberLoginDto;
import project.lms.dto.MemberSignUpDto;

public interface MemberService {
	
	public ResponseDto<MemberSignUpDto> signUp(MemberSignUpDto memberSignUpDto);
	
	public ResponseDto<MemberLoginDto> login(MemberLoginDto memberLoginDto);
	
	public MemberDto getMemberWithAuthorities(String loginId);
	
	public MemberDto getCurrentMemberWithAuthorities();
	
	public List<Member> getAllInstructors();
	public ResponseDto<List<MemberDto>> getAllSurfers();
	public ResponseDto<List<MemberDto>> getAllMembers();
	public ResponseDto<List<MemberDto>> getAllUsers();
}