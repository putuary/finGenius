package com.spring.starter.service.impl;

import com.spring.starter.repository.TypeRepository;
import com.spring.starter.service.TypeService;
import com.spring.starter.utils.constant.EType;
import com.spring.starter.model.dto.req.TypeDto;
import com.spring.starter.model.entity.Type;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TypeServiceImpl implements TypeService {

    private final TypeRepository typeRepository;
    private final EType[] listType = EType.values();

    private void checkTypeExist(String name) {
        boolean isNotFound = true;
        for (EType type : listType) {
            if (type.getValue().equals(name)) {
                isNotFound = false;
            }
        }

        if(isNotFound) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Type Not Found");
        }

        if(typeRepository.findByName(name).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Type Already Exists");
        }
    }

    @Override
    public List<Type> getAllTypes() {
        return typeRepository.findAll();
    }

    @Override
    public Type getTypeById(String id) {
        return typeRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Type Not Found")
        );
    }

    @Override
    public Type saveType(TypeDto typeDto) {

        this.checkTypeExist(typeDto.getName());

        Type savedType = Type.builder()
                .name(typeDto.getName())
                .createdAt(new Date())
                .updatedAt(new Date())
                .build();
        return typeRepository.save(savedType);
    }

    @Override
    public void deleteType(String id) {
        if(typeRepository.findById(id).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Type Not Found");
        }
        typeRepository.deleteById(id);
    }
}
