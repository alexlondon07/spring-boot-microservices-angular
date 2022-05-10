package com.microservices.courseservice.services;

import org.springframework.stereotype.Service;

import com.microservices.commonservice.service.CommonServiceImpl;
import com.microservices.courseservice.models.entity.Course;
import com.microservices.courseservice.models.repository.CourseRepository;

@Service
public class CourseServiceImpl extends CommonServiceImpl<Course, CourseRepository> implements CourseService {


    @Override
    public Course findCourseByStudentId(Long id) {
        return repository.findCourseByStudentId(id);
    }
}

