package com.ct.hackathon.model;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class VisaType {
    
    private String type;
    private String validity;
    private String processingTime;
    private String fee;

    public VisaType() {}

    public VisaType(String type, String validity, String processingTime, String fee) {
        this.type = type;
        this.validity = validity;
        this.processingTime = processingTime;
        this.fee = fee;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getValidity() {
        return validity;
    }

    public void setValidity(String validity) {
        this.validity = validity;
    }

    public String getProcessingTime() {
        return processingTime;
    }

    public void setProcessingTime(String processingTime) {
        this.processingTime = processingTime;
    }

    public String getFee() {
        return fee;
    }

    public void setFee(String fee) {
        this.fee = fee;
    }

    @Override
    public String toString() {
        return "VisaType{" +
                "type='" + type + '\'' +
                ", validity='" + validity + '\'' +
                ", processingTime='" + processingTime + '\'' +
                ", fee='" + fee + '\'' +
                '}';
    }
} 