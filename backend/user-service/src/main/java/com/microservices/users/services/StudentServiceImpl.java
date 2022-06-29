package com.microservices.users.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.microservices.commonservice.service.CommonServiceImpl;
import com.microservices.commonstudent.models.entity.Student;
import com.microservices.users.clients.CourseFeignClient;
import com.microservices.users.models.repository.StudentRepository;

@Service
public class StudentServiceImpl extends CommonServiceImpl<Student, StudentRepository> implements StudentService {

    @Autowired
    private CourseFeignClient courseFeignClient;

    @Override
    public Page<Student> findByNameAndLastNameWithPageable(String text, Pageable pageable) {
        return repository.findByNameAndLastNameWithPageable(text, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Student> findByNameAndLastName(String text) {
        return repository.findByNameAndLastName(text);
    }

    @Override
    @Transactional(readOnly = true)
    public Iterable<Student> findAllById(Iterable<Long> ids) {
        return repository.findAllById(ids);
    }

    @Override
    public void deleteCourseStudentById(Long id) {
        courseFeignClient.deleteCourseByStudentId(id);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        super.deleteById(id);
        this.deleteCourseStudentById(id);
    }
}
