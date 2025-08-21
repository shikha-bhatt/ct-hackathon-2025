package com.ct.hackathon.model;

import java.util.List;

public class ForexExchangeResponse {
    
    private String destination;
    private String destinationCurrency;
    private Double sourceAmount;
    private String sourceCurrency;
    private Double exchangeRate;
    private Double convertedAmount;
    private String lastUpdated;
    private String aiRecommendations;
    private ExchangeInfo exchangeInfo;
    private List<ExchangeWebsite> exchangeWebsites;
    private List<ExchangeTip> exchangeTips;

    public ForexExchangeResponse() {}

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private ForexExchangeResponse response = new ForexExchangeResponse();

        public Builder destination(String destination) {
            response.destination = destination;
            return this;
        }

        public Builder destinationCurrency(String destinationCurrency) {
            response.destinationCurrency = destinationCurrency;
            return this;
        }

        public Builder sourceAmount(Double sourceAmount) {
            response.sourceAmount = sourceAmount;
            return this;
        }

        public Builder sourceCurrency(String sourceCurrency) {
            response.sourceCurrency = sourceCurrency;
            return this;
        }

        public Builder exchangeRate(Double exchangeRate) {
            response.exchangeRate = exchangeRate;
            return this;
        }

        public Builder convertedAmount(Double convertedAmount) {
            response.convertedAmount = convertedAmount;
            return this;
        }

        public Builder lastUpdated(String lastUpdated) {
            response.lastUpdated = lastUpdated;
            return this;
        }

        public Builder aiRecommendations(String aiRecommendations) {
            response.aiRecommendations = aiRecommendations;
            return this;
        }

        public Builder exchangeInfo(ExchangeInfo exchangeInfo) {
            response.exchangeInfo = exchangeInfo;
            return this;
        }

        public Builder exchangeWebsites(List<ExchangeWebsite> exchangeWebsites) {
            response.exchangeWebsites = exchangeWebsites;
            return this;
        }

        public Builder exchangeTips(List<ExchangeTip> exchangeTips) {
            response.exchangeTips = exchangeTips;
            return this;
        }

