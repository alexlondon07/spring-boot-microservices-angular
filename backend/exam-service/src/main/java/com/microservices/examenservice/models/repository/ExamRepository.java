package com.microservices.examenservice.models.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.microservices.commonexam.models.entity.Exam;


public interface ExamRepository extends CrudRepository<Exam, Long>, PagingAndSortingRepository<Exam, Long> {

    @Query("SELECT e FROM Exam e where e.name like %?1%")
    public List<Exam> findByName(String name);
}
