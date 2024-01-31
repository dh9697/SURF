package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.Cart;
import project.lms.model.Member;

public interface CartRepository extends JpaRepository<Cart, Long> {

	Cart findByMember(Member member);
}
