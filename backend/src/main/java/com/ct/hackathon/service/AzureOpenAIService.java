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

    public Mono<String> getVisaInformation(String destination, String purposeOfVisit, String nationality) {
        String systemPrompt = """
            You are a visa and immigration expert specializing in international travel visas for Indian citizens. 
            Provide comprehensive, accurate, and up-to-date information about visa requirements, 
            application processes, and travel documentation. Include specific details about processing times, 
            fees, required documents, and provide actionable recommendations.
            
            Format your response in a structured way with clear sections for:
            1. Visa Type and Requirements
            2. Minimum Application Time (when to apply before travel)
            3. Required Documents (complete list with specifications)
            4. Official Application Website (authentic government portals)
            5. Estimated Processing Time (realistic timelines)
            6. Visa Fees (current rates in INR and USD)
            7. Application Process Steps
            8. Important Notes and Tips
            9. Common Rejection Reasons
            10. Emergency Contact Information
            11. Travel Insurance Requirements
            12. COVID-19 Related Requirements (if applicable)
            
            Be specific about the destination, purpose of visit, and provide real, actionable information 
            that would help an Indian traveler make informed decisions. Include official government websites 
            and current fee structures.
            """;

        String userPrompt = String.format("""
            I'm an Indian citizen planning to travel to %s for %s. 
            Please provide comprehensive visa information including:
            
            1. What type of visa do I need for %s purpose to %s?
            2. What's the minimum time I should apply before my travel date?
            3. What documents are required for the visa application?
            4. What's the official website to apply for the visa?
            5. How long does the visa processing typically take?
            6. What are the current visa fees in INR and USD?
            7. What's the step-by-step application process?
            8. Any important notes or tips for Indian applicants?
            9. What are common reasons for visa rejection?
            10. Any emergency contact information?
            11. Is travel insurance required?
            12. Any COVID-19 related requirements?
            
            Please provide comprehensive, detailed information that would help an Indian traveler 
            successfully apply for and obtain a visa for %s.
            """, destination, purposeOfVisit, purposeOfVisit, destination, destination);

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

    public Mono<String> getSimInformationRecommendations(String destination, String duration) {
        String systemPrompt = """
            You are a travel connectivity expert specializing in international SIM cards and mobile connectivity for Indian travelers. 
            Provide comprehensive, accurate, and up-to-date information about SIM card options, 
            network coverage, costs, and connectivity solutions. Include specific details about 
            local carriers, eSIM options, international SIMs, and provide actionable recommendations.
            
            Format your response in a structured way with clear sections for:
            1. **SIM Type Comparison** (Local SIM vs eSIM vs International SIM vs Roaming)
            2. **Cost Analysis** (Total cost including activation, data, and hidden fees)
            3. **Network Coverage** (Best carriers for different regions in the destination)
            4. **Acquisition Methods** (Where and how to get each SIM type)
            5. **Travel Tips** (Best practices, activation time, customer support)
            6. **Risk Assessment** (Potential issues and how to avoid them)
            7. **Country-Specific Information** (Local carriers, regulations, requirements)
            8. **Price Comparisons** (Detailed cost breakdown for different options)
            9. **Network Quality** (Speed, coverage maps, reliability)
            10. **Activation Process** (Step-by-step guide for each option)
            11. **Customer Support** (Language support, availability, contact methods)
            12. **Best Recommendations** (Top picks based on trip duration and budget)
            
            Be specific about the destination, duration, and provide real, actionable information 
            that would help an Indian traveler make informed decisions. Include current pricing, 
            official websites, and practical tips for getting the best connectivity.
            """;

        String userPrompt = String.format("""
            I'm an Indian traveler planning to visit %s for %s. 
            Please provide comprehensive SIM card and connectivity information including:
            
            1. What are the best SIM card options for %s?
            2. How do local SIM cards compare to eSIM and international SIMs?
            3. What are the costs for different SIM options for %s?
            4. Which carriers have the best network coverage in %s?
            5. Where can I purchase SIM cards in %s?
            6. What documents do I need to get a local SIM?
            7. How long does activation take for each option?
            8. What are the data plans and pricing?
            9. Which option would you recommend for %s trip?
            10. What are the pros and cons of each option?
            11. Any country-specific regulations or requirements?
            12. How reliable is the network coverage in different areas?
            
            Please provide comprehensive, detailed information that would help an Indian traveler 
            get the best connectivity solution for %s.
            """, destination, duration, destination, duration, destination, destination, duration, destination);

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