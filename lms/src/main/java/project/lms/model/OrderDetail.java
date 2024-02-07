package project.lms.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

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
	
	// 만료일자를 넣을거면 content 보여질 때, qna질의응답 권한에 사용하기
	// ROLE_MEMBER의 의미? 필요없지 않나
	@Column
    private LocalDateTime expirationDate;

	public OrderDetail() {
		super();
	}

	public OrderDetail(Long orderDetailId, Order order, Course course, Integer quantity, BigDecimal price,
			LocalDateTime expirationDate) {
		super();
		this.orderDetailId = orderDetailId;
		this.order = order;
		this.course = course;
		this.quantity = quantity;
		this.price = price;
		this.expirationDate = expirationDate;
	}

	public Long getOrderDetailId() {
		return orderDetailId;
	}

	public void setOrderDetailId(Long orderDetailId) {
		this.orderDetailId = orderDetailId;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public Course getCourse() {
		return course;
	}

	public void setCourse(Course course) {
		this.course = course;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public LocalDateTime getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(LocalDateTime expirationDate) {
		this.expirationDate = expirationDate;
	}
	
	// 주문 생성 시 호출하여 만료일 설정
	public void setExpirationDateFromNow() {
		this.expirationDate = LocalDateTime.now().plusYears(1);
	}
}