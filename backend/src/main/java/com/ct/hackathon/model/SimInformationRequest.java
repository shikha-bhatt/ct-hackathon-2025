package com.ct.hackathon.model;

public class SimInformationRequest {
    
    private String destination;
    private String startDate;
    private String endDate;
    
    // Default constructor
    public SimInformationRequest() {}
    
    // Constructor with all fields
    public SimInformationRequest(String destination, String startDate, String endDate) {
        this.destination = destination;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    
    // Getter methods
    public String getDestination() {
        return destination;
    }
    
    public String getStartDate() {
        return startDate;
    }
    
    public String getEndDate() {
        return endDate;
    }
    
    // Setter methods
    public void setDestination(String destination) {
        this.destination = destination;
    }
    
    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }
    
    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
} 