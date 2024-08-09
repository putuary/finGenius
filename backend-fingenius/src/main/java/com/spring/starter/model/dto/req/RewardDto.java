package com.spring.starter.model.dto.req;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RewardDto {
    private String name;
    private String description;
    private String linkFile;
    private Integer streak;
}
