package com.ct.hackathon.model;

public class ZeroForexCardRequest {
    private String destination;

    public ZeroForexCardRequest() {}

    public ZeroForexCardRequest(String destination) {
        this.destination = destination;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }
} 