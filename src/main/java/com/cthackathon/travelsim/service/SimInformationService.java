package com.cthackathon.travelsim.service;

import com.cthackathon.travelsim.dto.SimInformationResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class SimInformationService {

    private final AzureOpenAIService azureOpenAIService;

    public SimInformationResponse getSimInformation(String destination, String duration) {
        try {
            log.info("Generating SIM information for destination: {}, duration: {}", destination, duration);
            
            // Generate AI recommendations
            String aiRecommendations = azureOpenAIService.generateSimRecommendations(destination, duration);
            
            // Generate mock SIM options data
            SimInformationResponse.SimOptions simOptions = generateMockSimOptions(destination);
            
            SimInformationResponse response = new SimInformationResponse();
            response.setAiRecommendations(aiRecommendations);
            response.setSimOptions(simOptions);
            
            log.info("Successfully generated SIM information for {}", destination);
            return response;
            
        } catch (Exception e) {
            log.error("Error generating SIM information for {} - {}: {}", destination, duration, e.getMessage(), e);
            throw new RuntimeException("Failed to generate SIM information", e);
        }
    }

    private SimInformationResponse.SimOptions generateMockSimOptions(String destination) {
        SimInformationResponse.SimOptions options = new SimInformationResponse.SimOptions();
        options.setDestination(destination);
        
        // Generate local carriers based on destination
        options.setLocalCarriers(generateLocalCarriers(destination));
        
        // Generate international SIM options
        options.setInternationalSIMs(generateInternationalSIMs());
        
        // Generate eSIM options
        options.setESIMs(generateESIMs());
        
        return options;
    }

    private List<SimInformationResponse.LocalCarrier> generateLocalCarriers(String destination) {
        if (destination.toLowerCase().contains("usa") || destination.toLowerCase().contains("united states")) {
            return Arrays.asList(
                createLocalCarrier("Verizon", "Nationwide", Arrays.asList("5GB - $30", "10GB - $40", "Unlimited - $60"), "$30-60", "Excellent", "24/7", "Immediate"),
                createLocalCarrier("AT&T", "Nationwide", Arrays.asList("4GB - $35", "8GB - $45", "Unlimited - $65"), "$35-65", "Very Good", "24/7", "Immediate"),
                createLocalCarrier("T-Mobile", "Nationwide", Arrays.asList("6GB - $25", "12GB - $35", "Unlimited - $50"), "$25-50", "Good", "24/7", "Immediate")
            );
        } else if (destination.toLowerCase().contains("uk") || destination.toLowerCase().contains("united kingdom")) {
            return Arrays.asList(
                createLocalCarrier("EE", "UK-wide", Arrays.asList("5GB - £15", "15GB - £20", "Unlimited - £30"), "£15-30", "Excellent", "24/7", "Immediate"),
                createLocalCarrier("Vodafone", "UK-wide", Arrays.asList("4GB - £12", "12GB - £18", "Unlimited - £25"), "£12-25", "Very Good", "24/7", "Immediate"),
                createLocalCarrier("O2", "UK-wide", Arrays.asList("6GB - £14", "16GB - £19", "Unlimited - £28"), "£14-28", "Good", "24/7", "Immediate")
            );
        } else if (destination.toLowerCase().contains("japan")) {
            return Arrays.asList(
                createLocalCarrier("NTT Docomo", "Japan-wide", Arrays.asList("3GB - ¥3,000", "7GB - ¥4,500", "20GB - ¥6,000"), "¥3,000-6,000", "Excellent", "24/7", "Immediate"),
                createLocalCarrier("SoftBank", "Japan-wide", Arrays.asList("3GB - ¥2,800", "7GB - ¥4,200", "20GB - ¥5,800"), "¥2,800-5,800", "Very Good", "24/7", "Immediate"),
                createLocalCarrier("KDDI (au)", "Japan-wide", Arrays.asList("3GB - ¥3,200", "7GB - ¥4,800", "20GB - ¥6,200"), "¥3,200-6,200", "Good", "24/7", "Immediate")
            );
        } else if (destination.toLowerCase().contains("australia")) {
            return Arrays.asList(
                createLocalCarrier("Telstra", "Australia-wide", Arrays.asList("5GB - A$30", "15GB - A$40", "Unlimited - A$60"), "A$30-60", "Excellent", "24/7", "Immediate"),
                createLocalCarrier("Optus", "Australia-wide", Arrays.asList("5GB - A$25", "15GB - A$35", "Unlimited - A$55"), "A$25-55", "Very Good", "24/7", "Immediate"),
                createLocalCarrier("Vodafone", "Australia-wide", Arrays.asList("5GB - A$20", "15GB - A$30", "Unlimited - A$50"), "A$20-50", "Good", "24/7", "Immediate")
            );
        } else {
            // Generic options for other destinations
            return Arrays.asList(
                createLocalCarrier("Local Carrier 1", "City-wide", Arrays.asList("2GB - $20", "5GB - $30", "10GB - $40"), "$20-40", "Good", "Business hours", "24 hours"),
                createLocalCarrier("Local Carrier 2", "City-wide", Arrays.asList("3GB - $25", "7GB - $35", "15GB - $45"), "$25-45", "Fair", "Business hours", "24 hours")
            );
        }
    }

    private SimInformationResponse.LocalCarrier createLocalCarrier(String name, String coverage, List<String> dataPlans, 
                                                                 String price, String networkQuality, String customerSupport, String activationTime) {
        SimInformationResponse.LocalCarrier carrier = new SimInformationResponse.LocalCarrier();
        carrier.setName(name);
        carrier.setCoverage(coverage);
        carrier.setDataPlans(dataPlans);
        carrier.setPrice(price);
        carrier.setNetworkQuality(networkQuality);
        carrier.setCustomerSupport(customerSupport);
        carrier.setActivationTime(activationTime);
        return carrier;
    }

    private List<SimInformationResponse.InternationalSIM> generateInternationalSIMs() {
        return Arrays.asList(
            createInternationalSIM("Airalo", "Global", Arrays.asList("1GB - $4.50", "3GB - $11", "5GB - $16"), "$4.50-16", "7-30 days", "Instant", "Email"),
            createInternationalSIM("Truphone", "Global", Arrays.asList("1GB - $5", "3GB - $12", "5GB - $18"), "$5-18", "7-30 days", "Instant", "24/7"),
            createInternationalSIM("GigSky", "Global", Arrays.asList("1GB - $6", "3GB - $15", "5GB - $22"), "$6-22", "7-30 days", "Instant", "Email"),
            createInternationalSIM("Ubigi", "Global", Arrays.asList("1GB - $4", "3GB - $10", "5GB - $15"), "$4-15", "7-30 days", "Instant", "Email")
        );
    }

    private SimInformationResponse.InternationalSIM createInternationalSIM(String name, String coverage, List<String> dataPlans, 
                                                                         String price, String validity, String activationProcess, String customerSupport) {
        SimInformationResponse.InternationalSIM sim = new SimInformationResponse.InternationalSIM();
        sim.setName(name);
        sim.setCoverage(coverage);
        sim.setDataPlans(dataPlans);
        sim.setPrice(price);
        sim.setValidity(validity);
        sim.setActivationProcess(activationProcess);
        sim.setCustomerSupport(customerSupport);
        return sim;
    }

    private List<SimInformationResponse.ESIM> generateESIMs() {
        return Arrays.asList(
            createESIM("Airalo eSIM", "Global", Arrays.asList("1GB - $4.50", "3GB - $11", "5GB - $16"), "$4.50-16", "iPhone/Android", "Instant", "7-30 days"),
            createESIM("Truphone eSIM", "Global", Arrays.asList("1GB - $5", "3GB - $12", "5GB - $18"), "$5-18", "iPhone/Android", "Instant", "7-30 days"),
            createESIM("GigSky eSIM", "Global", Arrays.asList("1GB - $6", "3GB - $15", "5GB - $22"), "$6-22", "iPhone/Android", "Instant", "7-30 days"),
            createESIM("Ubigi eSIM", "Global", Arrays.asList("1GB - $4", "3GB - $10", "5GB - $15"), "$4-15", "iPhone/Android", "Instant", "7-30 days")
        );
    }

    private SimInformationResponse.ESIM createESIM(String name, String coverage, List<String> dataPlans, 
                                                  String price, String compatibility, String activationTime, String validity) {
        SimInformationResponse.ESIM esim = new SimInformationResponse.ESIM();
        esim.setName(name);
        esim.setCoverage(coverage);
        esim.setDataPlans(dataPlans);
        esim.setPrice(price);
        esim.setCompatibility(compatibility);
        esim.setActivationTime(activationTime);
        esim.setValidity(validity);
        return esim;
    }
} 