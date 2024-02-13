package project.lms.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.lms.dto.CourseHistoryDto;
import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import project.lms.exception.InvalidRequestException;
import project.lms.model.ContentHistory;
import project.lms.model.Course;
import project.lms.model.CourseHistory;
import project.lms.model.ExamHistory;
import project.lms.model.Member;
import project.lms.repository.ContentHistoryRepository;
import project.lms.repository.CourseHistoryRepository;
import project.lms.repository.CourseRepository;
import project.lms.repository.ExamHistoryRepository;
import project.lms.repository.MemberRepository;
import project.lms.service.CourseHistoryService;
import project.lms.util.SecurityUtil;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class CourseHistoryServiceImpl implements CourseHistoryService {
	
	private final CourseHistoryRepository courseHistoryRepository;
	private final CourseRepository courseRepository;
	private final ContentHistoryRepository contentHistoryRepository;
	private final MemberRepository memberRepository;
	private final ExamHistoryRepository examHistoryRepository;
	
	@Autowired
	public CourseHistoryServiceImpl(CourseHistoryRepository courseHistoryRepository, CourseRepository courseRepository, ContentHistoryRepository contentHistoryRepository, MemberRepository memberRepository, ExamHistoryRepository examHistoryRepository) {
		super();
		this.courseHistoryRepository = courseHistoryRepository;
		this.courseRepository = courseRepository;
		this.contentHistoryRepository = contentHistoryRepository;
		this.memberRepository = memberRepository;
		this.examHistoryRepository = examHistoryRepository;
	}

	// 전체 조회
	@Override
	public ResponseDto<List<CourseHistory>> getAllCourseHistories(){
		List<CourseHistory> courseHistories = courseHistoryRepository.findAll();
		return new ResponseDto<>(
				ResultCode.SUCCESS.name(),
				courseHistories,
				"모든 courseHistory를 조회하였습니다.");
	}
	
	// 강의별 조회
	@Override
	public ResponseDto<List<CourseHistory>> getCourseHistoriesByCourse(Long courseId){
		List<CourseHistory> courseHistories = courseHistoryRepository.findByCourseCourseId(courseId);
		return new ResponseDto<>(
				ResultCode.SUCCESS.name(),
				courseHistories,
				"courseHistory를 course에 따라 조회하였습니다.");
	}
	
	// 로그인 유저의 조회
	private Member getCurrentUser() {
        String username = SecurityUtil.getCurrentloginId()
                .orElseThrow(() -> new InvalidRequestException("not found username", "현재 해당 사용자를 찾을 수 없습니다."));
        
        return memberRepository.findByLoginId(username);
    }
	
	// 로그인 유저의 courseHistory 조회
	public ResponseDto<List<CourseHistoryDto>> getMyCourseHistories() {
		Member member = getCurrentUser();
		List<CourseHistory> courseHistories = courseHistoryRepository.findByMember(member);
			
		List<CourseHistoryDto> courseHistoryDtos = new ArrayList<>();
	    for (CourseHistory courseHistory : courseHistories) {
	    	Long courseId = courseHistory.getCourse().getCourseId();
	        Long totalContents = courseRepository.countContentsByCourseId(courseId);
	        Long completedContents = contentHistoryRepository.countByMemberMemberIdAndIsCompletedTrue(totalContents);

	        CourseHistoryDto courseHistoryDto = new CourseHistoryDto();
	        courseHistoryDto.setCourseHistory(courseHistory);
	        courseHistoryDto.setTotalContents(totalContents);
	        courseHistoryDto.setCompletedContents(completedContents);

	        courseHistoryDtos.add(courseHistoryDto);
	        }
	    
	        return new ResponseDto<>(
					ResultCode.SUCCESS.name(),
					courseHistoryDtos,
					"로그인한 사용자가 수강 중인 courseHistory를 조회하였습니다.");
		}
	
	// 수료증 자격 업데이트
    public ResponseDto<CourseHistoryDto> updateCourseHistoryStatus(Long courseHistoryId) {
        CourseHistory courseHistory = courseHistoryRepository.findById(courseHistoryId)
                .orElseThrow(() -> new InvalidRequestException("not found courseHistory", "courseHistory를 찾을 수 없습니다."));
        Long courseId = courseHistory.getCourse().getCourseId();
        Long memberId = courseHistory.getMember().getMemberId();

        Long totalContents = courseRepository.countContentsByCourseId(courseId);
        Long completedContents = contentHistoryRepository.countByMemberMemberIdAndIsCompletedTrue(memberId);

        // 강의별 시험 이력 조회
        List<ExamHistory> examHistories = examHistoryRepository.findByMember_MemberId(memberId);
        boolean isExamCompleted = examHistories.stream()
                .filter(examHistory -> examHistory.getExam().getContent().getCourse().getCourseId().equals(courseId)) 
                .allMatch(ExamHistory::isExamCompletionStatus);

        // 강의별 컨텐츠 이력 조회
        List<ContentHistory> contentHistories = contentHistoryRepository.findByContent_Course_CourseIdAndMember_MemberId(courseId, memberId);
        boolean isAllContentCompleted = contentHistories.stream().allMatch(ContentHistory::getIsCompleted);

        CourseHistoryDto courseHistoryDto = new CourseHistoryDto();
        courseHistoryDto.setCourseHistory(courseHistory);
        courseHistoryDto.setTotalContents(totalContents);
        courseHistoryDto.setCompletedContents(completedContents);

        if (totalContents.equals(completedContents) && isExamCompleted && isAllContentCompleted) {
            courseHistory.setContentStatus(true);
            courseHistoryRepository.save(courseHistory);
            return new ResponseDto<>(
                    ResultCode.SUCCESS.name(),
                    courseHistoryDto,
                    "CourseHistory의 status가 업데이트되었습니다."
                );
        } else {
            return new ResponseDto<>(
                    ResultCode.ERROR.name(),
                    null,
                    "CourseHistory의 status 업데이트에 실패하였습니다."
                );
        }
    }
}