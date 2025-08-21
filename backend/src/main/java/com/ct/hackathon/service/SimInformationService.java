package com.ct.hackathon.service;

import com.ct.hackathon.model.SimInformationRequest;
import com.ct.hackathon.model.SimInformationResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.List;

@Service
public class SimInformationService {
    
    private static final Logger log = LoggerFactory.getLogger(SimInformationService.class);
    
    private final AzureOpenAIService azureOpenAIService;
    
    public SimInformationService(AzureOpenAIService azureOpenAIService) {
        this.azureOpenAIService = azureOpenAIService;
    }
    
    public Mono<SimInformationResponse> getSimInformation(SimInformationRequest request) {
        String destination = request.getDestination();
        
        // Always calculate duration from start and end dates
        String calculatedDuration = calculateDurationFromDates(request.getStartDate(), request.getEndDate());
        
        log.info("Generating SIM information for destination: {}, duration: {}", destination, calculatedDuration);
        
        // Use Azure OpenAI to generate comprehensive recommendations
        return azureOpenAIService.getSimInformationRecommendations(destination, calculatedDuration)
                .map(aiRecommendations -> {
                    // Generate detailed SIM options with comparisons
                    SimInformationResponse.SimOptions simOptions = generateDetailedSimOptions(destination, calculatedDuration);
                    
                    return new SimInformationResponse(aiRecommendations, simOptions);
                })
                .doOnError(error -> log.error("Error generating SIM information for {}: {}", destination, error.getMessage()));
    }
    

    
    private SimInformationResponse.SimOptions generateDetailedSimOptions(String destination, String duration) {
        SimInformationResponse.SimOptions simOptions = new SimInformationResponse.SimOptions();
        simOptions.setDestination(destination);
        
        // Enhanced local carriers with detailed comparisons
        simOptions.setLocalCarriers(Arrays.asList(
            createLocalCarrier("Verizon", "Excellent", "Nationwide", "$25-45", "5G/LTE", "24/7", "2-4 hours", "Best overall coverage", "Premium pricing", "Airport kiosks, stores, online", "Passport, credit card"),
            createLocalCarrier("AT&T", "Very Good", "Nationwide", "$20-40", "5G/LTE", "24/7", "4-8 hours", "Good value for money", "Some rural gaps", "Airport kiosks, stores, online", "Passport, credit card"),
            createLocalCarrier("T-Mobile", "Good", "Urban-focused", "$15-35", "5G/LTE", "Business hours", "6-12 hours", "Best pricing", "Limited rural coverage", "Airport kiosks, stores, online", "Passport, credit card"),
            createLocalCarrier("Cricket Wireless", "Fair", "Urban areas", "$10-30", "4G/LTE", "Business hours", "24-48 hours", "Budget option", "Basic coverage", "Stores only", "Passport, credit card")
        ));
        
        // Enhanced international SIMs with comparisons
        simOptions.setInternationalSIMs(Arrays.asList(
            createInternationalSIM("Airalo", "Global", "$4.50-16", "7-30 days", "Instant", "Email", "Best for short trips", "Limited data", "Online purchase", "Unlocked phones"),
            createInternationalSIM("Truphone", "Global", "$5-18", "7-30 days", "Instant", "24/7", "Good support", "Higher cost", "Online purchase", "Unlocked phones"),
            createInternationalSIM("GigSky", "Global", "$6-20", "7-30 days", "Instant", "Email", "Wide coverage", "Variable speeds", "Online purchase", "Unlocked phones"),
            createInternationalSIM("Ubigi", "Global", "$4-15", "7-30 days", "Instant", "Email", "Competitive pricing", "Limited regions", "Online purchase", "Unlocked phones")
        ));
        
        // Enhanced eSIMs with device compatibility
        simOptions.setESIMs(Arrays.asList(
            createESIM("Airalo eSIM", "Global", "$4.50-16", "iPhone/Android", "Instant", "7-30 days", "Best compatibility", "Limited data", "Online purchase", "eSIM-compatible devices"),
            createESIM("Truphone eSIM", "Global", "$5-18", "iPhone/Android", "Instant", "7-30 days", "Good support", "Higher cost", "Online purchase", "eSIM-compatible devices"),
            createESIM("GigSky eSIM", "Global", "$6-20", "iPhone/Android", "Instant", "7-30 days", "Wide coverage", "Variable speeds", "Online purchase", "eSIM-compatible devices"),
            createESIM("Ubigi eSIM", "Global", "$4-15", "iPhone/Android", "Instant", "7-30 days", "Competitive pricing", "Limited regions", "Online purchase", "eSIM-compatible devices")
        ));
        
        // Add comprehensive comparison summary
        simOptions.setComparisonSummary(createComparisonSummary(destination, duration));
        
        return simOptions;
    }
    
