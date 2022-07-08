package com.microservices.examenservice.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.microservices.commonexam.models.entity.Exam;
import com.microservices.commonexam.models.entity.Subject;
import com.microservices.commonservice.service.CommonServiceImpl;
import com.microservices.examenservice.models.repository.ExamRepository;
import com.microservices.examenservice.models.repository.SubjectRepository;

@Service
public class ExamServiceImpl extends CommonServiceImpl<Exam, ExamRepository> implements ExamService {

    @Autowired
    private SubjectRepository subjectRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Exam> findByName(String name) {
        return repository.findByName(name);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Subject> findAllSubjects() {
        return (List<Subject>) subjectRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Iterable<Long> findExamsIdWithAnswersByQuestionIds(Iterable<Long> ids) {
        return repository.findExamsIdWithAnswersByQuestionIds(ids);
    }

    @Override
    public Page<Exam> findByNameWithPageable(String text, Pageable pageable) {
        return repository.findByNameWithPageable(text, pageable);
    }
}
