package com.microservices.users.models.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.microservices.commonstudent.models.entity.Student;

public interface StudentRepository extends PagingAndSortingRepository<Student, Long> {

}
