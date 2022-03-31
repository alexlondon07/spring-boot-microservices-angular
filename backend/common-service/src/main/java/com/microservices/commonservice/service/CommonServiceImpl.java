package com.microservices.commonservice.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;

import com.microservices.commonservice.exceptions.ResourceNotFoundException;
import com.microservices.commonservice.util.ValidationMessages;

public class CommonServiceImpl<E, R extends PagingAndSortingRepository<E, Long>> implements CommonService<E> {

    @Autowired
    protected R repository;

    @Override
    @Transactional(readOnly = true)
    public Iterable<E> findAll() {
        return repository.findAll();
    }

    @Override
    public Page<E> findAllPage(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public E findById(Long id) {
        return repository.findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException(ValidationMessages.RESOURCE_NO_FOUND)
                );
    }

    @Override
    @Transactional()
    public E save(E student) {
        return repository.save(student);
    }

    @Override
    public E update(E student) {
        return repository.save(student);
    }

    @Override
    @Transactional()
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