        public ForexExchangeResponse build() {
            return response;
        }
    }

    // Getters and Setters
    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getDestinationCurrency() {
        return destinationCurrency;
    }

    public void setDestinationCurrency(String destinationCurrency) {
        this.destinationCurrency = destinationCurrency;
    }

    public Double getSourceAmount() {
        return sourceAmount;
    }

    public void setSourceAmount(Double sourceAmount) {
        this.sourceAmount = sourceAmount;
    }

    public String getSourceCurrency() {
        return sourceCurrency;
    }

    public void setSourceCurrency(String sourceCurrency) {
        this.sourceCurrency = sourceCurrency;
    }

    public Double getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(Double exchangeRate) {
        this.exchangeRate = exchangeRate;
    }

    public Double getConvertedAmount() {
        return convertedAmount;
    }

    public void setConvertedAmount(Double convertedAmount) {
        this.convertedAmount = convertedAmount;
    }

    public String getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(String lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public String getAiRecommendations() {
        return aiRecommendations;
    }

    public void setAiRecommendations(String aiRecommendations) {
        this.aiRecommendations = aiRecommendations;
    }

    public ExchangeInfo getExchangeInfo() {
        return exchangeInfo;
    }

    public void setExchangeInfo(ExchangeInfo exchangeInfo) {
        this.exchangeInfo = exchangeInfo;
    }

    public List<ExchangeWebsite> getExchangeWebsites() {
        return exchangeWebsites;
    }

    public void setExchangeWebsites(List<ExchangeWebsite> exchangeWebsites) {
        this.exchangeWebsites = exchangeWebsites;
    }

    public List<ExchangeTip> getExchangeTips() {
        return exchangeTips;
    }

    public void setExchangeTips(List<ExchangeTip> exchangeTips) {
        this.exchangeTips = exchangeTips;
    }

    // Inner classes for structured data
    public static class ExchangeInfo {
        private String bestTimeToExchange;
        private String exchangeMethod;
        private String documentationRequired;
        private String restrictions;
        private String bestPractices;

        public ExchangeInfo() {}

        public static Builder builder() {
            return new Builder();
        }

        public static class Builder {
            private ExchangeInfo info = new ExchangeInfo();

            public Builder bestTimeToExchange(String bestTimeToExchange) {
                info.bestTimeToExchange = bestTimeToExchange;
                return this;
            }

            public Builder exchangeMethod(String exchangeMethod) {
                info.exchangeMethod = exchangeMethod;
                return this;
            }

            public Builder documentationRequired(String documentationRequired) {
                info.documentationRequired = documentationRequired;
                return this;
            }

            public Builder restrictions(String restrictions) {
                info.restrictions = restrictions;
                return this;
            }

            public Builder bestPractices(String bestPractices) {
                info.bestPractices = bestPractices;
                return this;
            }

            public ExchangeInfo build() {
                return info;
            }
        }

        // Getters and Setters
        public String getBestTimeToExchange() {
            return bestTimeToExchange;
        }

        public void setBestTimeToExchange(String bestTimeToExchange) {
            this.bestTimeToExchange = bestTimeToExchange;
        }

        public String getExchangeMethod() {
            return exchangeMethod;
        }

        public void setExchangeMethod(String exchangeMethod) {
            this.exchangeMethod = exchangeMethod;
        }

        public String getDocumentationRequired() {
            return documentationRequired;
        }

        public void setDocumentationRequired(String documentationRequired) {
            this.documentationRequired = documentationRequired;
        }

        public String getRestrictions() {
            return restrictions;
        }

        public void setRestrictions(String restrictions) {
            this.restrictions = restrictions;
        }

        public String getBestPractices() {
            return bestPractices;
        }

        public void setBestPractices(String bestPractices) {
            this.bestPractices = bestPractices;
        }
    }

    public static class ExchangeWebsite {
        private String name;
        private String url;
        private String description;
        private String rating;
        private String pros;
        private String cons;
        private String exchangeRate;
        private String fees;

        public ExchangeWebsite() {}

        public static Builder builder() {
            return new Builder();
        }

        public static class Builder {
            private ExchangeWebsite website = new ExchangeWebsite();

            public Builder name(String name) {
                website.name = name;
                return this;
            }

            public Builder url(String url) {
                website.url = url;
                return this;
            }

            public Builder description(String description) {
                website.description = description;
                return this;
            }

            public Builder rating(String rating) {
                website.rating = rating;
                return this;
            }

            public Builder pros(String pros) {
                website.pros = pros;
                return this;
            }

            public Builder cons(String cons) {
                website.cons = cons;
                return this;
            }

            public Builder exchangeRate(String exchangeRate) {
                website.exchangeRate = exchangeRate;
                return this;
            }

            public Builder fees(String fees) {
                website.fees = fees;
                return this;
            }

            public ExchangeWebsite build() {
                return website;
            }
        }

        // Getters and Setters
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getRating() {
            return rating;
        }

        public void setRating(String rating) {
            this.rating = rating;
        }

        public String getPros() {
            return pros;
        }

        public void setPros(String pros) {
            this.pros = pros;
        }

        public String getCons() {
            return cons;
        }

        public void setCons(String cons) {
            this.cons = cons;
        }

        public String getExchangeRate() {
            return exchangeRate;
        }

        public void setExchangeRate(String exchangeRate) {
            this.exchangeRate = exchangeRate;
        }

        public String getFees() {
            return fees;
        }

        public void setFees(String fees) {
            this.fees = fees;
        }
    }

    public static class ExchangeTip {
        private String title;
        private String description;
        private String category;

        public ExchangeTip() {}

        public static Builder builder() {
            return new Builder();
        }

        public static class Builder {
            private ExchangeTip tip = new ExchangeTip();

            public Builder title(String title) {
                tip.title = title;
                return this;
            }

            public Builder description(String description) {
                tip.description = description;
                return this;
            }

            public Builder category(String category) {
                tip.category = category;
                return this;
            }

            public ExchangeTip build() {
                return tip;
            }
        }

        // Getters and Setters
        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getCategory() {
            return category;
        }

        public void setCategory(String category) {
            this.category = category;
        }
    }
} 