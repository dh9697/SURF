package project.lms.dto;

public class ExamResultDto {
    private Long examResultId;
    private MemberDto member;
    private ExamDto exam;
    private Long examQuestionId;
    private Integer submittedAnswer;
    private boolean isCorrect;
    private Integer correctOptionIndex; // ExamQuestion 에서 가져온 정보
    private String wrongAnsExpl; // ExamQuestion 에서 가져온 정보

    // 기본 생성자
    public ExamResultDto() {
    }

	public ExamResultDto(Long examResultId, MemberDto member, ExamDto exam, Long examQuestionId,
			Integer submittedAnswer, boolean isCorrect, Integer correctOptionIndex, String wrongAnsExpl) {
		super();
		this.examResultId = examResultId;
		this.member = member;
		this.exam = exam;
		this.examQuestionId = examQuestionId;
		this.submittedAnswer = submittedAnswer;
		this.isCorrect = isCorrect;
		this.correctOptionIndex = correctOptionIndex;
		this.wrongAnsExpl = wrongAnsExpl;
	}

	public Long getExamResultId() {
		return examResultId;
	}

	public void setExamResultId(Long examResultId) {
		this.examResultId = examResultId;
	}

	public MemberDto getMember() {
		return member;
	}

	public void setMember(MemberDto member) {
		this.member = member;
	}

	public ExamDto getExam() {
		return exam;
	}

	public void setExam(ExamDto exam) {
		this.exam = exam;
	}

	public Long getExamQuestionId() {
		return examQuestionId;
	}

	public void setExamQuestionId(Long examQuestionId) {
		this.examQuestionId = examQuestionId;
	}

	public Integer getSubmittedAnswer() {
		return submittedAnswer;
	}

	public void setSubmittedAnswer(Integer submittedAnswer) {
		this.submittedAnswer = submittedAnswer;
	}

	public boolean isCorrect() {
		return isCorrect;
	}

	public void setIsCorrect(boolean isCorrect) {
		this.isCorrect = isCorrect;
	}

	public int getCorrectOptionIndex() {
		return correctOptionIndex;
	}

	public void setCorrectOptionIndex(int correctOptionIndex) {
		this.correctOptionIndex = correctOptionIndex;
	}

	public String getWrongAnsExpl() {
		return wrongAnsExpl;
	}

	public void setWrongAnsExpl(String wrongAnsExpl) {
		this.wrongAnsExpl = wrongAnsExpl;
	}

}
