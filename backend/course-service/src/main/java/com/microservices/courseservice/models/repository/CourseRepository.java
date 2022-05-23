package com.microservices.courseservice.models.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.microservices.courseservice.models.entity.Course;

public interface CourseRepository extends PagingAndSortingRepository<Course, Long> {

    @Query("SELECT c FROM Course c JOIN FETCH c.courseStudents cs where cs.studentId=?1")
    Course findCourseByStudentId(Long id);

    @Modifying
    @Query("DELETE FROM CourseStudent cs WHERE cs.studentId=?1")
    void deleteCourseStudentById(Long id);

}
