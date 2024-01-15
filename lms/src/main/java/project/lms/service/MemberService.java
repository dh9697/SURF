package project.lms.service;

import project.lms.dto.ResponseDto;
import project.lms.dto.MemberDto;
import project.lms.dto.MemberLoginDto;

public interface MemberService {
	
	public ResponseDto<MemberDto> signUp(MemberDto memberDto);
	public ResponseDto<MemberLoginDto> login(MemberLoginDto memberLoginDto);
	public MemberDto getMemberWithAuthorities(String loginId);
	public MemberDto getCurrentMemberWithAuthorities();
	public void withdrawalMember(Long memberId, String withdrawReason);
}
