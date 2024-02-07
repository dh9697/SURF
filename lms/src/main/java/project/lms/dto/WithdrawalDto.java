package project.lms.dto;

import jakarta.validation.constraints.NotBlank;

public class WithdrawalDto {

	@NotBlank(message = "회원 탈퇴 사유는 필수 입력 항목입니다.")
	private String withdrawalReason;
	
	public WithdrawalDto() {
		super();
	}

	public WithdrawalDto(String withdrawalReason) {
		super();
		this.withdrawalReason = withdrawalReason;
	}

	public String getWithdrawalReason() {
		return withdrawalReason;
	}

	public void setWithdrawalReason(String withdrawalReason) {
		this.withdrawalReason = withdrawalReason;
	}
	
	
}