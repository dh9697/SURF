package project.lms.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.lms.dto.ExamHistoryDto;
import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import project.lms.exception.InvalidRequestException;
import project.lms.model.Content;
import project.lms.model.ExamHistory;
import project.lms.model.Member;
import project.lms.repository.ContentRepository;
import project.lms.repository.ExamHistoryRepository;
import project.lms.repository.MemberRepository;
import project.lms.service.ExamHistoryService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExamHistoryServiceImpl implements ExamHistoryService {

    private ExamHistoryRepository examHistoryRepository;
    private ContentRepository contentRepository;
    private MemberRepository memberRepository;
    
    @Autowired
    public ExamHistoryServiceImpl(ExamHistoryRepository examHistoryRepository, ContentRepository contentRepository, MemberRepository memberRepository) {
        this.examHistoryRepository = examHistoryRepository;
        this.contentRepository = contentRepository; // ContentRepository 초기화
        this.memberRepository = memberRepository; // MemberRepository 초기화
    }
    
    // 모든 시험 이력 조회
    @Override
    public ResponseDto<List<ExamHistoryDto>> getAllExamHistories(){
        List<ExamHistory> examHistories = examHistoryRepository.findAll();

        if(examHistories == null || examHistories.isEmpty()) {
            return new ResponseDto<>(
                    ResultCode.SUCCESS.name(),
                    null,
                    "시험 이력이 존재하지 않습니다.");
        } else {
            List<ExamHistoryDto> examHistoryDtos = examHistories.stream()
                    .map(ExamHistoryDto::from)
                    .collect(Collectors.toList());
            return new ResponseDto<>(
                    ResultCode.SUCCESS.name(),
                    examHistoryDtos,
                    "시험 이력 목록을 조회하였습니다.");
        }
    }

    // 특정 시험 이력 조회
    @Override
    public ResponseDto<ExamHistoryDto> getExamHistory(Long examHistoryId) {
        try {
            ExamHistory examHistory = examHistoryRepository.findById(examHistoryId)
                    .orElseThrow(() -> new InvalidRequestException("Exam history not found", "해당 시험 이력을 찾을 수 없습니다."));

            return new ResponseDto<>(
                    ResultCode.SUCCESS.name(),
                    ExamHistoryDto.from(examHistory),
                    "시험 이력을 조회하였습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            throw new InvalidRequestException("Invalid Request", "시험 이력 조회에 실패하였습니다.");
        }
    }
    
    // 특정 회원의 시험 이력을 조회
    @Override
    public ResponseDto<List<ExamHistoryDto>> getExamHistoriesByMemberId(Long memberId) {
        List<ExamHistory> examHistories = examHistoryRepository.findByMember_MemberId(memberId);

        if (examHistories == null || examHistories.isEmpty()) {
            return new ResponseDto<>(
                    ResultCode.SUCCESS.name(),
                    null,
                    "해당 회원에 대한 시험 이력이 없습니다.");
        } else {
            List<ExamHistoryDto> examHistoryDtos = examHistories.stream()
                    .map(ExamHistoryDto::from)
                    .collect(Collectors.toList());
            return new ResponseDto<>(
                    ResultCode.SUCCESS.name(),
                    examHistoryDtos,
                    "해당 회원의 시험 이력 목록을 조회하였습니다.");
        }
    }

    // 시험 이력 생성
    @Transactional
    @Override
    public ResponseDto<ExamHistoryDto> createExamHistory(ExamHistoryDto examHistoryDto){
        try {
            ExamHistory examHistory = new ExamHistory();

            // memberId를 사용하여 Member를 찾는 코드
            Member member = memberRepository.findById(examHistoryDto.getMemberId())
                    .orElseThrow(() -> new RuntimeException("Member not found")); // Member 조회
            examHistory.setMember(member);

            Content content = contentRepository.findById(examHistoryDto.getExam().getContentId())
                    .orElseThrow(() -> new RuntimeException("Content not found")); // Content 조회
            examHistory.setExam(examHistoryDto.getExam().toExam(content));
            examHistory.setExamCompletionStatus(examHistoryDto.isExamCompletionStatus());

            ExamHistory savedExamHistory = examHistoryRepository.save(examHistory);

            return new ResponseDto<>(
                    ResultCode.SUCCESS.name(),
                    ExamHistoryDto.from(savedExamHistory),
                    "시험 이력을 저장하였습니다.");

        } catch (Exception e){
            e.printStackTrace();
            throw new InvalidRequestException("Invalid Request", "시험 이력 저장에 실패하였습니다.");
        }
    }


    // 특정 시험 이력 수정
    @Transactional
    @Override
    public ResponseDto<ExamHistoryDto> updateExamHistory(Long examHistoryId, ExamHistoryDto examHistoryDto) {
        try {
            ExamHistory examHistory = examHistoryRepository.findById(examHistoryId)
                    .orElseThrow(() -> new InvalidRequestException("Exam history not found", "해당 시험 이력을 찾을 수 없습니다."));

            // memberId를 사용하여 Member를 찾는 코드
            Member member = memberRepository.findById(examHistoryDto.getMemberId())
                    .orElseThrow(() -> new RuntimeException("Member not found")); // Member 조회
            examHistory.setMember(member);
            Content content = contentRepository.findById(examHistoryDto.getExam().getContentId())
                    .orElseThrow(() -> new RuntimeException("Content not found")); // Content 조회
            examHistory.setExam(examHistoryDto.getExam().toExam(content));
            examHistory.setExamCompletionStatus(examHistoryDto.isExamCompletionStatus());

            ExamHistory updatedHistory = examHistoryRepository.save(examHistory);

            return new ResponseDto<>(
                    ResultCode.SUCCESS.name(),
                    ExamHistoryDto.from(updatedHistory),
                    "시험 이력을 업데이트하였습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            throw new InvalidRequestException("Invalid Request", "시험 이력 업데이트에 실패하였습니다.");
        }
    }


    // 특정 시험 이력 삭제
    @Transactional
    @Override
    public ResponseDto<String> deleteExamHistory(Long examHistoryId) {
        try {
            examHistoryRepository.deleteById(examHistoryId);
            return new ResponseDto<>(
                    ResultCode.SUCCESS.name(),
                    null,
                    "시험 이력을 삭제하였습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            throw new InvalidRequestException("Invalid Request", "시험 이력 삭제에 실패하였습니다.");
        }
    }
}