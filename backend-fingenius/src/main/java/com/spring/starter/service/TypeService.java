package com.spring.starter.service;

import com.spring.starter.model.dto.req.TypeDto;
import com.spring.starter.model.entity.Type;

import java.util.List;

public interface TypeService {
    List<Type> getAllTypes();
    Type getTypeById(String id);
    Type saveType(TypeDto typeDto);
    void deleteType(String id);
}
