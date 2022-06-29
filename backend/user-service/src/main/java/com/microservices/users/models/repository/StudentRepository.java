package com.microservices.users.models.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.microservices.commonstudent.models.entity.Student;

public interface StudentRepository extends PagingAndSortingRepository<Student, Long> {

    @Query("select a from Student a where upper(a.name) like upper(concat('%', ?1, '%')) or " +
            "upper(a.lastName) like upper(concat('%', ?1, '%'))")
    List<Student> findByNameAndLastName(String text);

    @Query("select a from Student a where upper(a.name) like upper(concat('%', ?1, '%')) or " +
            "upper(a.lastName) like upper(concat('%', ?1, '%'))")
    Page<Student> findByNameAndLastNameWithPageable(String name, Pageable pageable);
}
