package project.lms.model;

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
@Table(name = "withdrawal")
public class Withdrawal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long withdrawalId; 

    @ManyToOne
    @JoinColumn(name = "memberId", nullable = false)
    private Member member; 

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime withdrawalTime; 

    @Column(length = 255)
    private String reason; 

    // 기본 생성자
    public Withdrawal() {
        super();
    }

    // 전체 생성자
	public Withdrawal(Long withdrawalId, Member member, LocalDateTime withdrawalTime, String reason) {
		super();
		this.withdrawalId = withdrawalId;
		this.member = member;
		this.withdrawalTime = withdrawalTime;
		this.reason = reason;
	}

    // Getters and Setters
	public Long getWithdrawalId() {
		return withdrawalId;
	}

	public void setWithdrawalId(Long withdrawalId) {
		this.withdrawalId = withdrawalId;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public LocalDateTime getWithdrawalTime() {
		return withdrawalTime;
	}

	public void setWithdrawalTime(LocalDateTime withdrawalTime) {
		this.withdrawalTime = withdrawalTime;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}    
}
