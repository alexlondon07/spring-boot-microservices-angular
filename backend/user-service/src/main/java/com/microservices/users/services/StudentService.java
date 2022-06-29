package com.microservices.users.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.microservices.commonservice.service.CommonService;
import com.microservices.commonstudent.models.entity.Student;


public interface StudentService extends CommonService<Student> {

    Page<Student> findByNameAndLastNameWithPageable(String text, Pageable pageable);

    List<Student> findByNameAndLastName(String text);

    Iterable<Student> findAllById(Iterable<Long> ids);

    void deleteCourseStudentById(Long id);
}
