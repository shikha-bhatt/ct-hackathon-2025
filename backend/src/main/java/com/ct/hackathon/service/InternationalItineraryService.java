package com.ct.hackathon.service;

import com.ct.hackathon.config.AzureOpenAIConfig;
import com.ct.hackathon.model.AzureOpenAIRequest;
import com.ct.hackathon.model.AzureOpenAIResponse;
import com.ct.hackathon.model.InternationalItineraryRequest;
import com.ct.hackathon.model.InternationalItineraryResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class InternationalItineraryService {

    private static final Logger log = LoggerFactory.getLogger(InternationalItineraryService.class);
    
    private final AzureOpenAIConfig config;
    private final WebClient.Builder webClientBuilder;
    private final ObjectMapper objectMapper;

    public InternationalItineraryService(AzureOpenAIConfig config, WebClient.Builder webClientBuilder, ObjectMapper objectMapper) {
        this.config = config;
        this.webClientBuilder = webClientBuilder;
        this.objectMapper = objectMapper;
    }

    public Mono<InternationalItineraryResponse> generateItinerary(InternationalItineraryRequest request) {
        String systemPrompt = """
            You are an expert travel planner specializing in international itineraries for Indian travelers. 
            You provide comprehensive, detailed, and personalized travel recommendations.
            
            IMPORTANT: You must respond with a valid JSON object that matches the exact structure provided below.
            Do not include any text before or after the JSON response.
            
            The response should be structured as follows:
            {
                "itinerarySummary": "Brief overview of the trip",
                "destinationInfo": "Information about the destination",
                "flights": {
                    "recommendedAirlines": ["Airline1", "Airline2"],
                    "flightOptions": [
                        {
                            "airline": "Airline Name",
                            "flightNumber": "Flight Number",
                            "departureTime": "Departure Time",
                            "arrivalTime": "Arrival Time",
                            "duration": "Flight Duration",
                            "price": "Price Range",
                            "stops": "Number of stops"
                        }
                    ],
                    "bookingTips": "Tips for booking flights",
                    "averagePrice": "Average price range",
                    "flightDuration": "Typical flight duration"
                },
                "hotels": {
                    "recommendedHotels": [
                        {
                            "name": "Hotel Name",
                            "area": "Area/Location",
                            "rating": "Rating",
                            "price": "Price Range",
                            "amenities": ["Amenity1", "Amenity2"],
                            "description": "Hotel description",
                            "foodOptions": ["Food option1", "Food option2"]
                        }
                    ],
                    "hotelAreas": ["Area1", "Area2"],
                    "averagePrice": "Average hotel price",
                    "bookingTips": "Hotel booking tips",
                    "amenities": ["Common amenities"]
                },
                "activities": {
                    "mustVisitAttractions": [
                        {
                            "name": "Attraction Name",
                            "description": "Description",
                            "duration": "Time needed",
                            "price": "Entry fee",
                            "bookingRequired": true/false,
                            "bookingLink": "Booking URL",
                            "bestTime": "Best time to visit",
                            "location": "Location"
                        }
                    ],
                    "preBookActivities": [
                        {
                            "name": "Activity Name",
                            "description": "Description",
                            "duration": "Duration",
                            "price": "Price",
                            "bookingRequired": true,
                            "bookingLink": "Booking URL",
                            "bestTime": "Best time",
                            "location": "Location"
                        }
                    ],
                    "freeActivities": [
                        {
                            "name": "Free Activity",
                            "description": "Description",
                            "duration": "Duration",
                            "price": "Free",
                            "bookingRequired": false,
                            "bookingLink": "",
                            "bestTime": "Best time",
                            "location": "Location"
                        }
                    ],
                    "activityTips": "Tips for activities"
                },
                "foodRecommendations": {
                    "localCuisine": "Local cuisine description",
                    "recommendedRestaurants": [
                        {
                            "name": "Restaurant Name",
                            "cuisine": "Cuisine type",
                            "location": "Location",
                            "priceRange": "Price range",
                            "rating": "Rating",
                            "specialties": ["Dish1", "Dish2"],
                            "dietaryOptions": ["Option1", "Option2"],
                            "reservationRequired": true/false
                        }
                    ],
                    "foodPreferences": "Food preference recommendations",
                    "dietaryOptions": ["Option1", "Option2"],
                    "foodSafetyTips": "Food safety tips",
                    "mustTryDishes": ["Dish1", "Dish2"]
                },
                "transportation": {
                    "airportTransfer": "Airport transfer options",
                    "localTransport": ["Transport option1", "Transport option2"],
                    "transportationTips": "Transportation tips",
                    "publicTransport": "Public transport info",
                    "carRental": "Car rental information"
                },
                "bookingLinks": {
                    "cleartripFlights": "Cleartrip flights URL",
                    "cleartripHotels": "Cleartrip hotels URL",
                    "trippy": "Trippy URL",
                    "bookingCom": "Booking.com URL",
                    "agoda": "Agoda URL",
                    "airbnb": "Airbnb URL",
                    "viator": "Viator URL",
                    "getYourGuide": "GetYourGuide URL"
                },
                "travelTips": "General travel tips",
                "weatherInfo": "Weather information",
                "currencyInfo": "Currency information",
                "emergencyContacts": "Emergency contact information"
            }
            
            Provide realistic, up-to-date information with actual booking links and current prices.
            Consider the traveler's food preferences, budget, and travel style.
            Include specific recommendations for Indian travelers.
            """;

        String userPrompt = String.format("""
            Create a comprehensive international travel itinerary for an Indian traveler with the following details:
            
            Origin: %s
            Destination: %s
            Start Date: %s
            End Date: %s
            Duration: %d days
            Food Preferences: %s
            Budget: %s
            Travel Style: %s
            Group Size: %d
            
            Please provide:
            1. Flight recommendations from India to %s with actual airlines and routes
            2. Hotel recommendations considering food preferences and budget
            3. Must-visit attractions and activities that require pre-booking
            4. Food recommendations based on preferences
            5. Transportation options
            6. Booking links for Cleartrip, Trippy, and other platforms
            7. Travel tips specific to Indian travelers
            8. Weather and currency information
            9. Emergency contacts
            
            Focus on providing practical, actionable information with real booking links and current information.
            """, 
            request.getOrigin(),
            request.getDestination(),
            request.getStartDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),
            request.getEndDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),
            request.getDuration(),
            request.getFoodPreferences(),
            request.getBudget(),
            request.getTravelStyle(),
            request.getGroupSize(),
            request.getDestination()
        );

        List<AzureOpenAIRequest.Message> messages = List.of(
                AzureOpenAIRequest.Message.builder()
                        .role("system")
                        .content(systemPrompt)
                        .build(),
                AzureOpenAIRequest.Message.builder()
                        .role("user")
                        .content(userPrompt)
                        .build()
        );

        return getChatCompletion(messages)
                .map(this::parseResponse)
                .doOnError(error -> log.error("Error generating itinerary: {}", error.getMessage()))
                .doOnSuccess(result -> log.info("Successfully generated itinerary for {} to {}", 
                        request.getOrigin(), request.getDestination()));
    }

    private Mono<String> getChatCompletion(List<AzureOpenAIRequest.Message> messages) {
        String url = String.format("%s/openai/deployments/%s/chat/completions?api-version=%s",
                config.getEndpoint(),
                config.getDeploymentName(),
                config.getApiVersion());

        AzureOpenAIRequest request = AzureOpenAIRequest.builder()
                .messages(messages)
                .maxTokens(config.getMaxTokens())
                .temperature(config.getTemperature())
                .topP(1.0)
                .model(config.getDeploymentName())
                .build();

        return webClientBuilder.build()
                .post()
                .uri(url)
                .header("api-key", config.getApiKey())
                .header("Content-Type", "application/json")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(AzureOpenAIResponse.class)
                .map(response -> {
                    if (response.getChoices() != null && !response.getChoices().isEmpty()) {
                        return response.getChoices().get(0).getMessage().getContent();
                    }
                    throw new RuntimeException("No response from Azure OpenAI");
                });
    }

    private InternationalItineraryResponse parseResponse(String response) {
        try {
            // Clean the response to extract only the JSON part
            String jsonResponse = extractJsonFromResponse(response);
            return objectMapper.readValue(jsonResponse, InternationalItineraryResponse.class);
        } catch (JsonProcessingException e) {
            log.error("Error parsing AI response: {}", e.getMessage());
            throw new RuntimeException("Failed to parse AI response", e);
        }
    }

    private String extractJsonFromResponse(String response) {
        // Find the first occurrence of { and last occurrence of }
        int startIndex = response.indexOf('{');
        int endIndex = response.lastIndexOf('}');
        
        if (startIndex != -1 && endIndex != -1 && endIndex > startIndex) {
            return response.substring(startIndex, endIndex + 1);
        }
        
        // If no JSON found, return the original response
        return response;
    }
} 