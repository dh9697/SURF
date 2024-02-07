package project.lms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.Cart;
import project.lms.model.Course;
import project.lms.model.Member;

public interface CartRepository extends JpaRepository<Cart, Long> {

	List<Cart> findAllByMember(Member member);
	
	Cart findByMemberAndCourse(Member member, Course course);
	
}
