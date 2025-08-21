package com.ct.hackathon.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class AzureOpenAIResponse {
    private String id;
    private String object;
    private Long created;
    private String model;
    private List<Choice> choices;
    private Usage usage;
    @JsonProperty("prompt_filter_results")
    private Object promptFilterResults;
    @JsonProperty("system_fingerprint")
    private String systemFingerprint;
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getObject() {
        return object;
    }

    public void setObject(String object) {
        this.object = object;
    }

    public Long getCreated() {
        return created;
    }

    public void setCreated(Long created) {
        this.created = created;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public List<Choice> getChoices() {
        return choices;
    }

    public void setChoices(List<Choice> choices) {
        this.choices = choices;
    }

    public Usage getUsage() {
        return usage;
    }

    public void setUsage(Usage usage) {
        this.usage = usage;
    }

    public Object getPromptFilterResults() {
        return promptFilterResults;
    }

    public void setPromptFilterResults(Object promptFilterResults) {
        this.promptFilterResults = promptFilterResults;
    }

    public String getSystemFingerprint() {
        return systemFingerprint;
    }

    public void setSystemFingerprint(String systemFingerprint) {
        this.systemFingerprint = systemFingerprint;
    }
    
    public static class Choice {
        private Integer index;
        private Message message;
        @JsonProperty("finish_reason")
        private String finishReason;
        @JsonProperty("content_filter_results")
        private Object contentFilterResults;
        @JsonProperty("logprobs")
        private Object logprobs;

        public Integer getIndex() {
            return index;
        }

        public void setIndex(Integer index) {
            this.index = index;
        }

        public Message getMessage() {
            return message;
        }

        public void setMessage(Message message) {
            this.message = message;
        }

        public String getFinishReason() {
            return finishReason;
        }

        public void setFinishReason(String finishReason) {
            this.finishReason = finishReason;
        }

        public Object getContentFilterResults() {
            return contentFilterResults;
        }

        public void setContentFilterResults(Object contentFilterResults) {
            this.contentFilterResults = contentFilterResults;
        }

        public Object getLogprobs() {
            return logprobs;
        }

        public void setLogprobs(Object logprobs) {
            this.logprobs = logprobs;
        }
    }
    
    public static class Message {
        private String role;
        private String content;
        @JsonProperty("annotations")
        private Object annotations;
        @JsonProperty("refusal")
        private Object refusal;

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

        public Object getAnnotations() {
            return annotations;
        }

        public void setAnnotations(Object annotations) {
            this.annotations = annotations;
        }

        public Object getRefusal() {
            return refusal;
        }

        public void setRefusal(Object refusal) {
            this.refusal = refusal;
        }
    }
    
    public static class Usage {
        @JsonProperty("prompt_tokens")
        private Integer promptTokens;
        @JsonProperty("completion_tokens")
        private Integer completionTokens;
        @JsonProperty("total_tokens")
        private Integer totalTokens;
        @JsonProperty("completion_tokens_details")
        private Object completionTokensDetails;
        @JsonProperty("prompt_tokens_details")
        private Object promptTokensDetails;

        public Integer getPromptTokens() {
            return promptTokens;
        }

        public void setPromptTokens(Integer promptTokens) {
            this.promptTokens = promptTokens;
        }

        public Integer getCompletionTokens() {
            return completionTokens;
        }

        public void setCompletionTokens(Integer completionTokens) {
            this.completionTokens = completionTokens;
        }

        public Integer getTotalTokens() {
            return totalTokens;
        }

        public void setTotalTokens(Integer totalTokens) {
            this.totalTokens = totalTokens;
        }

        public Object getCompletionTokensDetails() {
            return completionTokensDetails;
        }

        public void setCompletionTokensDetails(Object completionTokensDetails) {
            this.completionTokensDetails = completionTokensDetails;
        }

        public Object getPromptTokensDetails() {
            return promptTokensDetails;
        }

        public void setPromptTokensDetails(Object promptTokensDetails) {
            this.promptTokensDetails = promptTokensDetails;
        }
    }
} 