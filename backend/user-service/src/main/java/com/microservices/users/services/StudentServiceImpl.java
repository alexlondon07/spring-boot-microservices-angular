package com.microservices.users.services;
import org.springframework.stereotype.Service;
import com.microservices.commonservice.service.CommonServiceImpl;
import com.microservices.commonstudent.models.entity.Student;
import com.microservices.users.models.repository.StudentRepository;

@Service
public class StudentServiceImpl extends CommonServiceImpl<Student, StudentRepository> implements StudentService {


}
