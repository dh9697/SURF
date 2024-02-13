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
@Table(name = "memberBenefits")
public class MemberBenefit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long memberBenefitId;
	
	@ManyToOne
	@JoinColumn(name = "memberId")
	private Member member;
	
	@ManyToOne
	@JoinColumn(name = "benefitId")
	private Benefit benefit;
	
	@Column(nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private LocalDateTime dateReceived;
	
	@Column(nullable = false)
	private boolean isUsed;

	public MemberBenefit() {
		super();
	}

	public MemberBenefit(Long memberBenefitId, Member member, Benefit benefit, LocalDateTime dateReceived,
			boolean isUsed) {
		super();
		this.memberBenefitId = memberBenefitId;
		this.member = member;
		this.benefit = benefit;
		this.dateReceived = dateReceived;
		this.isUsed = isUsed;
	}

	public Long getMemberBenefitId() {
		return memberBenefitId;
	}

	public void setMemberBenefitId(Long memberBenefitId) {
		this.memberBenefitId = memberBenefitId;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public Benefit getBenefit() {
		return benefit;
	}

	public void setBenefit(Benefit benefit) {
		this.benefit = benefit;
	}

	public LocalDateTime getDateReceived() {
		return dateReceived;
	}

	public void setDateReceived(LocalDateTime dateReceived) {
		this.dateReceived = dateReceived;
	}

	public boolean isUsed() {
		return isUsed;
	}

	public void setUsed(boolean isUsed) {
		this.isUsed = isUsed;
	}
	
}
