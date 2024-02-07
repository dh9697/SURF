package project.lms.dto;

import java.util.List;

import project.lms.model.ExamQuestion;

public class ExamQuestionDto {
	
	private Long examQuestionId;
	private Long examId;
	private String questParagraph;
	private String questionText;
	private List<String> options;
	private int correctOptionIndex;
	private String wrongAnsExpl;
	
	public ExamQuestionDto() {
		super();
	}

	public ExamQuestionDto(Long examQuestionId, Long examId, String questParagraph, String questionText, List<String> options,
			int correctOptionIndex, String wrongAnsExpl) {
		super();
		this.examQuestionId = examQuestionId;
		this.examId = examId;
		this.questParagraph = questParagraph;
		this.questionText = questionText;
		this.options = options;
		this.correctOptionIndex = correctOptionIndex;
		this.wrongAnsExpl = wrongAnsExpl;
	}

	public Long getExamQuestionId() {
		return examQuestionId;
	}

	public void setExamQuestionId(Long examQuestionId) {
		this.examQuestionId = examQuestionId;
	}

	public Long getExamId() {
		return examId;
	}

	public void setExamId(Long examId) {
		this.examId = examId;
	}
	
	public String getQuestParagraph() {
		return questParagraph;
	}

	public void setQuestParagraph(String questParagraph) {
		this.questParagraph = questParagraph;
	}

	public String getQuestionText() {
		return questionText;
	}

	public void setQuestionText(String questionText) {
		this.questionText = questionText;
	}

	public List<String> getOptions() {
		return options;
	}

	public void setOptions(List<String> options) {
		this.options = options;
	}

	public int getCorrectOptionIndex() {
		return correctOptionIndex;
	}

	public void setCorrectOptionIndex(int correctOptionIndex) {
		this.correctOptionIndex = correctOptionIndex;
	}

	public String getOptionAsString() {
		return String.join(",", this.options);
	}
	
	public String getWrongAnsExpl() {
		return wrongAnsExpl;
	}

	public void setWrongAnsExpl(String wrongAnsExpl) {
		this.wrongAnsExpl = wrongAnsExpl;
	}
	
	public static ExamQuestionDto from(ExamQuestion examQuestion) {
		if(examQuestion == null) return null;
		
		return new ExamQuestionDto(
				examQuestion.getExamQuestionId(),
				examQuestion.getExam().getExamId(),
				examQuestion.getQuestParagraph(),
				examQuestion.getQuestionText(),
				examQuestion.getOptions(),
				examQuestion.getCorrectOptionIndex(),
				examQuestion.getWrongAnsExpl());
	}
	
}