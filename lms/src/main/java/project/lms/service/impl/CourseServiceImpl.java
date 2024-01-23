package project.lms.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
import project.lms.service.CourseService;

@Service
public class CourseServiceImpl implements CourseService {

	 @Autowired
	 private final CourseRepository courseRepository;
	 
	 @Autowired
	 private final MemberRepository memberRepository;
	 
	 public CourseServiceImpl(CourseRepository courseRepository, MemberRepository memberRepository) {
		super();
		this.courseRepository = courseRepository;
		this.memberRepository = memberRepository;
	}
	 
	@Transactional
	 @Override
	 public ResponseDto<CourseDto> saveCourseWithThumbnail(CourseDto courseDto) {
	     try {
	    	 Member instructor = memberRepository.findById(courseDto.getInstructor())
	    			 .orElseThrow(() -> new InvalidRequestException("Instructor not found.", "강사를 찾을 수 없습니다."));
	    	 
	         byte[] thumbnailData = courseDto.getCourseThumbnail();
	         String courseName = courseDto.getCourseName();
	         String description = courseDto.getDescription();
	         Subject subject = courseDto.getSubject();
	         Long subjectId = (subject != null) ? subject.getSubjectId() : null;
	         Integer durationMins = courseDto.getDurationMins();
	         String contentLevel = courseDto.getContentLevel();
	         Integer price = courseDto.getPrice();
	         String announcement = courseDto.getAnnouncement();

	         Course course = new Course();
	            
	            if (subjectId != null) {
	                Subject existingSubject = new Subject();
	                existingSubject.setSubjectId(subjectId);
	                course.setSubject(existingSubject);
	            }
	            
	            course.setCourseName(courseName);
	            course.setDescription(description);
	            course.setDurationMins(durationMins);
	            course.setContentLevel(contentLevel);
	            course.setPrice(price);
	            course.setAnnouncement(announcement);
	            course.setCourseThumbnail(thumbnailData);
	       
	            courseRepository.save(course);
	            

	            return new ResponseDto<>(
	                    ResultCode.SUCCESS.name(),
	                    courseDto,
	                    "Success saving course with thumbnail");
	        } catch (Exception e) {
	            e.printStackTrace();
	            throw new InvalidRequestException("Error saving course with thumbnail.", e.getMessage());
	        }
	    }

	    public Optional<Course> getCourseWithThumbnail(Long courseId) {
	        return courseRepository.findById(courseId);
	    }
	    
	    @Override
	    public List<Course> getAllCourses() {
	        return courseRepository.findAll();
	    }
	    
	    @Override
	    public ResponseDto<List<Course>> getAllCourseWithThumbnail() {
	        List<Course> courses = courseRepository.findAll();
	        return new ResponseDto<>(
	                ResultCode.SUCCESS.name(),
	                courses,
	                "All courses retrieved successfully.");
	    }

	    @Override
	    public ResponseDto<List<Course>> getCoursesForSubject(Long subjectId) {
	        List<Course> courses = courseRepository.findBySubject_SubjectId(subjectId);
	        return new ResponseDto<>(
	                ResultCode.SUCCESS.name(),
	                courses,
	                "Courses for subject retrieved successfully.");
	    }

	    @Transactional
	    @Override
	    public ResponseDto<CourseDto> updateCourse(Long courseId, CourseDto courseDto) {
	        try {
	            Optional<Course> optionalCourse = courseRepository.findById(courseId);

	            if (optionalCourse.isPresent()) {
	                Course existingCourse = optionalCourse.get();

	                // 코스 업데이트 로직
	                existingCourse.setSubject(courseDto.getSubject());
	                existingCourse.setCourseName(courseDto.getCourseName());
	                existingCourse.setDescription(courseDto.getDescription());
	                existingCourse.setDurationMins(courseDto.getDurationMins());
	                existingCourse.setContentLevel(courseDto.getContentLevel());
	                existingCourse.setPrice(courseDto.getPrice());
	                existingCourse.setAnnouncement(courseDto.getAnnouncement());

	                byte[] updatedThumbnail = courseDto.getCourseThumbnail(); // 변경된 부분
	                if (updatedThumbnail != null && updatedThumbnail.length > 0) {
	                    existingCourse.setCourseThumbnail(updatedThumbnail);
	                }

	                courseRepository.save(existingCourse);

	                return new ResponseDto<>(ResultCode.SUCCESS.name(), null, "코스가 성공적으로 업데이트되었습니다.");
	            } else {
	                return new ResponseDto<>(ResultCode.ERROR.name(), null, "코스를 찾을 수 없습니다.");
	            }
	        } catch (Exception e) {
	            e.printStackTrace();
	            throw new InvalidRequestException("썸네일이 포함된 코스 업데이트 중 오류 발생.", "코스 업데이트에 실패했습니다.");
	        }
	    }

	    @Transactional
	    @Override
	    public ResponseDto<String> deleteCourse(Long courseId) {
	        try {
	            Optional<Course> optionalCourse = courseRepository.findById(courseId);

	            if (optionalCourse.isPresent()) {
	                courseRepository.deleteById(courseId);
	                return new ResponseDto<>(
	                        ResultCode.SUCCESS.name(),
	                        null,
	                        "Course deleted successfully.");
	            } else {
	                return new ResponseDto<>(ResultCode.ERROR.name(), null, "Course not found.");
	            }
	        } catch (Exception e) {
	            e.printStackTrace();
	            throw new InvalidRequestException("Invalid Request", "Course deletion failed.");
	        }
	    }
}
