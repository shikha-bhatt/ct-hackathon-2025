package com.ct.hackathon.web;

import com.ct.hackathon.model.SimInformationRequest;
import com.ct.hackathon.model.SimInformationResponse;
import com.ct.hackathon.service.SimInformationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/sim")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:3002"})
public class SimInformationController {

    private static final Logger log = LoggerFactory.getLogger(SimInformationController.class);
    
    private final SimInformationService simInformationService;

    public SimInformationController(SimInformationService simInformationService) {
        this.simInformationService = simInformationService;
    }

    @PostMapping("/information")
    public Mono<ResponseEntity<SimInformationResponse>> getSimInformation(
            @RequestBody SimInformationRequest request) {
        
        log.info("Received SIM information request for destination: {}, startDate: {}, endDate: {}", 
                request.getDestination(), request.getStartDate(), request.getEndDate());
        
        return simInformationService.getSimInformation(request)
                .map(ResponseEntity::ok)
                .doOnSuccess(response -> log.info("Successfully returned SIM information for {}", request.getDestination()))
                .doOnError(error -> log.error("Error processing SIM information request for {}: {}", request.getDestination(), error.getMessage()));
    }

    @GetMapping("/health")
    public Mono<ResponseEntity<String>> healthCheck() {
        return Mono.just(ResponseEntity.ok("SIM Information API is running!"));
    }
} 