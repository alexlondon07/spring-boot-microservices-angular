package com.microservices.answerservice.models.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.microservices.answerservice.models.entity.Answer;

public interface AnswerRepository extends MongoRepository<Answer, String> {

    @Query("{'studentId': ?0, 'questionId': {$in: ?1} }")
    Iterable<Answer> findAnswerByStudentByQuestionIds(Long studentId, Iterable<Long> questionIds);

    @Query("{'studentId': ?0}")
    Iterable<Answer> findByStudentId(Long studentId);

    //@Query("SELECT a FROM Answer a JOIN FETCH a.question q JOIN FETCH q.exam e WHERE a.studentId=?1 AND e.id=?2")
    //Iterable<Answer> findAnswerByStudentByExam(Long studentId, Long examId);

    // @Query("select e.id from Answer a join a.question q join q.exam e where a.studentId=?1 group by e.id")
    // Iterable<Long> findExamsIdByWithAnswersByStudent(Long studentId);

    @Query("{'studentId': ?0, 'question.exam.id': ?1 }")
    Iterable<Answer> findAnswerByStudentByExam(Long studentId, Long examId);

    @Query(value = "{'studentId' : ?0}", fields = "{'question.exam.id': 1}")
    Iterable<Answer> findExamsIdByWithAnswersByStudent(Long studentId);
}
