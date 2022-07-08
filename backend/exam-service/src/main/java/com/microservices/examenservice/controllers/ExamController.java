package com.microservices.examenservice.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.microservices.commonexam.models.entity.Exam;
import com.microservices.commonexam.models.entity.Question;
import com.microservices.commonservice.controller.CommonController;
import com.microservices.examenservice.services.ExamService;

@RequestMapping("exams")
@RestController
public class ExamController extends CommonController<Exam, ExamService> {

    private final ExamService examService;

    public ExamController(ExamService service) {
        this.examService = service;
    }


    @GetMapping("/answered-by-exam")
    public ResponseEntity<?> getExamsAnsweredByQuestionsIds(@RequestParam List<Long> questionIds) {
        return ResponseEntity.ok().body(service.findExamsIdWithAnswersByQuestionIds(questionIds));
    }

    @GetMapping("/page/{page}/{size}")
    public Page<Exam> index(@PathVariable Integer page, @PathVariable Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return examService.findAllPage(pageable);
    }

    @GetMapping("/page/{page}/{size}/{text}")
    public Page<Exam> indexPageWithText(@PathVariable Integer page, @PathVariable Integer size,
                                           @PathVariable String text) {
        Pageable pageable = PageRequest.of(page, size);
        return examService.findByNameWithPageable(text, pageable);
    }

    @PutMapping("/{id}/exam")
    public ResponseEntity<?> editExam(@Valid @RequestBody Exam exam, @PathVariable Long id,
                                      BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return this.validate(bindingResult);
        }

        Exam examBD = examService.findById(id);
        examBD.setName(exam.getName());

        List<Question> listOfDeletedQuestions = new ArrayList<>();

        examBD.getQuestions()
                .stream()
                .filter(questionDB -> !exam.getQuestions().contains(questionDB))
                .forEach(examBD::removeQuestion);

        examBD.setQuestions(exam.getQuestions());

        return ResponseEntity.status(HttpStatus.CREATED).body(examService.update(examBD));
    }

    @GetMapping("/filter/{text}")
    public ResponseEntity<?> filter(@PathVariable String text) {
        return ResponseEntity.ok(examService.findByName(text));
    }

    @GetMapping("/subjects")
    public ResponseEntity<?> getSubjects() {
        return ResponseEntity.ok(examService.findAllSubjects());
    }
}
