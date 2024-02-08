package project.lms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import project.lms.dto.CourseHistoryDto;
import project.lms.dto.ResponseDto;
import project.lms.model.Course;
import project.lms.model.CourseHistory;
import project.lms.model.Member;
import project.lms.service.CourseHistoryService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/course-histories")
@CrossOrigin(origins="http://localhost:3000",
	methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class CourseHistoryController {

	private final CourseHistoryService courseHistoryService;

	@Autowired
	public CourseHistoryController(CourseHistoryService courseHistoryService) {
		super();
		this.courseHistoryService = courseHistoryService;
	}
	
	@GetMapping("/list")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<ResponseDto<List<CourseHistory>>> getAllCourseHistories() {
		ResponseDto<List<CourseHistory>> courseHistories = courseHistoryService.getAllCourseHistories();
		return new ResponseEntity<>(courseHistories, HttpStatus.OK);
	}
	
	@GetMapping("/list/{courseId}")
//	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<ResponseDto<List<CourseHistory>>> getCourseHistoriesByCourse(@PathVariable Long courseId) {
		ResponseDto<List<CourseHistory>> courseHistories = courseHistoryService.getCourseHistoriesByCourse(courseId);
		return new ResponseEntity<>(courseHistories, HttpStatus.OK);
	}
	
	@GetMapping
	public ResponseEntity<ResponseDto<List<CourseHistoryDto>>> getMyCourseHistories() {
		ResponseDto<List<CourseHistoryDto>> courseHistoryDtos = courseHistoryService.getMyCourseHistories();
		return new ResponseEntity<>(courseHistoryDtos, HttpStatus.OK);
	}
	
	// 수료증 자격 업데이트
		@PutMapping("/update-status/{courseHistoryId}")
		public ResponseEntity<ResponseDto<CourseHistoryDto>> updateCourseHistoryStatus(@PathVariable Long courseHistoryId) {
			ResponseDto<CourseHistoryDto> courseHistoryDto = courseHistoryService.updateCourseHistoryStatus(courseHistoryId);
			return new ResponseEntity<>(courseHistoryDto, HttpStatus.OK);
		}
	
}

