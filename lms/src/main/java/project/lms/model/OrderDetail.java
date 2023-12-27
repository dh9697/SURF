package project.lms.model;

import java.math.BigDecimal;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "orderDetails")
public class OrderDetail {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long orderDetailId;
	
	@ManyToOne
	@JoinColumn(name = "orderId")
	private Order order;
	
	@ManyToOne
	@JoinColumn(name = "courseId")
	private Course course;
	
	@Column(nullable = false)
	private Integer quantity;
	
	@Column(nullable = false)
	private BigDecimal price;
}
