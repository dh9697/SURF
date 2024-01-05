package project.lms.exception;

import java.util.HashMap;
import java.util.Map;

import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

// 우선 순위 정하기 위해
@Order(Ordered.HIGHEST_PRECEDENCE)
// 새로운 예외 상황을 만들기 위해
@ControllerAdvice
public class CustomExceptionHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	protected ResponseEntity<ResponseDto<Map<String, String>>> handleValidationExceptions(MethodArgumentNotValidException ex){
		Map<String, String> errors = new HashMap<String, String>();
		ex.getBindingResult().getAllErrors().forEach(error -> {
			String filedName = ((FieldError) error).getField();
			String errorMessage = error.getDefaultMessage();
			errors.put(filedName, errorMessage != null ? errorMessage
					: "No Exception Message");
		});
		return new ResponseEntity<>(new ResponseDto<>(
				ResultCode.ERROR.name(),
				errors,
				ResultCode.ERROR.getMsg()
		), HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(InvalidRequestException.class)
    protected ResponseEntity<ResponseDto<Map<String, String>>> handleInvalidIdException(InvalidRequestException ex) {
        Map<String, String> errors = Map.of(ex.getFieldName(),
                (ex.getMessage() != null ? ex.getMessage() : "No Exception Message"));
        return new ResponseEntity<>(new ResponseDto<>(
                ResultCode.ERROR.name(),
                errors,
                ResultCode.ERROR.getMsg()
        ), HttpStatus.BAD_REQUEST);
    }
}
