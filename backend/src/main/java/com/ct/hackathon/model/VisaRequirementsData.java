package com.ct.hackathon.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class VisaRequirementsData {
    
    private String destination;
    private List<VisaType> visaTypes;
    private List<String> requiredDocuments;
    private List<String> applicationProcess;

    public VisaRequirementsData() {}

    public VisaRequirementsData(String destination, List<VisaType> visaTypes, List<String> requiredDocuments, List<String> applicationProcess) {
        this.destination = destination;
        this.visaTypes = visaTypes;
        this.requiredDocuments = requiredDocuments;
        this.applicationProcess = applicationProcess;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public List<VisaType> getVisaTypes() {
        return visaTypes;
    }

    public void setVisaTypes(List<VisaType> visaTypes) {
        this.visaTypes = visaTypes;
    }

    public List<String> getRequiredDocuments() {
        return requiredDocuments;
    }

    public void setRequiredDocuments(List<String> requiredDocuments) {
        this.requiredDocuments = requiredDocuments;
    }

    public List<String> getApplicationProcess() {
        return applicationProcess;
    }

    public void setApplicationProcess(List<String> applicationProcess) {
        this.applicationProcess = applicationProcess;
    }

    @Override
    public String toString() {
        return "VisaRequirementsData{" +
                "destination='" + destination + '\'' +
                ", visaTypes=" + visaTypes +
                ", requiredDocuments=" + requiredDocuments +
                ", applicationProcess=" + applicationProcess +
                '}';
    }
} 