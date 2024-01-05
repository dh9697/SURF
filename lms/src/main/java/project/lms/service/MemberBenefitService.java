package project.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import project.lms.model.MemberBenefit;
import project.lms.repository.MemberBenefitRepository;

@Service
public class MemberBenefitService {
	
	private final MemberBenefitRepository memberBenefitRepository;

	public MemberBenefitService(MemberBenefitRepository memberBenefitRepository) {
		super();
		this.memberBenefitRepository = memberBenefitRepository;
	}
	
	public List<MemberBenefit> getAllMemberBenefits(){
		return memberBenefitRepository.findAll();
	}
	
	public MemberBenefit createMemberBenefit(MemberBenefit memberBenefit) {
		return memberBenefitRepository.save(memberBenefit);
	}

}
