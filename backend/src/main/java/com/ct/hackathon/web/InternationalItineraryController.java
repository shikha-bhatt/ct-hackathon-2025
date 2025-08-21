package com.ct.hackathon.web;

import com.ct.hackathon.model.InternationalItineraryRequest;
import com.ct.hackathon.model.InternationalItineraryResponse;
import com.ct.hackathon.service.InternationalItineraryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/itinerary")
@CrossOrigin(originPatterns = "*")
public class InternationalItineraryController {

    private static final Logger log = LoggerFactory.getLogger(InternationalItineraryController.class);
    
    private final InternationalItineraryService itineraryService;

    public InternationalItineraryController(InternationalItineraryService itineraryService) {
        this.itineraryService = itineraryService;
    }

    @PostMapping("/international")
    public Mono<ResponseEntity<InternationalItineraryResponse>> generateInternationalItinerary(
            @Valid @RequestBody InternationalItineraryRequest request) {
        
        log.info("Received international itinerary request: {} to {} from {} to {}", 
                request.getOrigin(), request.getDestination(), 
                request.getStartDate(), request.getEndDate());
        
        return itineraryService.generateItinerary(request)
                .map(response -> {
                    log.info("Successfully generated itinerary for {} to {}", 
                            request.getOrigin(), request.getDestination());
                    return ResponseEntity.ok(response);
                })
                .onErrorResume(error -> {
                    log.error("Error generating itinerary: {}", error.getMessage());
                    InternationalItineraryResponse errorResponse = new InternationalItineraryResponse();
                    errorResponse.setItinerarySummary("Error generating itinerary: " + error.getMessage());
                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(errorResponse));
                });
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("International Itinerary Service is running");
    }
} 