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

import project.lms.model.Benefit;
import project.lms.service.BenefitService;

@RestController
@RequestMapping("/test")
@CrossOrigin(origins = "http://localhost:3000", 
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class BenefitController {

	private final BenefitService benefitService;

	@Autowired
	public BenefitController(BenefitService benefitService) {
		super();
		this.benefitService = benefitService;
	}
	
	@GetMapping("/benefit")
	public List<Benefit> getAllBenefits(){
		return benefitService.getAllBenefits();
	}
	
	@PostMapping("/benefit")
	public Benefit createBenefit(@RequestBody Benefit benefit) {
		return benefitService.createBenefit(benefit);
	}
	
}
