package project.lms.dto;

public class ExamResultDto {
	private Long examResultId;
    private MemberDto member;
    private ExamDto exam;
    private int submittedAnswer;
    private String wrongAnsExpl;
    private Long questionId;

    public ExamResultDto() {
    }

	public ExamResultDto(Long examResultId, MemberDto member, ExamDto exam, int submittedAnswer, String wrongAnsExpl,
			Long questionId) {
		super();
		this.examResultId = examResultId;
		this.member = member;
		this.exam = exam;
		this.submittedAnswer = submittedAnswer;
		this.wrongAnsExpl = wrongAnsExpl;
		this.questionId = questionId;
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

	public int getSubmittedAnswer() {
		return submittedAnswer;
	}

	public void setSubmittedAnswer(int submittedAnswer) {
		this.submittedAnswer = submittedAnswer;
	}

	public String getWrongAnsExpl() {
		return wrongAnsExpl;
	}

	public void setWrongAnsExpl(String wrongAnsExpl) {
		this.wrongAnsExpl = wrongAnsExpl;
	}

	public Long getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Long questionId) {
		this.questionId = questionId;
	}

}