package com.microservices.courseservice.models.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.microservices.courseservice.models.entity.Course;

public interface CourseRepository extends PagingAndSortingRepository<Course, Long> {
}
