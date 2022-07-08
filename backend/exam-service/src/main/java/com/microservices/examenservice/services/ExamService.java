package com.microservices.examenservice.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.microservices.commonexam.models.entity.Exam;
import com.microservices.commonexam.models.entity.Subject;
import com.microservices.commonservice.service.CommonService;

public interface ExamService extends CommonService<Exam> {

    List<Exam> findByName(String name);

    List<Subject> findAllSubjects();

    Iterable<Long> findExamsIdWithAnswersByQuestionIds(Iterable<Long> ids);

    Page<Exam> findByNameWithPageable(String text, Pageable pageable);
}
