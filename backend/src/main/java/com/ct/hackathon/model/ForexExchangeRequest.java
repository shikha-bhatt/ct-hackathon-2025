package com.ct.hackathon.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class ForexExchangeRequest {
    
    @NotBlank(message = "Destination is required")
    private String destination;
    
    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    private Double amount;
    
    private String currency = "INR"; // Default to INR as origin currency

    public ForexExchangeRequest() {}

    public ForexExchangeRequest(String destination, Double amount) {
        this.destination = destination;
        this.amount = amount;
    }

    public ForexExchangeRequest(String destination, Double amount, String currency) {
        this.destination = destination;
        this.amount = amount;
        this.currency = currency;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    @Override
    public String toString() {
        return "ForexExchangeRequest{" +
                "destination='" + destination + '\'' +
                ", amount=" + amount +
                ", currency='" + currency + '\'' +
                '}';
    }
} 