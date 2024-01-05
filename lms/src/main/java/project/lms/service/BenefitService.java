package project.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import project.lms.model.Benefit;
import project.lms.repository.BenefitRepository;

@Service
public class BenefitService {

	private final BenefitRepository benefitRepository;

	public BenefitService(BenefitRepository benefitRepository) {
		super();
		this.benefitRepository = benefitRepository;
	}
	
	public List<Benefit> getAllBenefits(){
		return benefitRepository.findAll();
	}
	
	public Benefit createBenefit(Benefit benefit) {
		return benefitRepository.save(benefit);
	}
}
