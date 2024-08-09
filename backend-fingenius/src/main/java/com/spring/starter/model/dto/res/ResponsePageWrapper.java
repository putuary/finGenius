package com.spring.starter.model.dto.res;

import java.util.List;

import org.springframework.data.domain.Page;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ResponsePageWrapper<T> {
  
  private int code;
  private String message;
  private int page;
  private int limit;
  private int totalPage;
  private int totalDataPerPage;
  private Long totalData;
  private List<T> data;

  public ResponsePageWrapper(int code, String message, Page<T> page) {
    this.code = code;
    this.message = message;
    this.totalPage = page.getTotalPages();
    this.page = page.getNumber() + 1;
    this.limit = page.getSize();
    this.totalDataPerPage = page.getNumberOfElements();
    this.totalData = page.getTotalElements();
    this.data = page.getContent();
  }
}
