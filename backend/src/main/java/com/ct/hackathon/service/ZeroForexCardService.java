package com.ct.hackathon.service;

import com.ct.hackathon.model.ZeroForexCardResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;

@Service
public class ZeroForexCardService {

    private static final Logger log = LoggerFactory.getLogger(ZeroForexCardService.class);
    
    private final AzureOpenAIService azureOpenAIService;

    public ZeroForexCardService(AzureOpenAIService azureOpenAIService) {
        this.azureOpenAIService = azureOpenAIService;
    }

    public Mono<ZeroForexCardResponse> getZeroForexCards(String destination) {
        return azureOpenAIService.getZeroForexCardRecommendations(destination)
                .map(aiRecommendations -> {
                    // Create structured card data based on destination
                    List<ZeroForexCardResponse.Card> cards = getCardsForDestination(destination);
                    
                    return ZeroForexCardResponse.builder()
                            .destination(destination)
                            .aiRecommendations(aiRecommendations)
                            .cards(ZeroForexCardResponse.CardData.builder()
                                    .cards(cards)
                                    .build())
                            .build();
                })
                .doOnError(error -> log.error("Error getting zero forex cards for {}: {}", destination, error.getMessage()))
                .doOnSuccess(result -> log.info("Successfully retrieved zero forex cards for {}", destination));
    }

    private List<ZeroForexCardResponse.Card> getCardsForDestination(String destination) {
        // This would typically come from a database or external API
        // For now, we'll provide sample data based on common destinations
        String destinationLower = destination.toLowerCase();
        
        if (destinationLower.contains("usa") || destinationLower.contains("united states")) {
            return getUSACards();
        } else if (destinationLower.contains("uk") || destinationLower.contains("united kingdom")) {
            return getUKCards();
        } else if (destinationLower.contains("europe") || destinationLower.contains("eu")) {
            return getEuropeCards();
        } else if (destinationLower.contains("singapore")) {
            return getSingaporeCards();
        } else if (destinationLower.contains("australia")) {
            return getAustraliaCards();
        } else {
            return getGenericCards();
        }
    }

    private List<ZeroForexCardResponse.Card> getUSACards() {
        return Arrays.asList(
                ZeroForexCardResponse.Card.builder()
                        .name("HDFC Regalia Credit Card")
                        .bank("HDFC Bank")
                        .annualFee("₹2,500 + GST")
                        .forexMarkup("0%")
                        .acceptance("Excellent")
                        .applicationProcess("Online/Offline")
                        .features(Arrays.asList("Zero forex markup", "Airport lounge access", "Travel insurance", "Reward points"))
                        .bestFor("Frequent travelers to USA")
                        .pros("No forex charges, good rewards, lounge access")
                        .cons("High annual fee, income requirement")
                        .applicationLink("https://www.hdfcbank.com/personal/pay/cards/credit-cards/regalia")
                        .comparison("Best value for frequent travelers")
                        .recommendation("Highly recommended for business travelers")
                        .build(),
                ZeroForexCardResponse.Card.builder()
                        .name("Axis Bank Flipkart Axis Bank Credit Card")
                        .bank("Axis Bank")
                        .annualFee("₹500 + GST")
                        .forexMarkup("0%")
                        .acceptance("Good")
                        .applicationProcess("Online")
                        .features(Arrays.asList("Zero forex markup", "Flipkart rewards", "No joining fee", "Welcome benefits"))
                        .bestFor("Budget-conscious travelers")
                        .pros("Low annual fee, good rewards on Flipkart")
                        .cons("Limited lounge access, basic features")
                        .applicationLink("https://www.axisbank.com/retail/cards/credit-card/flipkart-axis-bank-credit-card")
                        .comparison("Best budget option")
                        .recommendation("Good for occasional travelers")
                        .build(),
                ZeroForexCardResponse.Card.builder()
                        .name("ICICI Bank Sapphiro Credit Card")
                        .bank("ICICI Bank")
                        .annualFee("₹3,000 + GST")
                        .forexMarkup("0%")
                        .acceptance("Excellent")
                        .applicationProcess("Online/Offline")
                        .features(Arrays.asList("Zero forex markup", "Premium lounge access", "Golf privileges", "Concierge services"))
                        .bestFor("Premium travelers")
                        .pros("Premium features, excellent acceptance")
                        .cons("High annual fee, high income requirement")
                        .applicationLink("https://www.icicibank.com/cards/credit-cards/sapphiro-credit-card")
                        .comparison("Premium option with luxury benefits")
                        .recommendation("Best for luxury travelers")
                        .build()
        );
    }

    private List<ZeroForexCardResponse.Card> getUKCards() {
        return Arrays.asList(
                ZeroForexCardResponse.Card.builder()
                        .name("SBI SimplyCLICK Credit Card")
                        .bank("State Bank of India")
                        .annualFee("₹999 + GST")
                        .forexMarkup("0%")
                        .acceptance("Good")
                        .applicationProcess("Online/Offline")
                        .features(Arrays.asList("Zero forex markup", "Online shopping rewards", "Fuel surcharge waiver", "Welcome benefits"))
                        .bestFor("Online shoppers and travelers")
                        .pros("Good online rewards, reasonable fee")
                        .cons("Limited lounge access")
                        .applicationLink("https://www.sbicard.com/en/personal/credit-cards/rewards/simplyclick.page")
                        .comparison("Good balance of features and cost")
                        .recommendation("Recommended for online shoppers")
                        .build(),
                ZeroForexCardResponse.Card.builder()
                        .name("Kotak Mahindra Bank Urbane Credit Card")
                        .bank("Kotak Mahindra Bank")
                        .annualFee("₹1,500 + GST")
                        .forexMarkup("0%")
                        .acceptance("Good")
                        .applicationProcess("Online")
                        .features(Arrays.asList("Zero forex markup", "Dining rewards", "Movie ticket discounts", "Fuel surcharge waiver"))
                        .bestFor("Food lovers and travelers")
                        .pros("Good dining rewards, reasonable fee")
                        .cons("Limited travel benefits")
                        .applicationLink("https://www.kotak.com/en/personal-banking/cards/credit-cards/urbane-credit-card.html")
                        .comparison("Best for dining and entertainment")
                        .recommendation("Good for food enthusiasts")
                        .build()
        );
    }

