package com.microservices.courseservice.clients;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.microservices.commonstudent.models.entity.Student;

@FeignClient(name = "user-service")
public interface StudentFeignClient {

    @GetMapping("/students-by-course")
    Iterable<Student> getStudentsByCourse(@RequestParam Iterable<Long> ids);

}