    private SimInformationResponse.ComparisonSummary createComparisonSummary(String destination, String duration) {
        SimInformationResponse.ComparisonSummary summary = new SimInformationResponse.ComparisonSummary();
        
        summary.setBestOverall("Local SIM Card - Best coverage, value, and local support");
        summary.setBestForShortTrips("eSIM - Instant activation, no physical SIM needed");
        summary.setBestForLongTrips("Local SIM Card - Most cost-effective for extended stays");
        summary.setBestForBudget("Cricket Wireless - Starting at $10/month");
        summary.setBestForCoverage("Verizon - Nationwide 5G/LTE coverage");
        
        summary.setCostComparison("Local SIM: $10-45 | eSIM: $4.50-18 | International: $4.50-20 | Roaming: $100+");
        summary.setCoverageComparison("Local SIM: Best | eSIM: Good | International: Fair | Roaming: Same as home");
        summary.setActivationComparison("eSIM: Instant | Local SIM: 2-48 hours | International: 24-72 hours | Roaming: Instant");
        
        return summary;
    }
    
    private SimInformationResponse.LocalCarrier createLocalCarrier(String name, String coverage, String area, String price, String network, String support, String activation, String pros, String cons, String acquisition, String documents) {
        SimInformationResponse.LocalCarrier carrier = new SimInformationResponse.LocalCarrier();
        carrier.setName(name);
        carrier.setCoverage(coverage + " (" + area + ")");
        carrier.setDataPlans(Arrays.asList("2GB - $15", "5GB - $25", "10GB - $35", "Unlimited - $45"));
        carrier.setPrice(price);
        carrier.setNetworkQuality(network);
        carrier.setCustomerSupport(support);
        carrier.setActivationTime(activation);
        carrier.setPros(pros);
        carrier.setCons(cons);
        carrier.setAcquisitionMethod(acquisition);
        carrier.setRequiredDocuments(documents);
        return carrier;
    }
    
    private SimInformationResponse.InternationalSIM createInternationalSIM(String name, String coverage, String price, String validity, String activation, String support, String pros, String cons, String acquisition, String compatibility) {
        SimInformationResponse.InternationalSIM sim = new SimInformationResponse.InternationalSIM();
        sim.setName(name);
        sim.setCoverage(coverage);
        sim.setDataPlans(Arrays.asList("1GB - $4.50", "3GB - $11", "5GB - $16"));
        sim.setPrice(price);
        sim.setValidity(validity);
        sim.setActivationProcess(activation);
        sim.setCustomerSupport(support);
        sim.setPros(pros);
        sim.setCons(cons);
        sim.setAcquisitionMethod(acquisition);
        sim.setCompatibility(compatibility);
        return sim;
    }
    
    private SimInformationResponse.ESIM createESIM(String name, String coverage, String price, String compatibility, String activationTime, String validity, String pros, String cons, String acquisition, String deviceRequirements) {
        SimInformationResponse.ESIM esim = new SimInformationResponse.ESIM();
        esim.setName(name);
        esim.setCoverage(coverage);
        esim.setDataPlans(Arrays.asList("1GB - $4.50", "3GB - $11", "5GB - $16"));
        esim.setPrice(price);
        esim.setCompatibility(compatibility);
        esim.setActivationTime(activationTime);
        esim.setValidity(validity);
        esim.setPros(pros);
        esim.setCons(cons);
        esim.setAcquisitionMethod(acquisition);
        esim.setDeviceRequirements(deviceRequirements);
        return esim;
    }
    
    private String calculateDurationFromDates(String startDate, String endDate) {
        if (startDate == null || endDate == null || startDate.trim().isEmpty() || endDate.trim().isEmpty()) {
            return "unknown duration";
        }
        
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate start = LocalDate.parse(startDate, formatter);
            LocalDate end = LocalDate.parse(endDate, formatter);
            
            long days = ChronoUnit.DAYS.between(start, end);
            
            if (days <= 0) {
                return "1 day";
            } else if (days == 1) {
                return "1 day";
            } else if (days < 7) {
                return days + " days";
            } else if (days < 30) {
                long weeks = (long) Math.ceil((double) days / 7);
                return weeks + " week" + (weeks > 1 ? "s" : "");
            } else if (days < 365) {
                long months = (long) Math.ceil((double) days / 30);
                return months + " month" + (months > 1 ? "s" : "");
            } else {
                long years = (long) Math.ceil((double) days / 365);
                return years + " year" + (years > 1 ? "s" : "");
            }
        } catch (Exception e) {
            log.warn("Error calculating duration from dates: {} - {}", startDate, endDate, e.getMessage());
            return "unknown duration";
        }
    }
} 