    private List<ZeroForexCardResponse.Card> getEuropeCards() {
        return Arrays.asList(
                ZeroForexCardResponse.Card.builder()
                        .name("Yes Bank YES First Exclusive Credit Card")
                        .bank("Yes Bank")
                        .annualFee("₹4,999 + GST")
                        .forexMarkup("0%")
                        .acceptance("Excellent")
                        .applicationProcess("Online/Offline")
                        .features(Arrays.asList("Zero forex markup", "Unlimited lounge access", "Golf privileges", "Concierge services"))
                        .bestFor("Premium European travelers")
                        .pros("Unlimited lounge access, premium features")
                        .cons("Very high annual fee")
                        .applicationLink("https://www.yesbank.in/personal-banking/yes-first/credit-cards/yes-first-exclusive")
                        .comparison("Premium option for frequent travelers")
                        .recommendation("Best for luxury European travel")
                        .build(),
                ZeroForexCardResponse.Card.builder()
                        .name("RBL Bank ShopRite Credit Card")
                        .bank("RBL Bank")
                        .annualFee("₹500 + GST")
                        .forexMarkup("0%")
                        .acceptance("Good")
                        .applicationProcess("Online")
                        .features(Arrays.asList("Zero forex markup", "Shopping rewards", "No joining fee", "Welcome benefits"))
                        .bestFor("Budget European travelers")
                        .pros("Low fee, good shopping rewards")
                        .cons("Basic features, limited lounge access")
                        .applicationLink("https://www.rblbank.com/credit-cards/shoprite-credit-card")
                        .comparison("Best budget option for Europe")
                        .recommendation("Good for budget-conscious travelers")
                        .build()
        );
    }

    private List<ZeroForexCardResponse.Card> getSingaporeCards() {
        return Arrays.asList(
                ZeroForexCardResponse.Card.builder()
                        .name("Citi PremierMiles Credit Card")
                        .bank("Citibank")
                        .annualFee("₹3,000 + GST")
                        .forexMarkup("0%")
                        .acceptance("Excellent")
                        .applicationProcess("Online/Offline")
                        .features(Arrays.asList("Zero forex markup", "Air miles rewards", "Lounge access", "Travel insurance"))
                        .bestFor("Frequent flyers to Singapore")
                        .pros("Air miles, good travel benefits")
                        .cons("High annual fee")
                        .applicationLink("https://www.online.citibank.co.in/credit-card/citi-premiermiles")
                        .comparison("Best for air miles collectors")
                        .recommendation("Recommended for frequent flyers")
                        .build()
        );
    }

    private List<ZeroForexCardResponse.Card> getAustraliaCards() {
        return Arrays.asList(
                ZeroForexCardResponse.Card.builder()
                        .name("IndusInd Bank Nexxt Credit Card")
                        .bank("IndusInd Bank")
                        .annualFee("₹2,000 + GST")
                        .forexMarkup("0%")
                        .acceptance("Good")
                        .applicationProcess("Online/Offline")
                        .features(Arrays.asList("Zero forex markup", "Fuel surcharge waiver", "Reward points", "Welcome benefits"))
                        .bestFor("General travelers to Australia")
                        .pros("Reasonable fee, good rewards")
                        .cons("Limited premium features")
                        .applicationLink("https://www.indusind.com/in/en/personal/cards/credit-cards/nexxt-credit-card.html")
                        .comparison("Good value for money")
                        .recommendation("Recommended for general travel")
                        .build()
        );
    }

    private List<ZeroForexCardResponse.Card> getGenericCards() {
        return Arrays.asList(
                ZeroForexCardResponse.Card.builder()
                        .name("Standard Chartered Rewards+ Credit Card")
                        .bank("Standard Chartered")
                        .annualFee("₹1,500 + GST")
                        .forexMarkup("0%")
                        .acceptance("Good")
                        .applicationProcess("Online/Offline")
                        .features(Arrays.asList("Zero forex markup", "Reward points", "Fuel surcharge waiver", "Welcome benefits"))
                        .bestFor("General international travel")
                        .pros("Reasonable fee, good acceptance")
                        .cons("Basic features")
                        .applicationLink("https://www.sc.com/in/credit-cards/rewards-plus-credit-card/")
                        .comparison("Good all-round option")
                        .recommendation("Recommended for general use")
                        .build(),
                ZeroForexCardResponse.Card.builder()
                        .name("HSBC Visa Signature Credit Card")
                        .bank("HSBC")
                        .annualFee("₹2,500 + GST")
                        .forexMarkup("0%")
                        .acceptance("Excellent")
                        .applicationProcess("Online/Offline")
                        .features(Arrays.asList("Zero forex markup", "Lounge access", "Travel insurance", "Concierge services"))
                        .bestFor("International travelers")
                        .pros("Excellent acceptance, good travel benefits")
                        .cons("Higher annual fee")
                        .applicationLink("https://www.hsbc.co.in/credit-cards/products/visa-signature/")
                        .comparison("Premium option with good features")
                        .recommendation("Good for frequent international travel")
                        .build()
        );
    }
} 