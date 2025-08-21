package com.ct.hackathon.web;

import com.ct.hackathon.model.ZeroForexCardRequest;
import com.ct.hackathon.model.ZeroForexCardResponse;
import com.ct.hackathon.service.ZeroForexCardService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/zero-forex-cards")
public class ZeroForexCardController {

    private static final Logger log = LoggerFactory.getLogger(ZeroForexCardController.class);
    
    private final ZeroForexCardService zeroForexCardService;

    public ZeroForexCardController(ZeroForexCardService zeroForexCardService) {
        this.zeroForexCardService = zeroForexCardService;
    }

    @PostMapping("/recommendations")
    public Mono<ResponseEntity<ZeroForexCardResponse>> getZeroForexCardRecommendations(
            @Valid @RequestBody ZeroForexCardRequest request) {
        
        log.info("Received zero forex card request for destination: {}", request.getDestination());
        
        return zeroForexCardService.getZeroForexCards(request.getDestination())
                .map(ResponseEntity::ok)
                .doOnSuccess(response -> log.info("Successfully returned zero forex card recommendations for {}", request.getDestination()))
                .doOnError(error -> log.error("Error processing zero forex card request for {}: {}", request.getDestination(), error.getMessage()));
    }

    @GetMapping("/recommendations/{destination}")
    public Mono<ResponseEntity<ZeroForexCardResponse>> getZeroForexCardRecommendationsByDestination(
            @PathVariable String destination) {
        
        log.info("Received zero forex card request for destination: {}", destination);
        
        return zeroForexCardService.getZeroForexCards(destination)
                .map(ResponseEntity::ok)
                .doOnSuccess(response -> log.info("Successfully returned zero forex card recommendations for {}", destination))
                .doOnError(error -> log.error("Error processing zero forex card request for {}: {}", destination, error.getMessage()));
    }

    @GetMapping("/health")
    public Mono<ResponseEntity<String>> healthCheck() {
        return Mono.just(ResponseEntity.ok("Zero Forex Card Service is running!"));
    }
} 