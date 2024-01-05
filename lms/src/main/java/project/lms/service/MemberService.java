package project.lms.service;

import project.lms.dto.BaseResponse;
import project.lms.dto.MemberDto;
import project.lms.dto.MemberLoginDto;

public interface MemberService {
	
	public BaseResponse<Void> signUp(MemberDto memberDto);
	public BaseResponse<Void> login(MemberLoginDto memberLoginDto);
	
}
