package project.lms.dto;

import java.util.List;

public class ExamQuestionDto {

	private Long examId;
	private String questionText;
	private List<String> options;
	private int correctOptionIndex;
	
	public ExamQuestionDto() {
		super();
	}
	
	public ExamQuestionDto(Long examId, String questionText, List<String> options, int correctOptionIndex) {
		super();
		this.examId = examId;
		this.questionText = questionText;
		this.options = options;
		this.correctOptionIndex = correctOptionIndex;
	}
	
	public Long getExamId() {
		return examId;
	}

	public void setExamId(Long examId) {
		this.examId = examId;
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
	
	
}
