package com.cthackathon.travelsim.dto;

import lombok.Data;
import java.util.List;

@Data
public class SimInformationResponse {
    
    private String aiRecommendations;
    private SimOptions simOptions;
    
    @Data
    public static class SimOptions {
        private String destination;
        private List<LocalCarrier> localCarriers;
        private List<InternationalSIM> internationalSIMs;
        private List<ESIM> eSIMs;
    }
    
    @Data
    public static class LocalCarrier {
        private String name;
        private String coverage;
        private List<String> dataPlans;
        private String price;
        private String networkQuality;
        private String customerSupport;
        private String activationTime;
    }
    
    @Data
    public static class InternationalSIM {
        private String name;
        private String coverage;
        private List<String> dataPlans;
        private String price;
        private String validity;
        private String activationProcess;
        private String customerSupport;
    }
    
    @Data
    public static class ESIM {
        private String name;
        private String coverage;
        private List<String> dataPlans;
        private String price;
        private String compatibility;
        private String activationTime;
        private String validity;
    }
} 