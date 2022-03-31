package com.microservices.courseservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.microservices.commonservice.controller.CommonController;
import com.microservices.courseservice.models.entity.Course;
import com.microservices.courseservice.services.CourseService;

@RequestMapping("courses")
@RestController
public class CourseController extends CommonController<Course, CourseService> {

    @Autowired
    private CourseService service;

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody Course course) {
        Course courseBD = service.findById(course.getId());
        courseBD.setName(course.getName());
        courseBD.setDescription(course.getDescription());
        return ResponseEntity.status(HttpStatus.CREATED).body(service.update(courseBD));
    }
}
