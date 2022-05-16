package com.microservices.courseservice.controllers;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.microservices.commonexam.models.entity.Exam;
import com.microservices.commonservice.controller.CommonController;
import com.microservices.commonstudent.models.entity.Student;
import com.microservices.courseservice.models.entity.Course;
import com.microservices.courseservice.services.CourseService;

import javax.validation.Valid;

@RequestMapping("courses")
@RestController
public class CourseController extends CommonController<Course, CourseService> {

    @Autowired
    private CourseService service;

    @GetMapping("/page/{page}/{size}")
    public Page<Course> index(@PathVariable Integer page, @PathVariable Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return service.findAllPage(pageable);
    }

    @PutMapping("/{id}/course")
    public ResponseEntity<?> updateCourse(@Valid @RequestBody Course course,
                                          BindingResult bindingResult, @PathVariable Long id) {

        if (bindingResult.hasErrors()) {
            return this.validate(bindingResult);
        }
        Course courseBD = service.findById(id);
        courseBD.setName(course.getName());
        courseBD.setDescription(course.getDescription());
        return ResponseEntity.status(HttpStatus.CREATED).body(service.update(courseBD));
    }

    @PutMapping("/{id}/assign-student")
    public ResponseEntity<?> assignStudent(@RequestBody List<Student> studentList,
                                           @PathVariable Long id) {
        Course courseBD = service.findById(id);
        studentList.forEach(courseBD::addStudents);
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(courseBD));
    }

    @PutMapping("/{id}/delete-student")
    public ResponseEntity<?> deleteStudent(@RequestBody List<Student> studentList,
                                           @PathVariable Long id) {
        Course courseBD = service.findById(id);
        studentList.forEach(courseBD::removeStudents);
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(courseBD));
    }

    @PutMapping("/{id}/assign-exam")
    public ResponseEntity<?> assignExam(@RequestBody List<Exam> examList, @PathVariable Long id) {
        Course courseBD = service.findById(id);
        examList.forEach(courseBD::addExams);
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(courseBD));
    }

    @PutMapping("/{id}/delete-exam")
    public ResponseEntity<?> deleteExam(@RequestBody List<Exam> studentList,
                                        @PathVariable Long id) {
        Course courseBD = service.findById(id);
        studentList.forEach(courseBD::removeExams);
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(courseBD));
    }

    @GetMapping("/student/{id}")
    public ResponseEntity<?> searchBtStudentId(@PathVariable Long id) {
        Course courseBD = service.findCourseByStudentId(id);

        if (Objects.nonNull(courseBD)) {

            List<Long> examsIds = (List<Long>) service.getExamsIdsWithAnswersByStudentId(id);

            List<Exam> exams = courseBD.getExams()
                    .stream()
                    .map(exam -> {
                        if (examsIds.contains(exam.getId())) {
                            exam.setReplied(true);
                        }
                        return exam;
                    }).collect(Collectors.toList());

            courseBD.setExams(exams);
        }
        return ResponseEntity.ok(courseBD);
    }
}
