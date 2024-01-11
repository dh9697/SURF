package project.lms.exception;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// 우선 순위 정하기 위해
@Order(Ordered.HIGHEST_PRECEDENCE)
// 새로운 예외 상황을 만들기 위해
@ControllerAdvice
public class CustomExceptionHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	protected ResponseEntity<ResponseDto<Map<String, String>>> handleValidationExceptions
		(MethodArgumentNotValidException ex){
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
    protected ResponseEntity<ResponseDto<Map<String, String>>> handleInvalidIdException
    	(InvalidRequestException ex) {
			Map<String, String> errors = Map.of(ex.getFieldName(),
                (ex.getMessage() != null ? ex.getMessage() : "No Exception Message"));
        
		return new ResponseEntity<>(new ResponseDto<>(
                ResultCode.ERROR.name(),
                errors,
                ResultCode.ERROR.getMsg()
        ), HttpStatus.BAD_REQUEST);
    }
	
	// 유효한 자격증명을 제공하지 않고 접근하려 할때 401
	@ExceptionHandler(AuthenticationException.class)
	protected ResponseEntity<ResponseDto<String>> handleAuthenticationEntryPoint
		(HttpServletRequest request, HttpServletResponse response, AuthenticationException authenticationException)
		throws IOException {
		return new ResponseEntity<>(new ResponseDto<>(
				ResultCode.ERROR.name(),
				null,
				ResultCode.ERROR.getMsg()
		),HttpStatus.UNAUTHORIZED);
	}
	
	//필요한 권한이 없이 접근하려 할때 403
	@ExceptionHandler(AccessDeniedException.class)
	protected ResponseEntity<ResponseDto<String>> handleAccessDeniedException
		(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException)
		throws IOException {
		return new ResponseEntity<>(new ResponseDto<>(
				ResultCode.ERROR.name(),
				null,
				ResultCode.ERROR.getMsg()
		), HttpStatus.FORBIDDEN);
	}
	
}
