package com.cthackathon.travelsim.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class SimSearchRequest {
    
    @NotBlank(message = "Destination is required")
    private String destination;
    
    @NotBlank(message = "Trip duration is required")
    private String duration;
} 