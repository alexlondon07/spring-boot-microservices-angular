package com.microservices.answerservice.services;

import com.microservices.answerservice.models.entity.Answer;

public interface AnswerService {

    Iterable<Answer> saveAll(Iterable<Answer> answers);

    Iterable<Answer> findAnswerByStudentByExam(Long studentId, Long examId);

    Iterable<Long> findExamsIdByWithAnswersByStudent(Long studentId);

    Iterable<Answer> findByStudentId(Long studentId);
}
