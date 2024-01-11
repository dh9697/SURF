package project.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import project.lms.dto.MemberDto;
import project.lms.dto.MemberLoginDto;
import project.lms.service.MemberService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:3000",
methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class MemberController {

	private final MemberService memberService;
	
	@Autowired
	public MemberController(MemberService memberService) {
		super();
		this.memberService = memberService;
	}

	@PostMapping("/signup")
	public ResponseEntity<ResponseDto<MemberDto>> signUp(@RequestBody @Valid MemberDto memberDto) {
		ResponseDto<MemberDto> responseDto = memberService.signUp(memberDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
	}    
	
//	@PostMapping("/login")
//	public ResponseEntity<ResponseDto<MemberLoginDto>> login(@RequestBody @Valid MemberLoginDto memberLoginDto){
//		ResponseDto<MemberLoginDto> responseDto = memberService.login(memberLoginDto);
//		return ResponseEntity.ok(responseDto);
//	}
	
	// 현재 로그인한 토큰 주인의 정보
	@GetMapping("/member")
	@PreAuthorize("hasAnyRole('USER','ADMIN')")
	public ResponseEntity<ResponseDto<MemberDto>> getCurrentMemberInfo(HttpServletRequest request){
		return ResponseEntity.ok(new ResponseDto<>(
				ResultCode.SUCCESS.name(),
				memberService.getCurrentMemberWithAuthorities(),
				ResultCode.SUCCESS.getMsg()
		));
	}
	
	// ADMIN이 loginId로 얻는 정보
	@GetMapping("/member/{loginId}")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<ResponseDto<MemberDto>> getMemberInfo(@PathVariable String loginId){
		return ResponseEntity.ok(new ResponseDto<>(
				ResultCode.SUCCESS.name(),
				memberService.getMemberWithAuthorities(loginId),
				ResultCode.SUCCESS.getMsg()
		));
	}
}
