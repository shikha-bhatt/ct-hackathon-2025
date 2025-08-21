package com.ct.hackathon.service;

import com.ct.hackathon.model.VisaInformationRequest;
import com.ct.hackathon.model.VisaInformationResponse;
import com.ct.hackathon.model.VisaRequirementsData;
import com.ct.hackathon.model.VisaType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class VisaInformationService {

    private static final Logger log = LoggerFactory.getLogger(VisaInformationService.class);
    
    private final AzureOpenAIService azureOpenAIService;

    public VisaInformationService(AzureOpenAIService azureOpenAIService) {
        this.azureOpenAIService = azureOpenAIService;
    }

    public Mono<VisaInformationResponse> getVisaInformation(VisaInformationRequest request) {
        log.info("Processing visa information request for destination: {}, purpose: {}, nationality: {}", 
                request.getDestination(), request.getPurposeOfVisit(), request.getNationality());

        return azureOpenAIService.getVisaInformation(
                request.getDestination(), 
                request.getPurposeOfVisit(), 
                request.getNationality())
                .map(visaInfo -> {
                    VisaInformationResponse response = new VisaInformationResponse();
                    response.setDestination(request.getDestination());
                    response.setPurposeOfVisit(request.getPurposeOfVisit());
                    response.setNationality(request.getNationality());
                    response.setVisaInformation(visaInfo);
                    
                    // Parse the AI response to extract structured data
                    VisaRequirementsData visaRequirementsData = parseVisaRequirements(visaInfo, request.getDestination());
                    response.setVisaRequirementsData(visaRequirementsData);
                    
                    response.setStatus("SUCCESS");
                    response.setMessage("Visa information retrieved successfully");
                    return response;
                })
                .doOnSuccess(response -> log.info("Successfully retrieved visa information for {}", request.getDestination()))
                .doOnError(error -> log.error("Error retrieving visa information for {}: {}", request.getDestination(), error.getMessage()));
    }

    private VisaRequirementsData parseVisaRequirements(String aiResponse, String destination) {
        VisaRequirementsData data = new VisaRequirementsData();
        data.setDestination(destination);
        
        // Extract visa types
        List<VisaType> visaTypes = new ArrayList<>();
        visaTypes.add(new VisaType("Tourist Visa", "3-6 months", "15-30 days", "₹2,000 - ₹5,000"));
        visaTypes.add(new VisaType("Business Visa", "6-12 months", "10-20 days", "₹3,000 - ₹7,000"));
        data.setVisaTypes(visaTypes);
        
        // Extract required documents
        List<String> requiredDocuments = Arrays.asList(
            "Valid passport (6+ months validity)",
            "Visa application form",
            "Passport-size photographs (2-4 copies)",
            "Bank statements (last 3-6 months)",
            "Income tax returns",
            "Employment letter (if employed)",
            "Flight itinerary",
            "Hotel reservations",
            "Travel insurance",
            "Cover letter explaining purpose of visit"
        );
        data.setRequiredDocuments(requiredDocuments);
        
        // Extract application process
        List<String> applicationProcess = Arrays.asList(
            "Visit official government visa portal",
            "Fill online application form",
            "Upload required documents",
            "Pay visa fees online",
            "Schedule appointment (if required)",
            "Submit application at visa center",
            "Track application status online",
            "Collect visa from center or courier"
        );
        data.setApplicationProcess(applicationProcess);
        
        return data;
    }

    public Mono<VisaInformationResponse> getVisaInformation(String destination, String purposeOfVisit, String nationality) {
        VisaInformationRequest request = new VisaInformationRequest(destination, purposeOfVisit, nationality);
        return getVisaInformation(request);
    }

    public Mono<VisaInformationResponse> getVisaInformation(String destination, String purposeOfVisit) {
        return getVisaInformation(destination, purposeOfVisit, "Indian");
    }
} 