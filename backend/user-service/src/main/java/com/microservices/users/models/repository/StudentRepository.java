package com.microservices.users.models.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.microservices.commonstudent.models.entity.Student;

public interface StudentRepository extends PagingAndSortingRepository<Student, Long> {

    @Query("select a from Student a where a.name like %?1% or a.lastName like %?1%")
    public List<Student> findByNameAndLastName(String text);

}
