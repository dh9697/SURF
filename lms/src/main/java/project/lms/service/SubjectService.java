package project.lms.service;

import java.util.List;

import project.lms.dto.ResponseDto;
import project.lms.model.Subject;

public interface SubjectService {
	
	// Subject 저장
    public ResponseDto<Subject> saveSubject(Subject subject);

    // 모든 Subject 조회
    public ResponseDto<List<Subject>> getAllSubjects();

    // 특정 Subject 조회 by ID
    public ResponseDto<Subject> getSubjectById(Long subjectId);

    // Subject 업데이트
    public ResponseDto<Subject> updateSubject(Long subjectId, Subject updatedSubject);

    // Subject 삭제
    public ResponseDto<String> deleteSubject(Long subjectId);

}
