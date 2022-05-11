package com.microservices.answerservice.controllers;

import javax.ws.rs.Path;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.microservices.answerservice.models.entity.Answer;
import com.microservices.answerservice.services.AnswerService;

@RequestMapping("answers")
@RestController
public class AnswerController {

    @Autowired
    private AnswerService service;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Iterable<Answer> answers) {
        Iterable<Answer> answersBD = service.saveAll(answers);
        return ResponseEntity.status(HttpStatus.CREATED).body(answersBD);
    }

    @GetMapping("/student/{studentId}/exam/{examId}")
    public ResponseEntity<?> getAnswersByStudentAndByExam(@PathVariable Long studentId, @PathVariable Long examId) {
        Iterable<Answer> answers = service.findAnswerByStudentByExam(studentId, examId);
        return ResponseEntity.ok(answers);
    }

    @GetMapping("/student/{studentId}/exams-replied")
    public ResponseEntity<?> getExamsByStudentId(@PathVariable Long studentId) {
        Iterable<Long> examsIds = service.findExamsIdByWithAnswersByStudent(studentId);
        return ResponseEntity.ok(examsIds);
    }

}
