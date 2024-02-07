package project.lms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import project.lms.dto.CourseDto;
import project.lms.dto.ResponseDto;
import project.lms.service.CourseService;

@RestController
@RequestMapping("/api/course")
@CrossOrigin(origins="http://localhost:3000",
methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class CourseController {

	private final CourseService courseService;
	
	@Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }
	
	@PostMapping("/save")
	@PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<ResponseDto<CourseDto>> saveCourse(@RequestBody CourseDto courseDto) {
        ResponseDto<CourseDto> response = courseService.saveCourse(courseDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/list")
    public ResponseEntity<ResponseDto<List<CourseDto>>> getAllCourses() {
        ResponseDto<List<CourseDto>> courseDtos = courseService.getAllCourses();
        return new ResponseEntity<>(courseDtos, HttpStatus.OK);
    }
    
    @GetMapping("/list/{courseId}")
    public ResponseEntity<ResponseDto<CourseDto>> getCourse(@PathVariable Long courseId) {
        ResponseDto<CourseDto> response = courseService.getCourseByCourseId(courseId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<ResponseDto<List<CourseDto>>> getCoursesForSubject(@PathVariable Long subjectId) {
        ResponseDto<List<CourseDto>> response = courseService.getCoursesBySubjectId(subjectId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/update/{courseId}")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<ResponseDto<CourseDto>> updateCourse(
			@PathVariable Long courseId,
			@RequestBody CourseDto courseDto) {
		ResponseDto<CourseDto> responseDto = courseService.updateCourse(courseId, courseDto);
		return ResponseEntity.status(HttpStatus.OK).body(responseDto);
	}
    
    @DeleteMapping("/delete/{courseId}")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<ResponseDto<String>> deleteCourse(@PathVariable Long courseId) {
		ResponseDto<String> reponseDto = courseService.deleteCourse(courseId);
		return ResponseEntity.status(HttpStatus.OK).body(reponseDto);
	}
}