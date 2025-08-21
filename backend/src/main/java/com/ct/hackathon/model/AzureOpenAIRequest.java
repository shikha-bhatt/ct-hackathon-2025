package com.ct.hackathon.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class AzureOpenAIRequest {
    private List<Message> messages;
    
    @JsonProperty("max_tokens")
    private Integer maxTokens;
    
    private Double temperature;
    
    @JsonProperty("top_p")
    private Double topP;
    
    private String model;

    public AzureOpenAIRequest() {}

    public AzureOpenAIRequest(List<Message> messages, Integer maxTokens, Double temperature, Double topP, String model) {
        this.messages = messages;
        this.maxTokens = maxTokens;
        this.temperature = temperature;
        this.topP = topP;
        this.model = model;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public Integer getMaxTokens() {
        return maxTokens;
    }

    public void setMaxTokens(Integer maxTokens) {
        this.maxTokens = maxTokens;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public Double getTopP() {
        return topP;
    }

    public void setTopP(Double topP) {
        this.topP = topP;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private List<Message> messages;
        private Integer maxTokens;
        private Double temperature;
        private Double topP;
        private String model;

        public Builder messages(List<Message> messages) {
            this.messages = messages;
            return this;
        }

        public Builder maxTokens(Integer maxTokens) {
            this.maxTokens = maxTokens;
            return this;
        }

        public Builder temperature(Double temperature) {
            this.temperature = temperature;
            return this;
        }

        public Builder topP(Double topP) {
            this.topP = topP;
            return this;
        }

        public Builder model(String model) {
            this.model = model;
            return this;
        }

        public AzureOpenAIRequest build() {
            return new AzureOpenAIRequest(messages, maxTokens, temperature, topP, model);
        }
    }
    
    public static class Message {
        private String role;
        private String content;

        public Message() {}

        public Message(String role, String content) {
            this.role = role;
            this.content = content;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }

        public static Builder builder() {
            return new Builder();
        }

        public static class Builder {
            private String role;
            private String content;

            public Builder role(String role) {
                this.role = role;
                return this;
            }

            public Builder content(String content) {
                this.content = content;
                return this;
            }

            public Message build() {
                return new Message(role, content);
            }
        }
    }
} 