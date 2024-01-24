package project.lms.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.authentication.preauth.x509.SubjectDnX509PrincipalExtractor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.lms.dto.CourseDto;
import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import project.lms.exception.InvalidRequestException;
import project.lms.model.Course;
import project.lms.model.Member;
import project.lms.model.Subject;
import project.lms.repository.CourseRepository;
import project.lms.repository.MemberRepository;
import project.lms.repository.SubjectRepository;
import project.lms.service.CourseService;

@Service
public class CourseServiceImpl implements CourseService {

	 @Autowired
	 private final CourseRepository courseRepository;
	 
	 @Autowired
	 private final MemberRepository memberRepository;
	 
	 @Autowired
	 private final SubjectRepository subjectRepository;
	 
	 public CourseServiceImpl(CourseRepository courseRepository, MemberRepository memberRepository,
			SubjectRepository subjectRepository) {
		super();
		this.courseRepository = courseRepository;
		this.memberRepository = memberRepository;
		this.subjectRepository = subjectRepository;
	}
	 
	 // 코스 저장
	 @Transactional
	 @Override
	 public ResponseDto<CourseDto> saveCourse(CourseDto courseDto) {
		try {
	        Member instructor = memberRepository.findByMemberIdAndAuthorities_AuthorityName(
	        		courseDto.getInstructorId(), "ROLE_INSTRUCTOR")
	                .orElseThrow(() -> new InvalidRequestException
	                		("Instructor not found or not an instructor.", "강사를 찾을 수 없거나 강사가 아닙니다."));
	    	 
	         byte[] thumbnailData = courseDto.getCourseThumbnail();
	         String courseName = courseDto.getCourseName();
	         String description = courseDto.getDescription();
	         Long subjectId = courseDto.getSubjectId();
	         Integer durationMins = courseDto.getDurationMins();
	         String contentLevel = courseDto.getContentLevel();
	         Integer price = courseDto.getPrice();
	         String announcement = courseDto.getAnnouncement();

	         Course course = new Course();
	            
	         if (subjectId != null) {
	             Subject existingSubject = subjectRepository.findById(subjectId)
	                 .orElseThrow(() -> new InvalidRequestException("Subject not found.", "과목을 찾을 수 없습니다."));
	             course.setSubject(existingSubject);
	         }
	            
	            course.setInstructor(instructor);
	            course.setCourseName(courseName);
	            course.setDescription(description);
	            course.setDurationMins(durationMins);
	            course.setContentLevel(contentLevel);
	            course.setPrice(price);
	            course.setAnnouncement(announcement);
	            course.setCourseThumbnail(thumbnailData);
	       
	            courseRepository.save(course);

	            // 양방항 객체 참조로 다시 dto로 변환 이게 맞을까..
	            courseDto.setCourseId(course.getCourseId());
	            courseDto.setInstructorId(course.getInstructor().getMemberId());
	            courseDto.setSubjectId(course.getSubject().getSubjectId());
	            // member의 teachingCourses 업데이트
	            instructor.getTeachingCourses().add(course);
	            memberRepository.save(instructor);
	            
	            return new ResponseDto<>(
	                    ResultCode.SUCCESS.name(),
	                    courseDto,
	                    "Success saving course with thumbnail");
	        } catch (Exception e) {
	            e.printStackTrace();
	            throw new InvalidRequestException("Error saving course with thumbnail.", e.getMessage());
	        }
	    }
	 
	 // 모든 코스 조회
	 @Override
	 public List<CourseDto> getAllCourses() {
	     List<Course> courses = courseRepository.findAll();
	     List<CourseDto> courseDtos = courses.stream()
	    		 .map(CourseDto::from)
	    		 .collect(Collectors.toList());
	     return courseDtos;
	 }
	  
