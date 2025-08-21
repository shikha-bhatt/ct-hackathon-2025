package com.ct.hackathon.service;

import com.ct.hackathon.model.ForexExchangeResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;

@Service
public class ForexExchangeService {

    private static final Logger log = LoggerFactory.getLogger(ForexExchangeService.class);
    
    private final AzureOpenAIService azureOpenAIService;

    public ForexExchangeService(AzureOpenAIService azureOpenAIService) {
        this.azureOpenAIService = azureOpenAIService;
    }

    public Mono<ForexExchangeResponse> getForexExchangeInfo(String destination, Double amount, String sourceCurrency) {
        return azureOpenAIService.getForexExchangeRecommendations(destination, amount, sourceCurrency)
                .map(aiRecommendations -> {
                    // Get destination currency based on destination
                    String destinationCurrency = getDestinationCurrency(destination);
                    
                    // Calculate approximate exchange rate (this would typically come from a real API)
                    Double exchangeRate = getApproximateExchangeRate(sourceCurrency, destinationCurrency);
                    Double convertedAmount = amount * exchangeRate;
                    
                    // Create structured response
                    return ForexExchangeResponse.builder()
                            .destination(destination)
                            .destinationCurrency(destinationCurrency)
                            .sourceAmount(amount)
                            .sourceCurrency(sourceCurrency)
                            .exchangeRate(exchangeRate)
                            .convertedAmount(convertedAmount)
                            .lastUpdated(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                            .aiRecommendations(aiRecommendations)
                            .exchangeInfo(getExchangeInfo(destination))
                            .exchangeWebsites(getExchangeWebsites(destination))
                            .exchangeTips(getExchangeTips(destination))
                            .build();
                })
                .doOnError(error -> log.error("Error getting forex exchange info for {}: {}", destination, error.getMessage()))
                .doOnSuccess(result -> log.info("Successfully retrieved forex exchange info for {}", destination));
    }

    private String getDestinationCurrency(String destination) {
        String destinationLower = destination.toLowerCase();
        
        if (destinationLower.contains("usa") || destinationLower.contains("united states")) {
            return "USD";
        } else if (destinationLower.contains("uk") || destinationLower.contains("united kingdom")) {
            return "GBP";
        } else if (destinationLower.contains("europe") || destinationLower.contains("eu") || 
                   destinationLower.contains("france") || destinationLower.contains("germany") ||
                   destinationLower.contains("italy") || destinationLower.contains("spain")) {
            return "EUR";
        } else if (destinationLower.contains("singapore")) {
            return "SGD";
        } else if (destinationLower.contains("australia")) {
            return "AUD";
        } else if (destinationLower.contains("japan")) {
            return "JPY";
        } else if (destinationLower.contains("canada")) {
            return "CAD";
        } else if (destinationLower.contains("switzerland")) {
            return "CHF";
        } else if (destinationLower.contains("uae") || destinationLower.contains("dubai")) {
            return "AED";
        } else if (destinationLower.contains("thailand")) {
            return "THB";
        } else if (destinationLower.contains("malaysia")) {
            return "MYR";
        } else if (destinationLower.contains("indonesia")) {
            return "IDR";
        } else if (destinationLower.contains("philippines")) {
            return "PHP";
        } else if (destinationLower.contains("vietnam")) {
            return "VND";
        } else if (destinationLower.contains("south korea")) {
            return "KRW";
        } else if (destinationLower.contains("china")) {
            return "CNY";
        } else if (destinationLower.contains("hong kong")) {
            return "HKD";
        } else if (destinationLower.contains("new zealand")) {
            return "NZD";
        } else {
            return "USD"; // Default fallback
        }
    }

    private Double getApproximateExchangeRate(String sourceCurrency, String destinationCurrency) {
        // This is a simplified approximation. In a real application, you would use a forex API
        if ("INR".equals(sourceCurrency)) {
            switch (destinationCurrency) {
                case "USD": return 0.012; // 1 INR = 0.012 USD
                case "EUR": return 0.011; // 1 INR = 0.011 EUR
                case "GBP": return 0.0095; // 1 INR = 0.0095 GBP
                case "SGD": return 0.016; // 1 INR = 0.016 SGD
                case "AUD": return 0.018; // 1 INR = 0.018 AUD
                case "JPY": return 1.8; // 1 INR = 1.8 JPY
                case "CAD": return 0.016; // 1 INR = 0.016 CAD
                case "CHF": return 0.011; // 1 INR = 0.011 CHF
                case "AED": return 0.044; // 1 INR = 0.044 AED
                case "THB": return 0.43; // 1 INR = 0.43 THB
                case "MYR": return 0.057; // 1 INR = 0.057 MYR
                case "IDR": return 190.0; // 1 INR = 190 IDR
                case "PHP": return 0.67; // 1 INR = 0.67 PHP
                case "VND": return 290.0; // 1 INR = 290 VND
                case "KRW": return 16.0; // 1 INR = 16 KRW
                case "CNY": return 0.087; // 1 INR = 0.087 CNY
                case "HKD": return 0.094; // 1 INR = 0.094 HKD
                case "NZD": return 0.020; // 1 INR = 0.020 NZD
                default: return 0.012; // Default to USD rate
            }
        }
        return 1.0; // Default fallback
    }

    private ForexExchangeResponse.ExchangeInfo getExchangeInfo(String destination) {
        return ForexExchangeResponse.ExchangeInfo.builder()
                .bestTimeToExchange("Weekdays during business hours for better rates")
                .exchangeMethod("Online forex services, banks, or authorized exchange centers")
                .documentationRequired("Valid passport, visa, and PAN card for large amounts")
                .restrictions("RBI regulations apply for amounts above ₹25,000")
                .bestPractices("Compare rates from multiple sources, avoid airport exchanges")
                .build();
    }

    private List<ForexExchangeResponse.ExchangeWebsite> getExchangeWebsites(String destination) {
        return Arrays.asList(
                ForexExchangeResponse.ExchangeWebsite.builder()
                        .name("BookMyForex")
                        .url("https://www.bookmyforex.com")
                        .description("Leading online forex platform with competitive rates")
                        .rating("4.5/5")
                        .pros("Competitive rates, home delivery, multiple currencies")
                        .cons("Minimum order amount, delivery time")
                        .exchangeRate("Best rates guaranteed")
                        .fees("Low transaction fees")
                        .build(),
                ForexExchangeResponse.ExchangeWebsite.builder()
                        .name("Thomas Cook")
                        .url("https://www.thomascook.in/forex")
                        .description("Trusted travel company with forex services")
                        .rating("4.3/5")
                        .pros("Reliable, multiple locations, travel cards")
                        .cons("Slightly higher rates, limited online options")
                        .exchangeRate("Competitive rates")
                        .fees("Standard fees")
                        .build(),
                ForexExchangeResponse.ExchangeWebsite.builder()
                        .name("SBI Forex")
                        .url("https://www.sbicard.com/forex")
                        .description("State Bank of India's forex services")
                        .rating("4.2/5")
                        .pros("Government bank, reliable, multiple currencies")
                        .cons("Limited online features, branch visits required")
                        .exchangeRate("Official bank rates")
                        .fees("Bank charges apply")
                        .build(),
                ForexExchangeResponse.ExchangeWebsite.builder()
                        .name("HDFC Bank Forex")
                        .url("https://www.hdfcbank.com/personal/pay/cards/forex-cards")
                        .description("HDFC Bank's forex card and currency services")
                        .rating("4.4/5")
                        .pros("Forex cards, online booking, good rates")
                        .cons("Limited to HDFC customers")
                        .exchangeRate("Competitive rates")
                        .fees("Card issuance fees")
                        .build(),
                ForexExchangeResponse.ExchangeWebsite.builder()
                        .name("ICICI Bank Forex")
                        .url("https://www.icicibank.com/forex")
                        .description("ICICI Bank's comprehensive forex solutions")
                        .rating("4.3/5")
                        .pros("Multiple products, online services, good rates")
                        .cons("Limited to ICICI customers")
                        .exchangeRate("Competitive rates")
                        .fees("Standard bank fees")
                        .build()
        );
    }

    private List<ForexExchangeResponse.ExchangeTip> getExchangeTips(String destination) {
        return Arrays.asList(
                ForexExchangeResponse.ExchangeTip.builder()
                        .title("Compare Rates Before Exchanging")
                        .description("Always compare rates from multiple sources including banks, online platforms, and exchange centers to get the best deal.")
                        .category("Rate Comparison")
                        .build(),
                ForexExchangeResponse.ExchangeTip.builder()
                        .title("Avoid Airport Exchanges")
                        .description("Airport exchange centers typically offer the worst rates. Exchange currency before reaching the airport or use ATMs at your destination.")
                        .category("Location")
                        .build(),
                ForexExchangeResponse.ExchangeTip.builder()
                        .title("Use Forex Cards for Large Amounts")
                        .description("For amounts above ₹25,000, consider using forex cards which offer better rates and security compared to cash.")
                        .category("Payment Method")
                        .build(),
                ForexExchangeResponse.ExchangeTip.builder()
                        .title("Keep Exchange Receipts")
                        .description("Always keep exchange receipts as they may be required for re-conversion or tax purposes.")
                        .category("Documentation")
                        .build(),
                ForexExchangeResponse.ExchangeTip.builder()
                        .title("Monitor Exchange Rates")
                        .description("Exchange rates fluctuate daily. Monitor rates for a few days before exchanging to get the best timing.")
                        .category("Timing")
                        .build(),
                ForexExchangeResponse.ExchangeTip.builder()
                        .title("Consider Online Platforms")
                        .description("Online forex platforms often offer better rates and convenience compared to traditional banks.")
                        .category("Platform")
                        .build(),
                ForexExchangeResponse.ExchangeTip.builder()
                        .title("Check for Hidden Fees")
                        .description("Always check for hidden fees, commissions, and charges before finalizing any forex transaction.")
                        .category("Fees")
                        .build(),
                ForexExchangeResponse.ExchangeTip.builder()
                        .title("Use Authorized Centers Only")
                        .description("Only use RBI-authorized forex dealers and exchange centers to avoid legal issues and ensure fair rates.")
                        .category("Security")
                        .build()
        );
    }
} 