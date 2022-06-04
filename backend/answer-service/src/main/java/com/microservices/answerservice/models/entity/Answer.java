package com.microservices.answerservice.models.entity;

import javax.persistence.Id;
import javax.persistence.Transient;

import org.springframework.data.mongodb.core.mapping.Document;

import com.microservices.commonexam.models.entity.Question;
import com.microservices.commonstudent.models.entity.Student;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "answers")
public class Answer {

    @Id
    private String id;

    private String text;

   // @Transient
    private Student student;

    private Long studentId;

    //@Transient
    private Question question;

    private Long questionId;
}
