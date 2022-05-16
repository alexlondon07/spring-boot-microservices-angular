package com.microservices.courseservice.models.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.microservices.courseservice.models.entity.Course;

public interface CourseRepository extends PagingAndSortingRepository<Course, Long> {

    @Query("SELECT c FROM Course c JOIN FETCH c.students s where s.id=?1")
    Course findCourseByStudentId(Long id);

}
