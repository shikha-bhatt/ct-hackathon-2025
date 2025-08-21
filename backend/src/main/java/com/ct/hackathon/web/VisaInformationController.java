package com.ct.hackathon.web;

import com.ct.hackathon.model.VisaInformationRequest;
import com.ct.hackathon.model.VisaInformationResponse;
import com.ct.hackathon.service.VisaInformationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/visa-information")
public class VisaInformationController {

    private static final Logger log = LoggerFactory.getLogger(VisaInformationController.class);
    
    private final VisaInformationService visaInformationService;

    public VisaInformationController(VisaInformationService visaInformationService) {
        this.visaInformationService = visaInformationService;
    }

    @PostMapping("/info")
    public Mono<ResponseEntity<VisaInformationResponse>> getVisaInformation(
            @Valid @RequestBody VisaInformationRequest request) {
        
        log.info("Received visa information request for destination: {}, purpose: {}, nationality: {}", 
                request.getDestination(), request.getPurposeOfVisit(), request.getNationality());
        
        return visaInformationService.getVisaInformation(request)
                .map(ResponseEntity::ok)
                .doOnSuccess(response -> log.info("Successfully returned visa information for {}", request.getDestination()))
                .doOnError(error -> log.error("Error processing visa information request for {}: {}", request.getDestination(), error.getMessage()));
    }

    @GetMapping("/info/{destination}")
    public Mono<ResponseEntity<VisaInformationResponse>> getVisaInformationByDestination(
            @PathVariable String destination,
            @RequestParam(defaultValue = "Tourism") String purposeOfVisit,
            @RequestParam(defaultValue = "Indian") String nationality) {
        
        log.info("Received visa information request for destination: {}, purpose: {}, nationality: {}", 
                destination, purposeOfVisit, nationality);
        
        return visaInformationService.getVisaInformation(destination, purposeOfVisit, nationality)
                .map(ResponseEntity::ok)
                .doOnSuccess(response -> log.info("Successfully returned visa information for {}", destination))
                .doOnError(error -> log.error("Error processing visa information request for {}: {}", destination, error.getMessage()));
    }

    @GetMapping("/info/{destination}/{purposeOfVisit}")
    public Mono<ResponseEntity<VisaInformationResponse>> getVisaInformationByDestinationAndPurpose(
            @PathVariable String destination,
            @PathVariable String purposeOfVisit,
            @RequestParam(defaultValue = "Indian") String nationality) {
        
        log.info("Received visa information request for destination: {}, purpose: {}, nationality: {}", 
                destination, purposeOfVisit, nationality);
        
        return visaInformationService.getVisaInformation(destination, purposeOfVisit, nationality)
                .map(ResponseEntity::ok)
                .doOnSuccess(response -> log.info("Successfully returned visa information for {}", destination))
                .doOnError(error -> log.error("Error processing visa information request for {}: {}", destination, error.getMessage()));
    }

    @GetMapping("/health")
    public Mono<ResponseEntity<String>> healthCheck() {
        return Mono.just(ResponseEntity.ok("Visa Information Service is running!"));
    }
} 