package com.ct.hackathon.model;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class VisaInformationResponse {
    
    private String destination;
    private String purposeOfVisit;
    private String nationality;
    private String visaInformation;
    private String minimumApplicationTime;
    private String requiredDocuments;
    private String officialWebsite;
    private String estimatedProcessingTime;
    private String visaFees;
    private String additionalNotes;
    private String status;
    private String message;
    private VisaRequirementsData visaRequirementsData;

    public VisaInformationResponse() {}

    public VisaInformationResponse(String destination, String purposeOfVisit, String nationality, String visaInformation) {
        this.destination = destination;
        this.purposeOfVisit = purposeOfVisit;
        this.nationality = nationality;
        this.visaInformation = visaInformation;
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

    public String getVisaInformation() {
        return visaInformation;
    }

    public void setVisaInformation(String visaInformation) {
        this.visaInformation = visaInformation;
    }

    public String getMinimumApplicationTime() {
        return minimumApplicationTime;
    }

    public void setMinimumApplicationTime(String minimumApplicationTime) {
        this.minimumApplicationTime = minimumApplicationTime;
    }

    public String getRequiredDocuments() {
        return requiredDocuments;
    }

    public void setRequiredDocuments(String requiredDocuments) {
        this.requiredDocuments = requiredDocuments;
    }

    public String getOfficialWebsite() {
        return officialWebsite;
    }

    public void setOfficialWebsite(String officialWebsite) {
        this.officialWebsite = officialWebsite;
    }

    public String getEstimatedProcessingTime() {
        return estimatedProcessingTime;
    }

    public void setEstimatedProcessingTime(String estimatedProcessingTime) {
        this.estimatedProcessingTime = estimatedProcessingTime;
    }

    public String getVisaFees() {
        return visaFees;
    }

    public void setVisaFees(String visaFees) {
        this.visaFees = visaFees;
    }

    public String getAdditionalNotes() {
        return additionalNotes;
    }

    public void setAdditionalNotes(String additionalNotes) {
        this.additionalNotes = additionalNotes;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public VisaRequirementsData getVisaRequirementsData() {
        return visaRequirementsData;
    }

    public void setVisaRequirementsData(VisaRequirementsData visaRequirementsData) {
        this.visaRequirementsData = visaRequirementsData;
    }

    @Override
    public String toString() {
        return "VisaInformationResponse{" +
                "destination='" + destination + '\'' +
                ", purposeOfVisit='" + purposeOfVisit + '\'' +
                ", nationality='" + nationality + '\'' +
                ", visaInformation='" + visaInformation + '\'' +
                ", minimumApplicationTime='" + minimumApplicationTime + '\'' +
                ", requiredDocuments='" + requiredDocuments + '\'' +
                ", officialWebsite='" + officialWebsite + '\'' +
                ", estimatedProcessingTime='" + estimatedProcessingTime + '\'' +
                ", visaFees='" + visaFees + '\'' +
                ", additionalNotes='" + additionalNotes + '\'' +
                ", status='" + status + '\'' +
                ", message='" + message + '\'' +
                ", visaRequirementsData=" + visaRequirementsData +
                '}';
    }
} 