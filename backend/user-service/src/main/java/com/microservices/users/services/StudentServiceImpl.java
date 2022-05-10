package com.microservices.users.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.microservices.commonservice.service.CommonServiceImpl;
import com.microservices.commonstudent.models.entity.Student;
import com.microservices.users.models.repository.StudentRepository;

@Service
public class StudentServiceImpl extends CommonServiceImpl<Student, StudentRepository> implements StudentService {

    @Override
    @Transactional(readOnly = true)
    public List<Student> findByNameAndLastName(String text) {
        return repository.findByNameAndLastName(text);
    }
}
