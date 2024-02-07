package project.lms.service;

import project.lms.dto.ResponseDto;
import project.lms.dto.WithdrawalDto;

public interface WithdrawalService {
	
	ResponseDto<WithdrawalDto> withdrawal(WithdrawalDto withdrawalDto);
	
}