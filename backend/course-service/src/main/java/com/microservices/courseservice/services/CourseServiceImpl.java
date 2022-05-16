package com.microservices.courseservice.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.microservices.commonservice.service.CommonServiceImpl;
import com.microservices.courseservice.clients.AnswerFeignClient;
import com.microservices.courseservice.models.entity.Course;
import com.microservices.courseservice.models.repository.CourseRepository;

@Service
public class CourseServiceImpl extends CommonServiceImpl<Course, CourseRepository> implements CourseService {

    @Autowired
    AnswerFeignClient answerFeignClient;

    @Override
    @Transactional(readOnly = true)
    public Course findCourseByStudentId(Long id) {
        return repository.findCourseByStudentId(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Iterable<Long> getExamsIdsWithAnswersByStudentId(Long studentId) {
        return answerFeignClient.getExamsByStudentId(studentId);
    }
}

