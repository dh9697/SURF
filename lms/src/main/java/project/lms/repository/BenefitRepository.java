package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.Benefit;

public interface BenefitRepository extends JpaRepository<Benefit, Long> {

}
