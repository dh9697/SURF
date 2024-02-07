package project.lms.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import project.lms.dto.ResponseDto;
import project.lms.enumstatus.ResultCode;
import project.lms.exception.InvalidRequestException;
import project.lms.model.Subject;
import project.lms.repository.SubjectRepository;
import project.lms.service.SubjectService;

import java.util.List;
import java.util.Optional;

@Service
public class SubjectServiceImpl implements SubjectService {

    private final SubjectRepository subjectRepository;

    @Autowired
    public SubjectServiceImpl(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    @Transactional
    @Override
    public ResponseDto<Subject> saveSubject(Subject subject) {
        try {
            Subject savedSubject = subjectRepository.save(subject);
            return new ResponseDto<>(ResultCode.SUCCESS.name(), savedSubject, "Subject saved successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            throw new InvalidRequestException("Error saving subject.", e.getMessage());
        }
    }

    @Override
    public ResponseDto<List<Subject>> getAllSubjects() {
        List<Subject> subjects = subjectRepository.findAll();
        return new ResponseDto<>(ResultCode.SUCCESS.name(), subjects, "All subjects retrieved successfully.");
    }

    @Transactional
    @Override
    public ResponseDto<Subject> getSubjectById(Long subjectId) {
        Optional<Subject> optionalSubject = subjectRepository.findById(subjectId);
        return optionalSubject.map(subject -> new ResponseDto<>(ResultCode.SUCCESS.name(), subject, "Subject retrieved successfully."))
                .orElseGet(() -> new ResponseDto<>(ResultCode.ERROR.name(), null, "Subject not found."));
    }

    @Transactional
    @Override
    public ResponseDto<Subject> updateSubject(Long subjectId, Subject updatedSubject) {
        try {
            Optional<Subject> optionalSubject = subjectRepository.findById(subjectId);

            if (optionalSubject.isPresent()) {
                Subject existingSubject = optionalSubject.get();

                // Subject 업데이트 로직
                existingSubject.setSubjectName(updatedSubject.getSubjectName());
                existingSubject.setDescription(updatedSubject.getDescription());

                subjectRepository.save(existingSubject);

                return new ResponseDto<>(ResultCode.SUCCESS.name(), null, "Subject updated successfully.");
            } else {
                return new ResponseDto<>(ResultCode.ERROR.name(), null, "Subject not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new InvalidRequestException("Error updating subject.", e.getMessage());
        }
    }

    @Transactional
    @Override
    public ResponseDto<String> deleteSubject(Long subjectId) {
        try {
            Optional<Subject> optionalSubject = subjectRepository.findById(subjectId);

            if (optionalSubject.isPresent()) {
                subjectRepository.deleteById(subjectId);
                return new ResponseDto<>(ResultCode.SUCCESS.name(), null, "Subject deleted successfully.");
            } else {
                return new ResponseDto<>(ResultCode.ERROR.name(), null, "Subject not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new InvalidRequestException("Error deleting subject.", e.getMessage());
        }
    }
}
