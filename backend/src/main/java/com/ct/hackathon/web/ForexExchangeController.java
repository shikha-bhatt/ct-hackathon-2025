package com.ct.hackathon.web;

import com.ct.hackathon.model.ForexExchangeRequest;
import com.ct.hackathon.model.ForexExchangeResponse;
import com.ct.hackathon.service.ForexExchangeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/forex-exchange")
public class ForexExchangeController {

    private static final Logger log = LoggerFactory.getLogger(ForexExchangeController.class);
    
    private final ForexExchangeService forexExchangeService;

    public ForexExchangeController(ForexExchangeService forexExchangeService) {
        this.forexExchangeService = forexExchangeService;
    }

    @PostMapping("/info")
    public Mono<ResponseEntity<ForexExchangeResponse>> getForexExchangeInfo(
            @Valid @RequestBody ForexExchangeRequest request) {
        
        log.info("Received forex exchange request for destination: {}, amount: {} {}", 
                request.getDestination(), request.getAmount(), request.getCurrency());
        
        return forexExchangeService.getForexExchangeInfo(
                request.getDestination(), 
                request.getAmount(), 
                request.getCurrency())
                .map(ResponseEntity::ok)
                .doOnSuccess(response -> log.info("Successfully returned forex exchange info for {}", request.getDestination()))
                .doOnError(error -> log.error("Error processing forex exchange request for {}: {}", request.getDestination(), error.getMessage()));
    }

    @GetMapping("/info/{destination}")
    public Mono<ResponseEntity<ForexExchangeResponse>> getForexExchangeInfoByDestination(
            @PathVariable String destination,
            @RequestParam(defaultValue = "10000") Double amount,
            @RequestParam(defaultValue = "INR") String currency) {
        
        log.info("Received forex exchange request for destination: {}, amount: {} {}", destination, amount, currency);
        
        return forexExchangeService.getForexExchangeInfo(destination, amount, currency)
                .map(ResponseEntity::ok)
                .doOnSuccess(response -> log.info("Successfully returned forex exchange info for {}", destination))
                .doOnError(error -> log.error("Error processing forex exchange request for {}: {}", destination, error.getMessage()));
    }

    @GetMapping("/info/{destination}/{amount}")
    public Mono<ResponseEntity<ForexExchangeResponse>> getForexExchangeInfoByDestinationAndAmount(
            @PathVariable String destination,
            @PathVariable Double amount,
            @RequestParam(defaultValue = "INR") String currency) {
        
        log.info("Received forex exchange request for destination: {}, amount: {} {}", destination, amount, currency);
        
        return forexExchangeService.getForexExchangeInfo(destination, amount, currency)
                .map(ResponseEntity::ok)
                .doOnSuccess(response -> log.info("Successfully returned forex exchange info for {}", destination))
                .doOnError(error -> log.error("Error processing forex exchange request for {}: {}", destination, error.getMessage()));
    }

    @GetMapping("/health")
    public Mono<ResponseEntity<String>> healthCheck() {
        return Mono.just(ResponseEntity.ok("Forex Exchange Service is running!"));
    }
} 