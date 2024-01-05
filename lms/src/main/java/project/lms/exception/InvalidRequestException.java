package project.lms.exception;

public class InvalidRequestException {
	
	private String filedName;
	private String message;
	
	public InvalidRequestException(String filedName, String message) {
		super();
		this.filedName = filedName;
		this.message = message;
	}

	public String getFiledName() {
		return filedName;
	}

	public void setFiledName(String filedName) {
		this.filedName = filedName;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}
