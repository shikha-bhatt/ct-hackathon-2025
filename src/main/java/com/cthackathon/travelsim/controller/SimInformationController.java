package com.cthackathon.travelsim.controller;

import com.cthackathon.travelsim.dto.SimInformationResponse;
import com.cthackathon.travelsim.dto.SimSearchRequest;
import com.cthackathon.travelsim.service.SimInformationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/sim")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:3002"})
public class SimInformationController {

    private final SimInformationService simInformationService;

    @PostMapping("/information")
    public ResponseEntity<SimInformationResponse> getSimInformation(@Valid @RequestBody SimSearchRequest request) {
        try {
            log.info("Received SIM information request for destination: {}, duration: {}", 
                    request.getDestination(), request.getDuration());
            
            SimInformationResponse response = simInformationService.getSimInformation(
                    request.getDestination(), 
                    request.getDuration()
            );
            
            log.info("Successfully processed SIM information request for {}", request.getDestination());
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Error processing SIM information request: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("SIM Information API is running!");
    }
} 