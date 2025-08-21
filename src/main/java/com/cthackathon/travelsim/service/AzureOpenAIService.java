package com.cthackathon.travelsim.service;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.OpenAIClientBuilder;
import com.azure.ai.openai.models.ChatCompletions;
import com.azure.ai.openai.models.ChatCompletionsOptions;
import com.azure.ai.openai.models.ChatRequestMessage;
import com.azure.ai.openai.models.ChatRequestSystemMessage;
import com.azure.ai.openai.models.ChatRequestUserMessage;
import com.azure.core.credential.AzureKeyCredential;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class AzureOpenAIService {

    private final OpenAIClient client;
    private final String deploymentName;

    public AzureOpenAIService(
            @Value("${azure.openai.endpoint}") String endpoint,
            @Value("${azure.openai.api-key}") String apiKey,
            @Value("${azure.openai.deployment}") String deploymentName) {
        
        this.deploymentName = deploymentName;
        
        this.client = new OpenAIClientBuilder()
                .endpoint(endpoint)
                .credential(new AzureKeyCredential(apiKey))
                .buildClient();
        
        log.info("Azure OpenAI client initialized with endpoint: {}", endpoint);
    }

    public String generateSimRecommendations(String destination, String duration) {
        try {
            String systemPrompt = "You are an expert travel consultant specializing in mobile connectivity solutions. " +
                    "Provide comprehensive, accurate, and practical advice about SIM cards, eSIMs, and mobile connectivity " +
                    "for international travelers. Focus on cost-effectiveness, network coverage, and ease of use.";

            String userPrompt = String.format(
                "I need detailed information about mobile connectivity options for traveling to %s for %s. " +
                "Please provide comprehensive recommendations including:\n\n" +
                "1. **Local SIM Card Options** - Best local carriers, coverage areas, data plans, prices, activation process\n" +
                "2. **International SIM Cards** - Global SIM providers, coverage, plans, costs, activation\n" +
                "3. **eSIM Options** - Available eSIM providers, compatibility, activation process, costs\n" +
                "4. **Cost Comparison** - Price analysis of different options\n" +
                "5. **Network Coverage** - Quality and reliability of different networks\n" +
                "6. **Best Recommendations** - Top 3 options ranked by value for money\n" +
                "7. **Tips & Warnings** - Important considerations, activation time, customer support\n\n" +
                "Make your response detailed, practical, and actionable for travelers. " +
                "Include specific carrier names, approximate prices, and step-by-step activation processes.",
                destination, duration
            );

            List<ChatRequestMessage> messages = List.of(
                new ChatRequestSystemMessage(systemPrompt),
                new ChatRequestUserMessage(userPrompt)
            );

            ChatCompletionsOptions options = new ChatCompletionsOptions(messages)
                    .setMaxTokens(2000)
                    .setTemperature(0.7)
                    .setTopP(1.0);

            ChatCompletions response = client.getChatCompletions(deploymentName, options);
            
            if (response.getChoices() != null && !response.getChoices().isEmpty()) {
                String content = response.getChoices().get(0).getMessage().getContent();
                log.info("Generated SIM recommendations for {} - {}: {} characters", destination, duration, content.length());
                return content;
            } else {
                log.warn("No response generated from Azure OpenAI");
                return "Unable to generate recommendations at this time. Please try again later.";
            }

        } catch (Exception e) {
            log.error("Error generating SIM recommendations for {} - {}: {}", destination, duration, e.getMessage(), e);
            return "Sorry, I encountered an error while generating recommendations. Please try again later.";
        }
    }
} 