package project.lms.dto;

public class ResponseDto<T> {

	private String resultCode;
	private T data;
	private String message;
	
	public ResponseDto() {
		super();
	}
	
	public ResponseDto(String resultCode, T data, String message) {
		super();
		this.resultCode = resultCode;
		this.data = data;
		this.message = message;
	}
	
	public String getResultCode() {
		return resultCode;
	}
	public void setResultCode(String resultCode) {
		this.resultCode = resultCode;
	}
	public T getData() {
		return data;
	}
	public void setData(T data) {
		this.data = data;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
}
