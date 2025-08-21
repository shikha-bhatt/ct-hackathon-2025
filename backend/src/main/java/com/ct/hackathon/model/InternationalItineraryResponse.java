package com.ct.hackathon.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class InternationalItineraryResponse {
    
    @JsonProperty("itinerarySummary")
    private String itinerarySummary;
    
    @JsonProperty("destinationInfo")
    private String destinationInfo;
    
    @JsonProperty("flights")
    private FlightInformation flights;
    
    @JsonProperty("hotels")
    private HotelInformation hotels;
    
    @JsonProperty("activities")
    private ActivityInformation activities;
    
    @JsonProperty("foodRecommendations")
    private FoodInformation foodRecommendations;
    
    @JsonProperty("transportation")
    private TransportationInformation transportation;
    
    @JsonProperty("bookingLinks")
    private BookingLinks bookingLinks;
    
    @JsonProperty("travelTips")
    private String travelTips;
    
    @JsonProperty("weatherInfo")
    private String weatherInfo;
    
    @JsonProperty("currencyInfo")
    private String currencyInfo;
    
    @JsonProperty("emergencyContacts")
    private String emergencyContacts;

    // Default constructor
    public InternationalItineraryResponse() {}

    // Constructor with all fields
    public InternationalItineraryResponse(String itinerarySummary, String destinationInfo, FlightInformation flights,
                                        HotelInformation hotels, ActivityInformation activities, FoodInformation foodRecommendations,
                                        TransportationInformation transportation, BookingLinks bookingLinks, String travelTips,
                                        String weatherInfo, String currencyInfo, String emergencyContacts) {
        this.itinerarySummary = itinerarySummary;
        this.destinationInfo = destinationInfo;
        this.flights = flights;
        this.hotels = hotels;
        this.activities = activities;
        this.foodRecommendations = foodRecommendations;
        this.transportation = transportation;
        this.bookingLinks = bookingLinks;
        this.travelTips = travelTips;
        this.weatherInfo = weatherInfo;
        this.currencyInfo = currencyInfo;
        this.emergencyContacts = emergencyContacts;
    }

    // Builder pattern
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String itinerarySummary;
        private String destinationInfo;
        private FlightInformation flights;
        private HotelInformation hotels;
        private ActivityInformation activities;
        private FoodInformation foodRecommendations;
        private TransportationInformation transportation;
        private BookingLinks bookingLinks;
        private String travelTips;
        private String weatherInfo;
        private String currencyInfo;
        private String emergencyContacts;

        public Builder itinerarySummary(String itinerarySummary) { this.itinerarySummary = itinerarySummary; return this; }
        public Builder destinationInfo(String destinationInfo) { this.destinationInfo = destinationInfo; return this; }
        public Builder flights(FlightInformation flights) { this.flights = flights; return this; }
        public Builder hotels(HotelInformation hotels) { this.hotels = hotels; return this; }
        public Builder activities(ActivityInformation activities) { this.activities = activities; return this; }
        public Builder foodRecommendations(FoodInformation foodRecommendations) { this.foodRecommendations = foodRecommendations; return this; }
        public Builder transportation(TransportationInformation transportation) { this.transportation = transportation; return this; }
        public Builder bookingLinks(BookingLinks bookingLinks) { this.bookingLinks = bookingLinks; return this; }
        public Builder travelTips(String travelTips) { this.travelTips = travelTips; return this; }
        public Builder weatherInfo(String weatherInfo) { this.weatherInfo = weatherInfo; return this; }
        public Builder currencyInfo(String currencyInfo) { this.currencyInfo = currencyInfo; return this; }
        public Builder emergencyContacts(String emergencyContacts) { this.emergencyContacts = emergencyContacts; return this; }

        public InternationalItineraryResponse build() {
            return new InternationalItineraryResponse(itinerarySummary, destinationInfo, flights, hotels, activities, 
                                                    foodRecommendations, transportation, bookingLinks, travelTips, 
                                                    weatherInfo, currencyInfo, emergencyContacts);
        }
    }
    
    // Getter methods
    public String getItinerarySummary() { return itinerarySummary; }
    public String getDestinationInfo() { return destinationInfo; }
    public FlightInformation getFlights() { return flights; }
    public HotelInformation getHotels() { return hotels; }
    public ActivityInformation getActivities() { return activities; }
    public FoodInformation getFoodRecommendations() { return foodRecommendations; }
    public TransportationInformation getTransportation() { return transportation; }
    public BookingLinks getBookingLinks() { return bookingLinks; }
    public String getTravelTips() { return travelTips; }
    public String getWeatherInfo() { return weatherInfo; }
    public String getCurrencyInfo() { return currencyInfo; }
    public String getEmergencyContacts() { return emergencyContacts; }
    
    // Setter methods
    public void setItinerarySummary(String itinerarySummary) { this.itinerarySummary = itinerarySummary; }
    public void setDestinationInfo(String destinationInfo) { this.destinationInfo = destinationInfo; }
    public void setFlights(FlightInformation flights) { this.flights = flights; }
    public void setHotels(HotelInformation hotels) { this.hotels = hotels; }
    public void setActivities(ActivityInformation activities) { this.activities = activities; }
    public void setFoodRecommendations(FoodInformation foodRecommendations) { this.foodRecommendations = foodRecommendations; }
    public void setTransportation(TransportationInformation transportation) { this.transportation = transportation; }
    public void setBookingLinks(BookingLinks bookingLinks) { this.bookingLinks = bookingLinks; }
    public void setTravelTips(String travelTips) { this.travelTips = travelTips; }
    public void setWeatherInfo(String weatherInfo) { this.weatherInfo = weatherInfo; }
    public void setCurrencyInfo(String currencyInfo) { this.currencyInfo = currencyInfo; }
    public void setEmergencyContacts(String emergencyContacts) { this.emergencyContacts = emergencyContacts; }
    
    public static class FlightInformation {
        @JsonProperty("recommendedAirlines")
        private List<String> recommendedAirlines;
        
        @JsonProperty("flightOptions")
        private List<FlightOption> flightOptions;
        
        @JsonProperty("bookingTips")
        private String bookingTips;
        
        @JsonProperty("averagePrice")
        private String averagePrice;
        
        @JsonProperty("flightDuration")
        private String flightDuration;
    }
    
    public static class FlightOption {
        @JsonProperty("airline")
        private String airline;
        
        @JsonProperty("flightNumber")
        private String flightNumber;
        
        @JsonProperty("departureTime")
        private String departureTime;
        
        @JsonProperty("arrivalTime")
        private String arrivalTime;
        
        @JsonProperty("duration")
        private String duration;
        
        @JsonProperty("price")
        private String price;
        
        @JsonProperty("stops")
        private String stops;
    }
    
    public static class HotelInformation {
        @JsonProperty("recommendedHotels")
        private List<HotelOption> recommendedHotels;
        
        @JsonProperty("hotelAreas")
        private List<String> hotelAreas;
        
        @JsonProperty("averagePrice")
        private String averagePrice;
        
        @JsonProperty("bookingTips")
        private String bookingTips;
        
        @JsonProperty("amenities")
        private List<String> amenities;
    }
    
    public static class HotelOption {
        @JsonProperty("name")
        private String name;
        
        @JsonProperty("area")
        private String area;
        
        @JsonProperty("rating")
        private String rating;
        
        @JsonProperty("price")
        private String price;
        
        @JsonProperty("amenities")
        private List<String> amenities;
        
        @JsonProperty("description")
        private String description;
        
        @JsonProperty("foodOptions")
        private List<String> foodOptions;
    }
    
    public static class ActivityInformation {
        @JsonProperty("mustVisitAttractions")
        private List<Activity> mustVisitAttractions;
        
        @JsonProperty("preBookActivities")
        private List<Activity> preBookActivities;
        
        @JsonProperty("freeActivities")
        private List<Activity> freeActivities;
        
        @JsonProperty("activityTips")
        private String activityTips;
    }
    
    public static class Activity {
        @JsonProperty("name")
        private String name;
        
        @JsonProperty("description")
        private String description;
        
        @JsonProperty("duration")
        private String duration;
        
        @JsonProperty("price")
        private String price;
        
        @JsonProperty("bookingRequired")
        private Boolean bookingRequired;
        
        @JsonProperty("bookingLink")
        private String bookingLink;
        
        @JsonProperty("bestTime")
        private String bestTime;
        
        @JsonProperty("location")
        private String location;
    }
    
    public static class FoodInformation {
        @JsonProperty("localCuisine")
        private String localCuisine;
        
        @JsonProperty("recommendedRestaurants")
        private List<Restaurant> recommendedRestaurants;
        
        @JsonProperty("foodPreferences")
        private String foodPreferences;
        
        @JsonProperty("dietaryOptions")
        private List<String> dietaryOptions;
        
        @JsonProperty("foodSafetyTips")
        private String foodSafetyTips;
        
        @JsonProperty("mustTryDishes")
        private List<String> mustTryDishes;
    }
    
    public static class Restaurant {
        @JsonProperty("name")
        private String name;
        
        @JsonProperty("cuisine")
        private String cuisine;
        
        @JsonProperty("location")
        private String location;
        
        @JsonProperty("priceRange")
        private String priceRange;
        
        @JsonProperty("rating")
        private String rating;
        
        @JsonProperty("specialties")
        private List<String> specialties;
        
        @JsonProperty("dietaryOptions")
        private List<String> dietaryOptions;
        
        @JsonProperty("reservationRequired")
        private Boolean reservationRequired;
    }
    
    public static class TransportationInformation {
        @JsonProperty("airportTransfer")
        private String airportTransfer;
        
        @JsonProperty("localTransport")
        private List<String> localTransport;
        
        @JsonProperty("transportationTips")
        private String transportationTips;
        
        @JsonProperty("publicTransport")
        private String publicTransport;
        
        @JsonProperty("carRental")
        private String carRental;
    }
    
    public static class BookingLinks {
        @JsonProperty("cleartripFlights")
        private String cleartripFlights;
        
        @JsonProperty("cleartripHotels")
        private String cleartripHotels;
        
        @JsonProperty("trippy")
        private String trippy;
        
        @JsonProperty("bookingCom")
        private String bookingCom;
        
        @JsonProperty("agoda")
        private String agoda;
        
        @JsonProperty("airbnb")
        private String airbnb;
        
        @JsonProperty("viator")
        private String viator;
        
        @JsonProperty("getYourGuide")
        private String getYourGuide;
    }
} 