package project.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import project.lms.dto.ResponseDto;
import project.lms.dto.MemberDto;
import project.lms.dto.MemberLoginDto;
import project.lms.service.impl.MemberServiceImpl;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins="http://localhost:3000",
methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class MemberController {

	private final MemberServiceImpl memberServiceImpl;

	@Autowired
	public MemberController(MemberServiceImpl memberServiceImpl) {
		super();
		this.memberServiceImpl = memberServiceImpl;
	}
	
	@PostMapping("/signup")
	public ResponseEntity<ResponseDto<Void>> signUp(@RequestBody @Valid MemberDto memberDto){
		return new ResponseEntity<ResponseDto<Void>>(
				memberServiceImpl.signUp(memberDto),HttpStatus.CREATED);
	}
	
	@PostMapping("/login")
	public ResponseEntity<ResponseDto<Void>> login(@RequestBody @Valid MemberLoginDto memberLoginDto){
		return new ResponseEntity<ResponseDto<Void>>(
				memberServiceImpl.login(memberLoginDto),HttpStatus.OK);
	}
}
