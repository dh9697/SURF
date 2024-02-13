package project.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import project.lms.model.MemberBenefit;
import project.lms.service.MemberBenefitService;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins="http://localhost:3000",
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class MemberBenefitController {

	private final MemberBenefitService memberBenefitService;

	@Autowired
	public MemberBenefitController(MemberBenefitService memberBenefitService) {
		super();
		this.memberBenefitService = memberBenefitService;
	}
	
	@GetMapping("/memberbenefit")
	public List<MemberBenefit> getAllMemberBenefits(){
		return memberBenefitService.getAllMemberBenefits();
	}
	
	@PostMapping("/memberbenefit")
	public MemberBenefit createMemberBenefit(@RequestBody MemberBenefit memberBenefit) {
		return memberBenefitService.createMemberBenefit(memberBenefit);
	}
}
