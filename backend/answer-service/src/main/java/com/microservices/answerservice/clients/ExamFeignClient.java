package com.microservices.answerservice.clients;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.microservices.commonexam.models.entity.Exam;

@FeignClient(name = "exam-service")
public interface ExamFeignClient {

    @GetMapping("/exams/{id}")
    public Exam getExamById(@PathVariable Long id);

    @GetMapping("/exams/answered-by-exam")
    public List<Long> getExamsAnsweredByQuestionsIds(@RequestParam List<Long> questionIds);
}
