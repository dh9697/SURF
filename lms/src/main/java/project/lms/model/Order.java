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
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime orderDate;
	
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
	
	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime paymentDate;
	
	@Column(nullable = false)
	private boolean paymentStatus;
	
	@Column
	private BigDecimal totalAmount;
	
	// 주문 처리중, 완료, 취소
	@Column
	private String status;

	public Order() {
		super();
	}

	public Order(Long orderId, Member member, LocalDateTime orderDate, String recipient, String address,
			String phoneNum, String email, String deliveryMessage, String paymentMethod, LocalDateTime paymentDate,
			boolean paymentStatus, BigDecimal totalAmount, String status) {
		super();
		this.orderId = orderId;
		this.member = member;
		this.orderDate = orderDate;
		this.recipient = recipient;
		this.address = address;
		this.phoneNum = phoneNum;
		this.email = email;
		this.deliveryMessage = deliveryMessage;
		this.paymentMethod = paymentMethod;
		this.paymentDate = paymentDate;
		this.paymentStatus = paymentStatus;
		this.totalAmount = totalAmount;
		this.status = status;
	}

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public LocalDateTime getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(LocalDateTime orderDate) {
		this.orderDate = orderDate;
	}

	public String getRecipient() {
		return recipient;
	}

	public void setRecipient(String recipient) {
		this.recipient = recipient;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhoneNum() {
		return phoneNum;
	}

	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDeliveryMessage() {
		return deliveryMessage;
	}

	public void setDeliveryMessage(String deliveryMessage) {
		this.deliveryMessage = deliveryMessage;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public LocalDateTime getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(LocalDateTime paymentDate) {
		this.paymentDate = paymentDate;
	}

	public boolean isPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(boolean paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public BigDecimal getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(BigDecimal totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
}
