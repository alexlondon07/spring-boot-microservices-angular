package com.microservices.examenservice.models.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.microservices.commonexam.models.entity.Exam;


public interface ExamRepository extends CrudRepository<Exam, Long>, PagingAndSortingRepository<Exam, Long> {

    @Query("SELECT e FROM Exam e where e.name like %?1%")
    List<Exam> findByName(String name);

    @Query("SELECT e.id FROM Question q join q.exam e where q.id in ?1 group by e.id")
    Iterable<Long> findExamsIdWithAnswersByQuestionIds(Iterable<Long> ids);

    @Query("SELECT a from Exam a where upper(a.name) like upper(concat('%', ?1, '%'))")
    Page<Exam> findByNameWithPageable(String name, Pageable pageable);
}
