package com.microservices.users.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.microservices.commonservice.controller.CommonController;
import com.microservices.commonstudent.models.entity.Student;
import com.microservices.users.services.StudentService;


@RequestMapping("students")
@RestController
public class StudentController extends CommonController<Student, StudentService> {

    @Autowired
    private StudentService service;

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody Student student) {
        Student studentBD = service.findById(student.getId());
        studentBD.setName(student.getName());
        studentBD.setLastName(student.getLastName());
        studentBD.setEmail(student.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(service.update(studentBD));
    }
}
