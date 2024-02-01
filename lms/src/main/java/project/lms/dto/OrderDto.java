package project.lms.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class OrderDto {

	@NotBlank
	private String recipient;
	
	@NotBlank
    private String address;
	
	@NotBlank
	@Pattern(regexp = "^\\d{3}-\\d{4}-\\d{4}$", message = "올바른 전화번호 형식이 아닙니다.")
    private String phoneNum;
	
	@NotBlank
	@Email
    private String email;
	
    private String deliveryMessage;
	
	@NotBlank
    private String paymentMethod;

	public OrderDto() {
		super();
	}

	public OrderDto(@NotBlank String recipient, @NotBlank String address,
			@NotBlank @Pattern(regexp = "^\\d{3}-\\d{4}-\\d{4}$", message = "올바른 전화번호 형식이 아닙니다.") String phoneNum,
			@NotBlank @Email String email, @NotBlank String deliveryMessage, @NotBlank String paymentMethod) {
		super();
		this.recipient = recipient;
		this.address = address;
		this.phoneNum = phoneNum;
		this.email = email;
		this.deliveryMessage = deliveryMessage;
		this.paymentMethod = paymentMethod;
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
}
