package project.lms.service;

import project.lms.dto.ResponseDto;
import project.lms.dto.MemberDto;
import project.lms.dto.MemberLoginDto;

public interface MemberService {
	
	public ResponseDto<Void> signUp(MemberDto memberDto);
	public ResponseDto<Void> login(MemberLoginDto memberLoginDto);
	
}
