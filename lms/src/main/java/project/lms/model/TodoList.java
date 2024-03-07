package project.lms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "TodoList")
public class TodoList {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long taskId;
	
	@ManyToOne
	@JoinColumn(name = "memberId", nullable = false)
	private Member member;
	
	private String taskName;
	
	private Boolean isCompleted = false;

	public TodoList() {
		super();
	}

	public TodoList(Long taskId, Member member, String taskName, Boolean isCompleted) {
		super();
		this.taskId = taskId;
		this.member = member;
		this.taskName = taskName;
		this.isCompleted = isCompleted;
	}

	public Long getTaskId() {
		return taskId;
	}

	public void setTaskId(Long taskId) {
		this.taskId = taskId;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public Boolean getIsCompleted() {
		return isCompleted;
	}

	public void setIsCompleted(Boolean isCompleted) {
		this.isCompleted = isCompleted;
	}
}
