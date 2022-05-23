package com.microservices.users.services;

import java.util.List;

import com.microservices.commonservice.service.CommonService;
import com.microservices.commonstudent.models.entity.Student;


public interface StudentService extends CommonService<Student> {

    List<Student> findByNameAndLastName(String text);

    Iterable<Student> findAllById(Iterable<Long> ids);

    void deleteCourseStudentById(Long id);
}
