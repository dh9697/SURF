package project.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import project.lms.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
