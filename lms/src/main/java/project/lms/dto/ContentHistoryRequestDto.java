package project.lms.dto;

public class ContentHistoryRequestDto {

	private Long memberId;
	private Long contentId;
	
	public ContentHistoryRequestDto() {
		super();
	}
	
	public ContentHistoryRequestDto(Long memberId, Long contentId) {
		super();
		this.memberId = memberId;
		this.contentId = contentId;
	}

	public Long getMemberId() {
		return memberId;
	}

	public void setMemberId(Long memberId) {
		this.memberId = memberId;
	}

	public Long getContentId() {
		return contentId;
	}

	public void setContentId(Long contentId) {
		this.contentId = contentId;
	}
}
