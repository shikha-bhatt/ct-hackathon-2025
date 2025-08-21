package com.ct.hackathon.model;

import lombok.Data;
import java.util.List;

@Data
public class SimInformationResponse {
    
    private String aiRecommendations;
    private SimOptions simOptions;
    
    // Default constructor
    public SimInformationResponse() {}
    
    // Constructor with parameters
    public SimInformationResponse(String aiRecommendations, SimOptions simOptions) {
        this.aiRecommendations = aiRecommendations;
        this.simOptions = simOptions;
    }
    
    @Data
    public static class SimOptions {
        private String destination;
        private List<LocalCarrier> localCarriers;
        private List<InternationalSIM> internationalSIMs;
        private List<ESIM> eSIMs;
        private ComparisonSummary comparisonSummary;
    }
    
    @Data
    public static class ComparisonSummary {
        private String bestOverall;
        private String bestForShortTrips;
        private String bestForLongTrips;
        private String bestForBudget;
        private String bestForCoverage;
        private String costComparison;
        private String coverageComparison;
        private String activationComparison;
    }
    
    @Data
    public static class LocalCarrier {
        private String name;
        private String coverage;
        private List<String> dataPlans;
        private String price;
        private String networkQuality;
        private String customerSupport;
        private String activationTime;
        private String pros;
        private String cons;
        private String acquisitionMethod;
        private String requiredDocuments;
    }
    
    @Data
    public static class InternationalSIM {
        private String name;
        private String coverage;
        private List<String> dataPlans;
        private String price;
        private String validity;
        private String activationProcess;
        private String customerSupport;
        private String pros;
        private String cons;
        private String acquisitionMethod;
        private String compatibility;
    }
    
    @Data
    public static class ESIM {
        private String name;
        private String coverage;
        private List<String> dataPlans;
        private String price;
        private String compatibility;
        private String activationTime;
        private String validity;
        private String pros;
        private String cons;
        private String acquisitionMethod;
        private String deviceRequirements;
    }
} 