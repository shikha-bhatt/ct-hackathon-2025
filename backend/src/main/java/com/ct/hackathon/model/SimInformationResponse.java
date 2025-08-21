package com.ct.hackathon.model;

import java.util.List;

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
    
    // Getter methods
    public String getAiRecommendations() {
        return aiRecommendations;
    }
    
    public SimOptions getSimOptions() {
        return simOptions;
    }
    
    // Setter methods
    public void setAiRecommendations(String aiRecommendations) {
        this.aiRecommendations = aiRecommendations;
    }
    
    public void setSimOptions(SimOptions simOptions) {
        this.simOptions = simOptions;
    }
    
    public static class SimOptions {
        private String destination;
        private List<LocalCarrier> localCarriers;
        private List<InternationalSIM> internationalSIMs;
        private List<ESIM> eSIMs;
        private ComparisonSummary comparisonSummary;
        
        // Default constructor
        public SimOptions() {}
        
        // Getter methods
        public String getDestination() {
            return destination;
        }
        
        public List<LocalCarrier> getLocalCarriers() {
            return localCarriers;
        }
        
        public List<InternationalSIM> getInternationalSIMs() {
            return internationalSIMs;
        }
        
        public List<ESIM> getESIMs() {
            return eSIMs;
        }
        
        public ComparisonSummary getComparisonSummary() {
            return comparisonSummary;
        }
        
        // Setter methods
        public void setDestination(String destination) {
            this.destination = destination;
        }
        
        public void setLocalCarriers(List<LocalCarrier> localCarriers) {
            this.localCarriers = localCarriers;
        }
        
        public void setInternationalSIMs(List<InternationalSIM> internationalSIMs) {
            this.internationalSIMs = internationalSIMs;
        }
        
        public void setESIMs(List<ESIM> eSIMs) {
            this.eSIMs = eSIMs;
        }
        
        public void setComparisonSummary(ComparisonSummary comparisonSummary) {
            this.comparisonSummary = comparisonSummary;
        }
    }
    
    public static class ComparisonSummary {
        private String bestOverall;
        private String bestForShortTrips;
        private String bestForLongTrips;
        private String bestForBudget;
        private String bestForCoverage;
        private String costComparison;
        private String coverageComparison;
        private String activationComparison;
        
        // Default constructor
        public ComparisonSummary() {}
        
        // Getter methods
        public String getBestOverall() { return bestOverall; }
        public String getBestForShortTrips() { return bestForShortTrips; }
        public String getBestForLongTrips() { return bestForLongTrips; }
        public String getBestForBudget() { return bestForBudget; }
        public String getBestForCoverage() { return bestForCoverage; }
        public String getCostComparison() { return costComparison; }
        public String getCoverageComparison() { return coverageComparison; }
        public String getActivationComparison() { return activationComparison; }
        
        // Setter methods
        public void setBestOverall(String bestOverall) { this.bestOverall = bestOverall; }
        public void setBestForShortTrips(String bestForShortTrips) { this.bestForShortTrips = bestForShortTrips; }
        public void setBestForLongTrips(String bestForLongTrips) { this.bestForLongTrips = bestForLongTrips; }
        public void setBestForBudget(String bestForBudget) { this.bestForBudget = bestForBudget; }
        public void setBestForCoverage(String bestForCoverage) { this.bestForCoverage = bestForCoverage; }
        public void setCostComparison(String costComparison) { this.costComparison = costComparison; }
        public void setCoverageComparison(String coverageComparison) { this.coverageComparison = coverageComparison; }
        public void setActivationComparison(String activationComparison) { this.activationComparison = activationComparison; }
    }
    
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
        
        // Default constructor
        public LocalCarrier() {}
        
        // Getter methods
        public String getName() { return name; }
        public String getCoverage() { return coverage; }
        public List<String> getDataPlans() { return dataPlans; }
        public String getPrice() { return price; }
        public String getNetworkQuality() { return networkQuality; }
        public String getCustomerSupport() { return customerSupport; }
        public String getActivationTime() { return activationTime; }
        public String getPros() { return pros; }
        public String getCons() { return cons; }
        public String getAcquisitionMethod() { return acquisitionMethod; }
        public String getRequiredDocuments() { return requiredDocuments; }
        
        // Setter methods
        public void setName(String name) { this.name = name; }
        public void setCoverage(String coverage) { this.coverage = coverage; }
        public void setDataPlans(List<String> dataPlans) { this.dataPlans = dataPlans; }
        public void setPrice(String price) { this.price = price; }
        public void setNetworkQuality(String networkQuality) { this.networkQuality = networkQuality; }
        public void setCustomerSupport(String customerSupport) { this.customerSupport = customerSupport; }
        public void setActivationTime(String activationTime) { this.activationTime = activationTime; }
        public void setPros(String pros) { this.pros = pros; }
        public void setCons(String cons) { this.cons = cons; }
        public void setAcquisitionMethod(String acquisitionMethod) { this.acquisitionMethod = acquisitionMethod; }
        public void setRequiredDocuments(String requiredDocuments) { this.requiredDocuments = requiredDocuments; }
    }
    
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
        
        // Default constructor
        public InternationalSIM() {}
        
        // Getter methods
        public String getName() { return name; }
        public String getCoverage() { return coverage; }
        public List<String> getDataPlans() { return dataPlans; }
        public String getPrice() { return price; }
        public String getValidity() { return validity; }
        public String getActivationProcess() { return activationProcess; }
        public String getCustomerSupport() { return customerSupport; }
        public String getPros() { return pros; }
        public String getCons() { return cons; }
        public String getAcquisitionMethod() { return acquisitionMethod; }
        public String getCompatibility() { return compatibility; }
        
        // Setter methods
        public void setName(String name) { this.name = name; }
        public void setCoverage(String coverage) { this.coverage = coverage; }
        public void setDataPlans(List<String> dataPlans) { this.dataPlans = dataPlans; }
        public void setPrice(String price) { this.price = price; }
        public void setValidity(String validity) { this.validity = validity; }
        public void setActivationProcess(String activationProcess) { this.activationProcess = activationProcess; }
        public void setCustomerSupport(String customerSupport) { this.customerSupport = customerSupport; }
        public void setPros(String pros) { this.pros = pros; }
        public void setCons(String cons) { this.cons = cons; }
        public void setAcquisitionMethod(String acquisitionMethod) { this.acquisitionMethod = acquisitionMethod; }
        public void setCompatibility(String compatibility) { this.compatibility = compatibility; }
    }
    
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
        
        // Default constructor
        public ESIM() {}
        
        // Getter methods
        public String getName() { return name; }
        public String getCoverage() { return coverage; }
        public List<String> getDataPlans() { return dataPlans; }
        public String getPrice() { return price; }
        public String getCompatibility() { return compatibility; }
        public String getActivationTime() { return activationTime; }
        public String getValidity() { return validity; }
        public String getPros() { return pros; }
        public String getCons() { return cons; }
        public String getAcquisitionMethod() { return acquisitionMethod; }
        public String getDeviceRequirements() { return deviceRequirements; }
        
        // Setter methods
        public void setName(String name) { this.name = name; }
        public void setCoverage(String coverage) { this.coverage = coverage; }
        public void setDataPlans(List<String> dataPlans) { this.dataPlans = dataPlans; }
        public void setPrice(String price) { this.price = price; }
        public void setCompatibility(String compatibility) { this.compatibility = compatibility; }
        public void setActivationTime(String activationTime) { this.activationTime = activationTime; }
        public void setValidity(String validity) { this.validity = validity; }
        public void setPros(String pros) { this.pros = pros; }
        public void setCons(String cons) { this.cons = cons; }
        public void setAcquisitionMethod(String acquisitionMethod) { this.acquisitionMethod = acquisitionMethod; }
        public void setDeviceRequirements(String deviceRequirements) { this.deviceRequirements = deviceRequirements; }
    }
} 