	 	// courseId로 코스 조회
	    @Override
	    public ResponseDto<CourseDto> getCourse(Long courseId) {
	        Course course = courseRepository.findById(courseId)
	        	.orElseThrow(() -> new InvalidRequestException("Course not found", "코스를 찾을 수 없습니다."));
	        
	        CourseDto courseDto = CourseDto.from(course);
	        
	        return new ResponseDto<>(
	                ResultCode.SUCCESS.name(),
	                courseDto,
	                "Course retrieved successfully.");
	    }
	    
	    // subjectId로 코스 조회
	    @Override
	    public ResponseDto<List<CourseDto>> getCoursesForSubject(Long subjectId) {
	        List<Course> courses = courseRepository.findBySubject_SubjectId(subjectId);
	        
	        List<CourseDto> courseDtos = courses.stream()
	        		.map(CourseDto::from)
	        		.collect(Collectors.toList());
	        
	        return new ResponseDto<>(
	                ResultCode.SUCCESS.name(),
	                courseDtos,
	                "Courses for subject retrieved successfully.");
	    }

	    // courseId로 코스 수정
	    @Transactional
	    @Override
	    public ResponseDto<CourseDto> updateCourse(Long courseId, CourseDto courseDto) {
	        try {
	            Course course = courseRepository.findById(courseId)
	            	.orElseThrow(() -> new InvalidRequestException("Course not found", "해당 강의를 찾을 수 없습니다."));

	                // 코스 업데이트 로직
	            	// 서브젝트와 강사를 바꿀 수 있게 해놓는게 맞을지?
	                Long subjectId = courseDto.getSubjectId();
	                if (subjectId != null) {
	                    Subject subject = subjectRepository.findById(subjectId)
	                        .orElseThrow(() -> new InvalidRequestException("Subject not found.", "해당 과목을 찾을 수 없습니다."));
	                    course.setSubject(subject);
	                }
	                Long instructorId = courseDto.getInstructorId();
	                if (instructorId != null) {
	                    Member instructor = memberRepository.findById(instructorId)
	                        .orElseThrow(() -> new InvalidRequestException("Instructor not found.", "해당 선생님을 찾을 수 없습니다."));
	                    course.setInstructor(instructor);
	                }
	                course.setCourseName(courseDto.getCourseName());
	                course.setDescription(courseDto.getDescription());
	                course.setDurationMins(courseDto.getDurationMins());
	                course.setContentLevel(courseDto.getContentLevel());
	                course.setPrice(courseDto.getPrice());
	                course.setAnnouncement(courseDto.getAnnouncement());

	                byte[] updatedThumbnail = courseDto.getCourseThumbnail(); // 변경된 부분
	                if (updatedThumbnail != null && updatedThumbnail.length > 0) {
	                    course.setCourseThumbnail(updatedThumbnail);
	                }

	                courseRepository.save(course);
	                CourseDto updatedCourseDto = CourseDto.from(course);

	                return new ResponseDto<>(ResultCode.SUCCESS.name(), updatedCourseDto, "코스가 성공적으로 업데이트되었습니다.");
	        } catch (Exception e) {
	            e.printStackTrace();
	            throw new InvalidRequestException("코스 업데이트 중 오류 발생.", "코스 업데이트에 실패했습니다.");
	        }
	    }
	    
	    // 코스 삭제
	    @Transactional
	    @Override
	    public ResponseDto<String> deleteCourse(Long courseId) {
	        try {
	            Course course = courseRepository.findById(courseId)
	                .orElseThrow(() -> new InvalidRequestException("Course not found.", "코스를 찾을 수 없습니다."));
	            
	            List<Member> instructors = memberRepository.findByTeachingCoursesContains(course);
	            for(Member instructor : instructors) {
	            	instructor.getTeachingCourses().remove(course);
	            	memberRepository.save(instructor);
	            }
	            courseRepository.delete(course);

	            return new ResponseDto<>(ResultCode.SUCCESS.name(), null, "Course deleted successfully.");
	        } catch (Exception e) {
	            throw new InvalidRequestException("Error deleting course.", "코스 삭제에 실패했습니다.");
	        }
	    }
}
