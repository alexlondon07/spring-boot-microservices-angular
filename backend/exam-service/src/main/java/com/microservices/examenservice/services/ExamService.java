package com.microservices.examenservice.services;

import java.util.List;

import com.microservices.commonexam.models.entity.Exam;
import com.microservices.commonexam.models.entity.Subject;
import com.microservices.commonservice.service.CommonService;

public interface ExamService extends CommonService<Exam> {

    List<Exam> findByName(String name);

    List<Subject> findAllSubjects();

    Iterable<Long> findExamsIdWithAnswersByQuestionIds(Iterable<Long> ids);
}
