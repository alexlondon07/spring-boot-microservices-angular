package com.microservices.answerservice.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.microservices.commonexam.models.entity.Exam;

@FeignClient(name = "exam-service")
public interface ExamFeignClient {

    @GetMapping("/{id}")
    Exam getExamById(@PathVariable Long id);
}
