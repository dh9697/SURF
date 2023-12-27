package project.lms.model;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "orders")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long orderId;
	
	@ManyToOne
	@JoinColumn(name = "memberId")
	private Member member;
	
	@Column(nullable = false)
	private String recipient;
	
	@Column(nullable = false)
	private String address;
	
	@Column(nullable = false)
	private String phoneNum;
	
	@Column(nullable = false)
	private String email;
	
	@Column
	private String deliveryMessage;
	
	@Column(nullable = false)
	private String paymentMethod;
	
	@Column(nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime paymentDate;
	
	@Column(nullable = false)
	private boolean paymentStatus;
	
	@Column(nullable = false)
	private BigDecimal totalAmount;
	
	// 주문 처리중, 완료, 취소
	@Column(nullable = false)
	private String status;
}
