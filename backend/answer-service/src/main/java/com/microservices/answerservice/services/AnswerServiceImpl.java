package com.microservices.answerservice.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.microservices.answerservice.clients.ExamFeignClient;
import com.microservices.answerservice.models.entity.Answer;
import com.microservices.answerservice.models.repository.AnswerRepository;
import com.microservices.commonexam.models.entity.Exam;
import com.microservices.commonexam.models.entity.Question;

@Service
public class AnswerServiceImpl implements AnswerService {

    private final AnswerRepository answerRepository;

    private final ExamFeignClient examFeignClient;

    public AnswerServiceImpl(AnswerRepository repository, ExamFeignClient examFeignClient) {
        this.answerRepository = repository;
        this.examFeignClient = examFeignClient;
    }

    @Override
    public Iterable<Answer> saveAll(Iterable<Answer> answers) {
        return answerRepository.saveAll(answers);
    }

    @Override
    public Iterable<Answer> findAnswerByStudentByExam(Long studentId, Long examId) {
        Exam exam = examFeignClient.getExamById(examId);

        List<Question> questions = exam.getQuestions();

        List<Long> questionListIds = questions.stream()
                .map(Question::getId
                ).collect(Collectors.toList());

        List<Answer> answerList = (List<Answer>) answerRepository.findAnswerByStudentByQuestionIds(
                studentId, questionListIds);

        answerList = answerList.stream()
                .peek(answer -> questions.forEach(question -> {
                    if (question.getId() == answer.getQuestionId()) {
                        answer.setQuestion(question);
                    }
                })).collect(Collectors.toList());

        return answerList;
    }

    @Override
    public Iterable<Long> findExamsIdByWithAnswersByStudent(Long studentId) {
        return null;
        // return repository.findExamsIdByWithAnswersByStudent(studentId);
    }
}
