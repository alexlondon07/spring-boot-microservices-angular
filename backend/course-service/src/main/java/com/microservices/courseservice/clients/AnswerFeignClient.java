package com.microservices.courseservice.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "answer-service")
public interface AnswerFeignClient {

    @GetMapping("answers/student/{studentId}/exams-replied")
    Iterable<Long> getExamsByStudentId(@PathVariable Long studentId);
}
