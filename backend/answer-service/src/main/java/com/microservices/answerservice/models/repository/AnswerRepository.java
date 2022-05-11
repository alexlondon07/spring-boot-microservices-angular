package com.microservices.answerservice.models.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.microservices.answerservice.models.entity.Answer;

public interface AnswerRepository extends CrudRepository<Answer, Long> {

    @Query("SELECT a FROM Answer a JOIN FETCH a.student s JOIN FETCH a.question q " +
            "JOIN FETCH q.exam e WHERE e.id?1 AND e.id?2")
    Iterable<Answer> findAnswerByStudentByExam(Long studentId, Long examId);

    @Query("SELECT e.id FROM Answer a JOIN a.student s JOIN a.question q JOIN q.exam e " +
            "WHERE s.id=?1 GROUP BY e.id")
    Iterable<Long> findExamsIdByWithAnswersByStudent(Long studentId);
}
