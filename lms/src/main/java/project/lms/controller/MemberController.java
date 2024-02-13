package project.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

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
import project.lms.model.Member;
import project.lms.dto.MemberDto;
import project.lms.dto.MemberSignUpDto;
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
	public ResponseEntity<ResponseDto<MemberSignUpDto>> signUp(@RequestBody @Valid MemberSignUpDto memberSignUpDto) {
		ResponseDto<MemberSignUpDto> responseDto = memberService.signUp(memberSignUpDto);
		return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
	}
	
	// 모든 사용자 조회
	@GetMapping("/surfer/list")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<ResponseDto<List<MemberDto>>> getAllSurfers(){
		ResponseDto<List<MemberDto>> sufers = memberService.getAllSurfers();
		return new ResponseEntity<>(sufers, HttpStatus.OK);
	}
	
	// 멤버 조회
	@GetMapping("/member/list")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<ResponseDto<List<MemberDto>>> getAllMembers(){
		ResponseDto<List<MemberDto>> members = memberService.getAllMembers();
		return new ResponseEntity<>(members, HttpStatus.OK);
	}
	
	// 유저 조회
	@GetMapping("/user/list")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<ResponseDto<List<MemberDto>>> getAllUsers(){
		ResponseDto<List<MemberDto>> users = memberService.getAllUsers();
		return new ResponseEntity<>(users, HttpStatus.OK);
	}
	
	// 강사의 정보
	@GetMapping("/instructor/list")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<List<Member>> getAllInstructors() {
		List<Member> instructors = memberService.getAllInstructors();
		return ResponseEntity.ok(instructors);
	}
	
	
	// 현재 로그인한 토큰 주인의 정보
	@GetMapping("/dashboard/{loginId}")
	@PreAuthorize("hasAnyRole('USER','MEMBER','INSTRUCTOR','ADMIN')")
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