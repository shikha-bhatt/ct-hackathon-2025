package com.ct.hackathon.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class VisaInformationRequest {
    
    @NotBlank(message = "Destination is required")
    private String destination;
    
    @NotBlank(message = "Purpose of visit is required")
    private String purposeOfVisit;
    
    @NotBlank(message = "Nationality is required")
    private String nationality = "Indian"; // Default to Indian as specified

    public VisaInformationRequest() {}

    public VisaInformationRequest(String destination, String purposeOfVisit) {
        this.destination = destination;
        this.purposeOfVisit = purposeOfVisit;
        this.nationality = "Indian";
    }

    public VisaInformationRequest(String destination, String purposeOfVisit, String nationality) {
        this.destination = destination;
        this.purposeOfVisit = purposeOfVisit;
        this.nationality = nationality;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getPurposeOfVisit() {
        return purposeOfVisit;
    }

    public void setPurposeOfVisit(String purposeOfVisit) {
        this.purposeOfVisit = purposeOfVisit;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    @Override
    public String toString() {
        return "VisaInformationRequest{" +
                "destination='" + destination + '\'' +
                ", purposeOfVisit='" + purposeOfVisit + '\'' +
                ", nationality='" + nationality + '\'' +
                '}';
    }
} 