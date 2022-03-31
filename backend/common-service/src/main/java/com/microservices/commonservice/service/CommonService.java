package com.microservices.commonservice.service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommonService<E> {

    public Iterable<E> findAll();

    public Page<E> findAllPage(Pageable pageable);

    public E findById(Long id);

    public E save(E entity);

    public E update(E entity);

    public void deleteById(Long id);
}
