package com.ct.hackathon.model;

import java.util.List;

public class ZeroForexCardResponse {
    private String destination;
    private String aiRecommendations;
    private CardData cards;
    
    public ZeroForexCardResponse() {}

    public ZeroForexCardResponse(String destination, String aiRecommendations, CardData cards) {
        this.destination = destination;
        this.aiRecommendations = aiRecommendations;
        this.cards = cards;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getAiRecommendations() {
        return aiRecommendations;
    }

    public void setAiRecommendations(String aiRecommendations) {
        this.aiRecommendations = aiRecommendations;
    }

    public CardData getCards() {
        return cards;
    }

    public void setCards(CardData cards) {
        this.cards = cards;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String destination;
        private String aiRecommendations;
        private CardData cards;

        public Builder destination(String destination) {
            this.destination = destination;
            return this;
        }

        public Builder aiRecommendations(String aiRecommendations) {
            this.aiRecommendations = aiRecommendations;
            return this;
        }

        public Builder cards(CardData cards) {
            this.cards = cards;
            return this;
        }

        public ZeroForexCardResponse build() {
            return new ZeroForexCardResponse(destination, aiRecommendations, cards);
        }
    }
    
    public static class CardData {
        private List<Card> cards;

        public CardData() {}

        public CardData(List<Card> cards) {
            this.cards = cards;
        }

        public List<Card> getCards() {
            return cards;
        }

        public void setCards(List<Card> cards) {
            this.cards = cards;
        }

        public static Builder builder() {
            return new Builder();
        }

        public static class Builder {
            private List<Card> cards;

            public Builder cards(List<Card> cards) {
                this.cards = cards;
                return this;
            }

            public CardData build() {
                return new CardData(cards);
            }
        }
    }
    
    public static class Card {
        private String name;
        private String bank;
        private String annualFee;
        private String forexMarkup;
        private String acceptance;
        private String applicationProcess;
        private List<String> features;
        private String bestFor;
        private String pros;
        private String cons;
        private String applicationLink;
        private String comparison;
        private String recommendation;

        public Card() {}

        public Card(String name, String bank, String annualFee, String forexMarkup, String acceptance, 
                   String applicationProcess, List<String> features, String bestFor, String pros, 
                   String cons, String applicationLink, String comparison, String recommendation) {
            this.name = name;
            this.bank = bank;
            this.annualFee = annualFee;
            this.forexMarkup = forexMarkup;
            this.acceptance = acceptance;
            this.applicationProcess = applicationProcess;
            this.features = features;
            this.bestFor = bestFor;
            this.pros = pros;
            this.cons = cons;
            this.applicationLink = applicationLink;
            this.comparison = comparison;
            this.recommendation = recommendation;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getBank() {
            return bank;
        }

        public void setBank(String bank) {
            this.bank = bank;
        }

        public String getAnnualFee() {
            return annualFee;
        }

        public void setAnnualFee(String annualFee) {
            this.annualFee = annualFee;
        }

        public String getForexMarkup() {
            return forexMarkup;
        }

        public void setForexMarkup(String forexMarkup) {
            this.forexMarkup = forexMarkup;
        }

        public String getAcceptance() {
            return acceptance;
        }

        public void setAcceptance(String acceptance) {
            this.acceptance = acceptance;
        }

        public String getApplicationProcess() {
            return applicationProcess;
        }

        public void setApplicationProcess(String applicationProcess) {
            this.applicationProcess = applicationProcess;
        }

        public List<String> getFeatures() {
            return features;
        }

        public void setFeatures(List<String> features) {
            this.features = features;
        }

        public String getBestFor() {
            return bestFor;
        }

        public void setBestFor(String bestFor) {
            this.bestFor = bestFor;
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

        public String getApplicationLink() {
            return applicationLink;
        }

        public void setApplicationLink(String applicationLink) {
            this.applicationLink = applicationLink;
        }

        public String getComparison() {
            return comparison;
        }

        public void setComparison(String comparison) {
            this.comparison = comparison;
        }

        public String getRecommendation() {
            return recommendation;
        }

        public void setRecommendation(String recommendation) {
            this.recommendation = recommendation;
        }

        public static Builder builder() {
            return new Builder();
        }

        public static class Builder {
            private String name;
            private String bank;
            private String annualFee;
            private String forexMarkup;
            private String acceptance;
            private String applicationProcess;
            private List<String> features;
            private String bestFor;
            private String pros;
            private String cons;
            private String applicationLink;
            private String comparison;
            private String recommendation;

            public Builder name(String name) {
                this.name = name;
                return this;
            }

            public Builder bank(String bank) {
                this.bank = bank;
                return this;
            }

            public Builder annualFee(String annualFee) {
                this.annualFee = annualFee;
                return this;
            }

            public Builder forexMarkup(String forexMarkup) {
                this.forexMarkup = forexMarkup;
                return this;
            }

            public Builder acceptance(String acceptance) {
                this.acceptance = acceptance;
                return this;
            }

            public Builder applicationProcess(String applicationProcess) {
                this.applicationProcess = applicationProcess;
                return this;
            }

            public Builder features(List<String> features) {
                this.features = features;
                return this;
            }

            public Builder bestFor(String bestFor) {
                this.bestFor = bestFor;
                return this;
            }

            public Builder pros(String pros) {
                this.pros = pros;
                return this;
            }

            public Builder cons(String cons) {
                this.cons = cons;
                return this;
            }

            public Builder applicationLink(String applicationLink) {
                this.applicationLink = applicationLink;
                return this;
            }

            public Builder comparison(String comparison) {
                this.comparison = comparison;
                return this;
            }

            public Builder recommendation(String recommendation) {
                this.recommendation = recommendation;
                return this;
            }

            public Card build() {
                return new Card(name, bank, annualFee, forexMarkup, acceptance, applicationProcess, 
                              features, bestFor, pros, cons, applicationLink, comparison, recommendation);
            }
        }
    }
} 