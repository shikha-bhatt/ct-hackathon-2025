package com.ct.hackathon.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;

public class InternationalItineraryRequest {
    
    @JsonProperty("origin")
    private String origin;
    
    @JsonProperty("destination")
    private String destination;
    
    @JsonProperty("startDate")
    private LocalDate startDate;
    
    @JsonProperty("endDate")
    private LocalDate endDate;
    
    @JsonProperty("duration")
    private Integer duration;
    
    @JsonProperty("foodPreferences")
    private String foodPreferences;
    
    @JsonProperty("budget")
    private String budget;
    
    @JsonProperty("travelStyle")
    private String travelStyle; // luxury, budget, mid-range, etc.
    
    @JsonProperty("groupSize")
    private Integer groupSize;

    // Default constructor
    public InternationalItineraryRequest() {}

    // Constructor with all fields
    public InternationalItineraryRequest(String origin, String destination, LocalDate startDate, LocalDate endDate, 
                                       Integer duration, String foodPreferences, String budget, String travelStyle, Integer groupSize) {
        this.origin = origin;
        this.destination = destination;
        this.startDate = startDate;
        this.endDate = endDate;
        this.duration = duration;
        this.foodPreferences = foodPreferences;
        this.budget = budget;
        this.travelStyle = travelStyle;
        this.groupSize = groupSize;
    }

    // Getters
    public String getOrigin() { return origin; }
    public String getDestination() { return destination; }
    public LocalDate getStartDate() { return startDate; }
    public LocalDate getEndDate() { return endDate; }
    public Integer getDuration() { return duration; }
    public String getFoodPreferences() { return foodPreferences; }
    public String getBudget() { return budget; }
    public String getTravelStyle() { return travelStyle; }
    public Integer getGroupSize() { return groupSize; }

    // Setters
    public void setOrigin(String origin) { this.origin = origin; }
    public void setDestination(String destination) { this.destination = destination; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    public void setDuration(Integer duration) { this.duration = duration; }
    public void setFoodPreferences(String foodPreferences) { this.foodPreferences = foodPreferences; }
    public void setBudget(String budget) { this.budget = budget; }
    public void setTravelStyle(String travelStyle) { this.travelStyle = travelStyle; }
    public void setGroupSize(Integer groupSize) { this.groupSize = groupSize; }

    // Builder pattern
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String origin;
        private String destination;
        private LocalDate startDate;
        private LocalDate endDate;
        private Integer duration;
        private String foodPreferences;
        private String budget;
        private String travelStyle;
        private Integer groupSize;

        public Builder origin(String origin) { this.origin = origin; return this; }
        public Builder destination(String destination) { this.destination = destination; return this; }
        public Builder startDate(LocalDate startDate) { this.startDate = startDate; return this; }
        public Builder endDate(LocalDate endDate) { this.endDate = endDate; return this; }
        public Builder duration(Integer duration) { this.duration = duration; return this; }
        public Builder foodPreferences(String foodPreferences) { this.foodPreferences = foodPreferences; return this; }
        public Builder budget(String budget) { this.budget = budget; return this; }
        public Builder travelStyle(String travelStyle) { this.travelStyle = travelStyle; return this; }
        public Builder groupSize(Integer groupSize) { this.groupSize = groupSize; return this; }

        public InternationalItineraryRequest build() {
            return new InternationalItineraryRequest(origin, destination, startDate, endDate, duration, foodPreferences, budget, travelStyle, groupSize);
        }
    }
} 