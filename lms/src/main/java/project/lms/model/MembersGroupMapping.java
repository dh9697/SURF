package project.lms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "membersGroupMapping")
public class MembersGroupMapping {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long groupMappingId;
	
	@ManyToOne
	@JoinColumn(name = "memberId", referencedColumnName = "memberId")
	private Member member;
	
	@ManyToOne
	@JoinColumn(name = "groupId", referencedColumnName = "groupId")
	private MembersGroup membersGroup;

	public MembersGroupMapping() {
		super();
	}

	public MembersGroupMapping(Long groupMappingId, Member member, MembersGroup membersGroup) {
		super();
		this.groupMappingId = groupMappingId;
		this.member = member;
		this.membersGroup = membersGroup;
	}

	public Long getGroupMappingId() {
		return groupMappingId;
	}

	public void setGroupMappingId(Long groupMappingId) {
		this.groupMappingId = groupMappingId;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public MembersGroup getMembersGroup() {
		return membersGroup;
	}

	public void setMembersGroup(MembersGroup membersGroup) {
		this.membersGroup = membersGroup;
	}
	
}
