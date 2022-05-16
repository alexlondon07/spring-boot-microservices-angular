package com.microservices.answerservice.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.microservices.answerservice.models.entity.Answer;
import com.microservices.answerservice.models.repository.AnswerRepository;

@Service
public class AnswerServiceImpl implements AnswerService {

    @Autowired
    private AnswerRepository repository;

    @Override
    @Transactional
    public Iterable<Answer> saveAll(Iterable<Answer> answers) {
        return repository.saveAll(answers);
    }

    @Override
    public Iterable<Answer> findAnswerByStudentByExam(Long studentId, Long examId) {
        return repository.findAnswerByStudentByExam(studentId, examId);
    }

    @Override
    public Iterable<Long> findExamsIdByWithAnswersByStudent(Long studentId) {
        return repository.findExamsIdByWithAnswersByStudent(studentId);
    }
}
