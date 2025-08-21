# GenAI Prompt for Zero Forex Card Recommendations

## Overview
This document outlines the comprehensive prompt used for Azure OpenAI GPT-4o model to provide intelligent zero-forex credit card recommendations for international travelers.

## System Prompt

```
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
```

## User Prompt Template

```
I'm planning to travel to {DESTINATION} and need information about zero-forex credit cards. 
Please provide:

1. Which zero-forex cards are best for {DESTINATION}?
2. What are the fees and charges for each card?
3. How widely are these cards accepted in {DESTINATION}?
4. What's the application process and requirements?
5. Which card would you recommend and why?
6. How do the costs compare to traditional forex cards?
7. Any tips for getting the best deals?
8. Direct links to apply for these cards

Please provide comprehensive, detailed information that would help a traveler make an informed decision.
```

## Key Information to Include

### 1. Card Analysis
- **Card Name and Bank**: Full name of the card and issuing bank
- **Annual Fee**: Complete fee structure including GST
- **Forex Markup**: Should be 0% for zero-forex cards
- **Acceptance**: How widely accepted the card is in the destination
- **Application Process**: Online/Offline options and requirements

### 2. Features and Benefits
- **Primary Features**: Zero forex markup, reward points, lounge access
- **Secondary Features**: Travel insurance, concierge services, golf privileges
- **Best For**: Target audience (frequent travelers, budget-conscious, premium travelers)
- **Pros and Cons**: Balanced analysis of advantages and disadvantages

### 3. Cost Analysis
- **Fee Comparison**: Annual fees vs. potential savings
- **Savings Calculation**: Example calculations for typical spending
- **Traditional vs Zero-Forex**: Clear comparison showing cost benefits
- **ROI Analysis**: Return on investment for different spending levels

### 4. Application Information
- **Requirements**: Income requirements, credit score, documents needed
- **Process Steps**: Step-by-step application process
- **Timeline**: Expected processing time
- **Direct Links**: Official application portals

### 5. Destination-Specific Information
- **Local Acceptance**: How well cards are accepted in the specific destination
- **Currency Considerations**: Any currency-specific benefits or limitations
- **Local Banking Partners**: If any local partnerships exist
- **Emergency Support**: 24/7 support availability in the destination

## Sample Response Structure

```
# Zero-Forex Credit Cards for {DESTINATION}

## Overview
Brief introduction about zero-forex cards and their benefits for {DESTINATION}.

## Top Recommended Cards

### 1. [Card Name] - [Bank]
- **Annual Fee**: ₹X,XXX + GST
- **Forex Markup**: 0%
- **Acceptance**: Excellent/Good/Fair
- **Best For**: [Target audience]

**Features:**
- Zero forex markup
- [Other features]

**Pros:**
- [Advantages]

**Cons:**
- [Disadvantages]

**Application Link**: [Direct link]

### 2. [Card Name] - [Bank]
[Similar structure for other cards]

## Cost Comparison

### Traditional Forex Cards vs Zero-Forex Cards
- Traditional cards: 3-5% markup
- Zero-forex cards: 0% markup
- Potential savings on ₹50,000 spending: ₹1,500-2,500

### Annual Fee vs Savings Analysis
[Detailed calculation showing break-even point]

## Application Process

### Requirements
- Minimum income: ₹X lakhs per annum
- Credit score: 750+
- Documents: [List of required documents]

### Steps
1. Visit the bank's website
2. Fill out the online application
3. Submit required documents
4. Wait for approval (usually 7-10 days)

## Tips for Maximizing Benefits

1. **Apply Early**: Apply at least 2-3 weeks before your trip
2. **Credit Score**: Ensure your credit score is in good standing
3. **Income Requirements**: Make sure you meet the minimum income criteria
4. **Usage Strategy**: Use the card for all international transactions
5. **Reward Points**: Maximize reward point accumulation

## Emergency Support

- 24/7 customer service: [Phone number]
- Lost card reporting: [Process]
- Emergency cash advance: [Availability]

## Conclusion

[Summary of recommendations with final advice]
```

## Model Configuration

- **Model**: GPT-4o
- **Max Tokens**: 4096
- **Temperature**: 0.7 (balanced creativity and accuracy)
- **Top P**: 1.0
- **API Version**: 2025-01-01-preview

## Quality Guidelines

1. **Accuracy**: Ensure all information is current and accurate
2. **Completeness**: Cover all important aspects of zero-forex cards
3. **Actionability**: Provide specific, actionable advice
4. **Balance**: Present both pros and cons objectively
5. **Clarity**: Use clear, easy-to-understand language
6. **Relevance**: Focus on destination-specific information

## Error Handling

- If the model fails to provide a response, fall back to structured card data
- Ensure graceful degradation when AI service is unavailable
- Provide helpful error messages to users

## Continuous Improvement

- Monitor user feedback on recommendation quality
- Update prompts based on user interactions
- Incorporate new card offerings and features
- Stay updated with banking regulations and policies 