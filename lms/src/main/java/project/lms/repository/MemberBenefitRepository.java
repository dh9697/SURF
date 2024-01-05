package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.MemberBenefit;

public interface MemberBenefitRepository extends JpaRepository<MemberBenefit, Long> {

}