//@RestController
//@RequestMapping("/api")
//@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT })
//public class CourseHistoryController {
//
//    private final CourseHistoryService courseHistoryService;
//
//    @Autowired
//    public CourseHistoryController(CourseHistoryService courseHistoryService) {
//        this.courseHistoryService = courseHistoryService;
//    }
//
//    // 특정 회원의 수강 이력 조회
//    @GetMapping("/courseHistory/member/{memberId}")
//    public ResponseEntity<ResponseDto<List<CourseHistory>>> getCourseHistoryByMember(@PathVariable Long memberId) {
//        Member member = new Member();
//        member.setMemberId(memberId);
//
//        ResponseDto<List<CourseHistory>> response = courseHistoryService.getCourseHistoryByMember(member);
//        return ResponseEntity.status(HttpStatus.OK).body(response);
//    }
//
//    // 특정 강좌의 수강 이력 조회
//    @GetMapping("/courseHistory/course/{courseId}")
//    public ResponseEntity<ResponseDto<List<CourseHistory>>> getCourseHistoryByCourse(@PathVariable Long courseId) {
//        Course course = new Course();
//        course.setCourseId(courseId);
//
//        ResponseDto<List<CourseHistory>> response = courseHistoryService.getCourseHistoryByCourse(course);
//        return ResponseEntity.status(HttpStatus.OK).body(response);
//    }
//
//    // 특정 날짜 범위 내의 수강 이력 조회
//    @GetMapping("/courseHistory/dateRange")
//    public ResponseEntity<ResponseDto<List<CourseHistory>>> getCourseHistoryInDateRange(
//            @RequestParam("startDate") String startDate,
//            @RequestParam("endDate") String endDate) {
//
//        LocalDate startLocalDate = LocalDate.parse(startDate);
//        LocalDate endLocalDate = LocalDate.parse(endDate);
//
//        ResponseDto<List<CourseHistory>> response = courseHistoryService.getCourseHistoryInDateRange(startLocalDate, endLocalDate);
//        return ResponseEntity.status(HttpStatus.OK).body(response);
//    }
//
//    // 특정 회원과 강좌의 수강 이력 조회
//    @GetMapping("/courseHistory/memberAndCourse")
//    public ResponseEntity<ResponseDto<List<CourseHistory>>> getCourseHistoryByMemberAndCourse(
//            @RequestParam("memberId") Long memberId,
//            @RequestParam("courseId") Long courseId) {
//
//        Member member = new Member();
//        member.setMemberId(memberId);
//
//        Course course = new Course();
//        course.setCourseId(courseId);
//
//        ResponseDto<List<CourseHistory>> response = courseHistoryService.getCourseHistoryByMemberAndCourse(member, course);
//        return ResponseEntity.status(HttpStatus.OK).body(response);
//    }
//
//    // 종료일이 null인(아직 종료되지 않은) 수강 이력 조회
//    @GetMapping("/courseHistory/ongoing")
//    public ResponseEntity<ResponseDto<List<CourseHistory>>> getOngoingCourseHistory() {
//        ResponseDto<List<CourseHistory>> response = courseHistoryService.getOngoingCourseHistory();
//        return ResponseEntity.status(HttpStatus.OK).body(response);
//    }
//
//    // 특정 날짜 이후에 종료된 수강 이력 조회
//    @GetMapping("/courseHistory/endedAfter")
//    public ResponseEntity<ResponseDto<List<CourseHistory>>> getCourseHistoryEndedAfter(
//            @RequestParam("date") String date) {
//
//        LocalDate endLocalDate = LocalDate.parse(date);
//
//        ResponseDto<List<CourseHistory>> response = courseHistoryService.getCourseHistoryEndedAfter(endLocalDate);
//        return ResponseEntity.status(HttpStatus.OK).body(response);
//    }
//
//    // 특정 회원의 가장 최근 수강 이력 조회
//    @GetMapping("/courseHistory/latestForMember/{memberId}")
//    public ResponseEntity<ResponseDto<CourseHistory>> getLatestCourseHistoryForMember(@PathVariable Long memberId) {
//        Member member = new Member();
//        member.setMemberId(memberId);
//
//        ResponseDto<CourseHistory> response = courseHistoryService.getLatestCourseHistoryForMember(member);
//        return ResponseEntity.status(HttpStatus.OK).body(response);
//    }
//
//    // 특정 강좌의 수강 이력 개수 조회
//    @GetMapping("/courseHistory/countByCourse/{courseId}")
//    public ResponseEntity<ResponseDto<Long>> getCourseHistoryCountByCourse(@PathVariable Long courseId) {
//        Course course = new Course();
//        course.setCourseId(courseId);
//
//        ResponseDto<Long> response = courseHistoryService.getCourseHistoryCountByCourse(course);
//        return ResponseEntity.status(HttpStatus.OK).body(response);
//    }
//
//    // 종료일이 null이고 시작일이 특정 날짜 이전인 수강 이력 조회
//    @GetMapping("/courseHistory/ongoingBeforeDate")
//    public ResponseEntity<ResponseDto<List<CourseHistory>>> getOngoingCourseHistoryBeforeDate(
//            @RequestParam("date") String date) {
//
//        LocalDate startLocalDate = LocalDate.parse(date);
//
//        ResponseDto<List<CourseHistory>> response = courseHistoryService.getOngoingCourseHistoryBeforeDate(startLocalDate);
//        return ResponseEntity.status(HttpStatus.OK).body(response);
//    }
//
//    // 삭제 부분은 필요하면 courseHistoryService와 courseHistoryServiceImpl에서 정의 후 주석 풀어 주면 됨
//    // @DeleteMapping("/courseHistory/delete/{courseHistoryId}")
//    // public ResponseEntity<ResponseDto<String>> deleteCourseHistory(@PathVariable Long courseHistoryId) {
//    //     ResponseDto<String> response = courseHistoryService.deleteCourseHistory(courseHistoryId);
//    //     return ResponseEntity.status(HttpStatus.OK).body(response);
//    // }
//}