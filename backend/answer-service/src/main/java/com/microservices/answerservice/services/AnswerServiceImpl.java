package com.microservices.answerservice.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.microservices.answerservice.models.entity.Answer;
import com.microservices.answerservice.models.repository.AnswerRepository;
@Service
public class AnswerServiceImpl implements AnswerService {

    private final AnswerRepository repository;

    public AnswerServiceImpl(AnswerRepository repository) {
        this.repository = repository;
    }

    @Override
    public Iterable<Answer> saveAll(Iterable<Answer> answers) {
        return repository.saveAll(answers);
    }

    @Override
    public Iterable<Answer> findAnswerByStudentByExam(Long studentId, Long examId) {
        /*Exam exam = examFeignClient.getExamById(examId);

        List<Question> questions = exam.getQuestions();

        List<Long> questionListIds = questions
                .stream()
                .map(Question::getId)
                .collect(Collectors.toList());

        List<Answer> answerList = (List<Answer>) repository.findAnswerByStudentByQuestionIds(
                studentId, questionListIds);


        answerList = answerList.stream().map(answer -> {
            questions.forEach(question -> {
                if (question.getId() == answer.getQuestionId()) {
                    answer.setQuestion(question);
                }
            });
            return answer;
        }).collect(Collectors.toList());*/
        return repository.findAnswerByStudentByExam(studentId, examId);
    }


    @Override
    public Iterable<Long> findExamsIdByWithAnswersByStudent(Long studentId) {

       /* List<Answer> answerList = (List<Answer>) repository.findByStudentId(studentId);
        List<Long> examIds = Collections.emptyList();

        if (!answerList.isEmpty()) {
            List<Long> questionsIds = answerList
                    .stream()
                    .map(Answer::getQuestionId).collect(Collectors.toList());

            examIds = examFeignClient.getExamsAnsweredByQuestionsIds(questionsIds);
        }*/
        List<Answer> answerList = (List<Answer>) repository.findExamsIdByWithAnswersByStudent(studentId);
        return answerList
                .stream()
                .map(r -> r.getQuestion().getExam().getId())
                .distinct()
                .collect(Collectors.toList());
    }

    @Override
    public Iterable<Answer> findByStudentId(Long studentId) {
        return repository.findByStudentId(studentId);
    }
}
