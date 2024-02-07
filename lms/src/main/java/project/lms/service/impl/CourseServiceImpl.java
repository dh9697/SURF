package project.lms.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
	        Course course = new Course();
	        course.setCourseName(courseDto.getCourseName());
	        course.setDescription(courseDto.getDescription());
	        course.setDurationMins(courseDto.getDurationMins());
	        course.setContentLevel(courseDto.getContentLevel());
	        course.setPrice(courseDto.getPrice());
	        course.setAnnouncement(courseDto.getAnnouncement());
	        course.setCourseThumbnail(courseDto.getCourseThumbnail());
	        
	        if (courseDto.getSubject() != null) {
	             Subject subject = subjectRepository.findById(courseDto.getSubject().getSubjectId())
	                 .orElseThrow(() -> new InvalidRequestException("Subject not found.", "과목을 찾을 수 없습니다."));
	             course.setSubject(subject);
	        }

	        courseRepository.save(course);

	        List<String> instructorNames = new ArrayList<>();
	        for (String loginId : courseDto.getInstructorLoginIds()) {
	            Member instructor = memberRepository.findByLoginIdAndAuthorities_AuthorityName(
	                loginId, "ROLE_INSTRUCTOR")
	                .orElseThrow(() -> new InvalidRequestException
	                        ("Instructor not found or not an instructor.", "강사를 찾을 수 없거나 강사가 아닙니다."));
	            
	            instructorNames.add(instructor.getName());
	            
	            // teachingCourses 업데이트
	            instructor.getTeachingCourses().add(course);
	            memberRepository.save(instructor);
	        }
	        
	        courseDto.setCourseId(course.getCourseId()); 
	        courseDto.setInstructorNames(instructorNames); 
	        
	        return new ResponseDto<>(
	        		ResultCode.SUCCESS.name(),
	                courseDto,
	                "Success saving course with thumbnail");
	        } catch (Exception e) {
	            e.printStackTrace();
	            throw new InvalidRequestException("Error saving course.", e.getMessage());
	        }
	    }
	 
	 // 모든 코스 조회
	 @Override
	 public ResponseDto<List<CourseDto>> getAllCourses() {
	     List<Course> courses = courseRepository.findAll();
	     
	     List<CourseDto> courseDtos = courses.stream().map(course -> {  	 
	    	 List <String> instructorNames = memberRepository.findByTeachingCourses_CourseId(course.getCourseId())
	    			 .stream().map(Member::getName).collect(Collectors.toList());
	    	 
	    	 CourseDto courseDto = CourseDto.from(course);
	    	 courseDto.setInstructorNames(instructorNames);
	    	 
	    	 return courseDto;
	     }).collect(Collectors.toList());
	    		        
	     return new ResponseDto<>(
	    		 ResultCode.SUCCESS.name(),
	    		 courseDtos,
	    		 "Success getting all courses");
	 }
	  
	 // courseId로 코스 조회
	 @Override
	 public ResponseDto<CourseDto> getCourseByCourseId(Long courseId) {
		 Course course = courseRepository.findById(courseId)
				 .orElseThrow(() -> new InvalidRequestException("Course not found", "코스를 찾을 수 없습니다."));
	     
		 List<String> instructorNames = memberRepository.findByTeachingCourses_CourseId(courseId)
				 .stream().map(Member::getName)
				 .collect(Collectors.toList());
		 
	     CourseDto courseDto = CourseDto.from(course);
	     courseDto.setInstructorNames(instructorNames);
		 
	     return new ResponseDto<>(
	             ResultCode.SUCCESS.name(),
	             courseDto,
	             "Course retrieved successfully.");
	    }
	    
	 // subjectId로 코스 조회
	 @Override
	 public ResponseDto<List<CourseDto>> getCoursesBySubjectId(Long subjectId) {
	     List<Course> courses = courseRepository.findBySubject_SubjectId(subjectId);
	        
	     List<CourseDto> courseDtos = courses.stream().map(course -> {
	    	 List<String> instructorNames = memberRepository.findByTeachingCourses_CourseId(course.getCourseId())
	    			 .stream().map(Member::getName)
	    			 .collect(Collectors.toList());
	    	 
	    	 CourseDto courseDto = CourseDto.from(course);
	    	 courseDto.setInstructorNames(instructorNames);
	    	 
	    	 return courseDto;
	     }).collect(Collectors.toList());
	        
	     return new ResponseDto<>(
	    		 ResultCode.SUCCESS.name(),
	             courseDtos,
	             "Courses for subject retrieved successfully.");
	    }

	 // courseId로 코스 수정
	 @Transactional
	 @Override
	 public ResponseDto<CourseDto> updateCourse(Long courseId, CourseDto courseDto) {
		 Course course = courseRepository.findById(courseId)
				 .orElseThrow(() -> new InvalidRequestException("Coures not found.", "코스를 찾을 수 없습니다."));
		 
		 course.setCourseName(courseDto.getCourseName());
		 course.setDescription(courseDto.getDescription());
		 course.setDurationMins(courseDto.getDurationMins());
		 course.setContentLevel(courseDto.getContentLevel());
		 course.setPrice(courseDto.getPrice());
		 course.setAnnouncement(courseDto.getAnnouncement());
		 course.setCourseThumbnail(courseDto.getCourseThumbnail());
		 
		 if (courseDto.getSubject() != null) {
		        Subject subject = subjectRepository.findById(courseDto.getSubject().getSubjectId())
		            .orElseThrow(() -> new InvalidRequestException("Subject not found.", "과목을 찾을 수 없습니다."));
		        course.setSubject(subject);
		    }
		 
		 courseRepository.save(course);

		 List<String> instructorNames = new ArrayList<>();
		 for (String loginId : courseDto.getInstructorLoginIds()) {
		        Member instructor = memberRepository.findByLoginIdAndAuthorities_AuthorityName(
		            loginId, "ROLE_INSTRUCTOR")
		            .orElseThrow(() -> new InvalidRequestException
		                    ("Instructor not found or not an instructor.", "강사를 찾을 수 없거나 강사가 아닙니다."));

		        // teachingCourses 업데이트
		        instructor.getTeachingCourses().add(course);
		        memberRepository.save(instructor);
		    }
		 	courseDto.setInstructorNames(instructorNames);
		 	courseDto.setCourseId(course.getCourseId());

		    return new ResponseDto<>(
		        ResultCode.SUCCESS.name(),
		        courseDto,
		        "Course updated successfully.");
	 }
	    
	 // 코스 삭제
	 @Transactional
	 @Override
	 public ResponseDto<String> deleteCourse(Long courseId) {
		 Course course = courseRepository.findById(courseId)
				 .orElseThrow(() -> new InvalidRequestException("Course not found.", "코스를 찾을 수 없습니다."));
	            
	     List<Member> instructors = memberRepository.findByTeachingCourses_CourseId(courseId);
	     for(Member instructor : instructors) {
	    	 instructor.getTeachingCourses().remove(course);
	         memberRepository.save(instructor);
	     }
	     
	     courseRepository.delete(course);

	     return new ResponseDto<>(ResultCode.SUCCESS.name(), null, "Course deleted successfully.");

	    }
}