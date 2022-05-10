package com.microservices.examenservice.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.microservices.commonexam.models.entity.Question;
import com.microservices.commonservice.controller.CommonController;
import com.microservices.examenservice.services.ExamService;

@RequestMapping("exams")
@RestController
public class ExamController extends CommonController<Exam, ExamService> {

    @Autowired
    private ExamService service;

    @PutMapping("/{id}/exam")
    public ResponseEntity<?> editExam(@Valid @RequestBody Exam exam, @PathVariable Long id,
                                      BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return this.validate(bindingResult);
        }

        Exam examBD = service.findById(id);
        examBD.setName(exam.getName());

        List<Question> listOfDeletedQuestions = new ArrayList<>();

        examBD.getQuestions()
                .stream()
                .filter(questionDB -> !exam.getQuestions().contains(questionDB))
                .forEach(examBD::removeQuestion);

        examBD.setQuestions(exam.getQuestions());

        return ResponseEntity.status(HttpStatus.CREATED).body(service.update(examBD));
    }

    @GetMapping("/filter/{text}")
    public ResponseEntity<?> filter(@PathVariable String text) {
        return ResponseEntity.ok(service.findByName(text));
    }

    @GetMapping("/subjects")
    public ResponseEntity<?> getSubjects() {
        return ResponseEntity.ok(service.findAllSubjects());
    }
}