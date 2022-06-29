package com.microservices.users.clients;

import org.springframework.cloud.openfeign.FeignClient;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "course-service")
public interface CourseFeignClient {

    @DeleteMapping("delete-student/{id}")
    void deleteCourseByStudentId(@PathVariable Long id);
}
