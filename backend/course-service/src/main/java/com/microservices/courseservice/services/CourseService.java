package com.microservices.courseservice.services;
import com.microservices.commonservice.service.CommonService;
import com.microservices.commonstudent.models.entity.Student;
import com.microservices.courseservice.models.entity.Course;

public interface CourseService extends CommonService<Course> {

    Course findCourseByStudentId(Long id);

    Iterable<Long> getExamsIdsWithAnswersByStudentId(Long studentId);

    Iterable<Student> getStudentsByCourse(Iterable<Long> ids);

    void deleteCourseStudentById(Long id);

}