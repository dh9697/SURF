package project.lms.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.lms.dto.ResponseDto;
import project.lms.dto.WithdrawalDto;
import project.lms.enumstatus.ResultCode;
import project.lms.exception.InvalidRequestException;
import project.lms.model.Member;
import project.lms.model.Withdrawal;
import project.lms.repository.MemberRepository;
import project.lms.repository.WithdrawalRepository;
import project.lms.service.WithdrawalService;
import project.lms.util.SecurityUtil;

@Service
public class WithdrawalServiceImpl implements WithdrawalService{

	private final WithdrawalRepository withdrawalRepository;
	private final MemberRepository memberRepository;
	private final SecurityUtil securityUtil;

	@Autowired
	public WithdrawalServiceImpl(WithdrawalRepository withdrawalRepository, MemberRepository memberRepository,
			SecurityUtil securityUtil) {
		super();
		this.withdrawalRepository = withdrawalRepository;
		this.memberRepository = memberRepository;
		this.securityUtil = securityUtil;
	}

	@Transactional
	public ResponseDto<WithdrawalDto> withdrawal(WithdrawalDto withdrawalDto){
		Optional<String> currentLoginId = securityUtil.getCurrentloginId();
		
		if (currentLoginId.isPresent()) {
			String loginId = currentLoginId.get();
			project.lms.model.Member member = memberRepository.findByLoginId(loginId);
			
			if(member != null) {
				Withdrawal withdrawal = new Withdrawal();
				withdrawal.setMember(member);
				withdrawal.setReason(withdrawalDto.getWithdrawalReason());
				withdrawal.setWithdrawalTime(LocalDateTime.now());
				withdrawalRepository.save(withdrawal);
				
				member.setActive(false);
				memberRepository.save(member);
				
				return new ResponseDto<WithdrawalDto>(
						ResultCode.SUCCESS.name(),
						withdrawalDto,
						"회원 탈퇴가 성공하였습니다.");
			} else {
				throw new InvalidRequestException("Invalid Member", "멤버 정보를 찾을 수 없습니다.");
			}
		} else {
			throw new InvalidRequestException("No current login", "현재 로그인 정보를 찾을 수 없습니다.");
		}
	}
}