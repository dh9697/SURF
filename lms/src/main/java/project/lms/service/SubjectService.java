package project.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;

import project.lms.dto.ResponseDto;
import project.lms.model.Subject;
import project.lms.repository.SubjectRepository;


public interface SubjectService {

	public ResponseDto<Subject> saveSubject(Subject subject);
    public ResponseDto<List<Subject>> getAllSubjects();
    public ResponseDto<Subject> getSubjectById(Long subjectId);
    public ResponseDto<Subject> updateSubject(Long subjectId, Subject updatedSubject);
    public ResponseDto<String> deleteSubject(Long subjectId);
}
