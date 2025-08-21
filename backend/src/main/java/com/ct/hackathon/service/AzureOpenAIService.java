package com.ct.hackathon.service;

import com.ct.hackathon.config.AzureOpenAIConfig;
import com.ct.hackathon.model.AzureOpenAIRequest;
import com.ct.hackathon.model.AzureOpenAIResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class AzureOpenAIService {

    private static final Logger log = LoggerFactory.getLogger(AzureOpenAIService.class);
    
    private final AzureOpenAIConfig config;
    private final WebClient.Builder webClientBuilder;

    public AzureOpenAIService(AzureOpenAIConfig config, WebClient.Builder webClientBuilder) {
        this.config = config;
        this.webClientBuilder = webClientBuilder;
    }

    public Mono<String> getChatCompletion(List<AzureOpenAIRequest.Message> messages) {
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
                })
                .doOnError(error -> log.error("Error calling Azure OpenAI: {}", error.getMessage()))
                .doOnSuccess(result -> log.info("Successfully received response from Azure OpenAI"));
    }

    public Mono<String> getForexExchangeRecommendations(String destination, Double amount, String sourceCurrency) {
        String systemPrompt = """
            You are a forex exchange expert specializing in international currency exchange for Indian travelers. 
            Provide comprehensive, accurate, and up-to-date information about currency exchange for international travel. 
            Include specific details about rates, fees, best practices, and provide actionable recommendations.
            
            Format your response in a structured way with clear sections for:
            1. Current exchange rate information
            2. Best platforms or services for currency exchange
            3. RBI regulations and documentation requirements
            4. Fees, charges, and hidden costs
            5. Best practices for currency exchange
            6. Restrictions or limitations
            7. Most secure and reliable exchange methods
            8. Exchange before travel or at destination
            9. Alternative payment methods
            10. Links to reliable exchange services
            11. Current trends in exchange rates
            12. Country-specific exchange information
            
            Be specific about the destination and provide real, actionable information.
            """;

        String userPrompt = String.format("""
            I'm planning to travel to %s and need to exchange %s %s. 
            Please provide comprehensive forex exchange information including:
            
            1. What's the current exchange rate for %s to the local currency of %s?
            2. What are the best platforms or services to exchange currency?
            3. What are the RBI regulations and documentation requirements?
            4. What fees, charges, and hidden costs should I be aware of?
            5. What are the best practices for currency exchange?
            6. Are there any restrictions or limitations I should know about?
            7. What are the most secure and reliable exchange methods?
            8. Should I exchange before travel or at the destination?
            9. What alternative payment methods are available?
            10. Can you provide links to reliable exchange services?
            11. What are the current trends in exchange rates?
            12. Any country-specific exchange information for %s?
            
            Please provide comprehensive, detailed information that would help a traveler make an informed decision.
            """, destination, amount, sourceCurrency, sourceCurrency, destination, destination);

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

        return getChatCompletion(messages);
    }

    public Mono<String> getZeroForexCardRecommendations(String destination) {
        String systemPrompt = """
            You are a financial travel expert specializing in zero-forex credit cards. 
            Provide comprehensive, accurate, and up-to-date information about zero-forex cards 
            for international travel. Include specific details about fees, acceptance, 
            application processes, and provide actionable recommendations.
            
            Format your response in a structured way with clear sections for:
            1. Overview of zero-forex cards for the destination
            2. Top recommended cards with detailed analysis
            3. Comparison of fees and features
            4. Application process and requirements
            5. Tips for maximizing benefits
            6. Links to official application portals
            7. Price comparisons and cost analysis
            
            Be specific about the destination and provide real, actionable information.
            """;

        String userPrompt = String.format("""
            I'm planning to travel to %s and need information about zero-forex credit cards. 
            Please provide:
            
            1. Which zero-forex cards are best for %s?
            2. What are the fees and charges for each card?
            3. How widely are these cards accepted in %s?
            4. What's the application process and requirements?
            5. Which card would you recommend and why?
            6. How do the costs compare to traditional forex cards?
            7. Any tips for getting the best deals?
            8. Direct links to apply for these cards
            
            Please provide comprehensive, detailed information that would help a traveler make an informed decision.
            """, destination, destination, destination);

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

        return getChatCompletion(messages);
    }
} 