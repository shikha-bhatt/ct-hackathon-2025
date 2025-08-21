# Travel Assistant Backend

A Spring Boot backend application that provides zero-forex card recommendations using Azure OpenAI integration.

## Features

- **Zero Forex Card Recommendations**: Get AI-powered recommendations for zero-forex credit cards based on destination
- **Azure OpenAI Integration**: Uses GPT-4o model for intelligent card recommendations
- **Structured Card Data**: Provides comprehensive card information including fees, features, and application links
- **RESTful API**: Clean REST endpoints for easy integration
- **CORS Support**: Configured for cross-origin requests from frontend

## Technology Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring WebFlux** (for reactive programming)
- **Azure OpenAI API** (GPT-4o model)
- **Maven** (build tool)
- **Lombok** (reducing boilerplate code)

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- Azure OpenAI API access

## Configuration

The application uses the following Azure OpenAI configuration:

```yaml
azure:
  openai:
    endpoint: https://hackathon-openui-test.openai.azure.com
    api-key: B4kxaCF6fe7KnBbRsDhk8EZZhvAz7MdVPXab3qJzZbahvpctLIT5JQQJ99BCAC77bzfXJ3w3AAABACOGTN88
    deployment-name: gpt-4o
    api-version: 2025-01-01-preview
    max-tokens: 4096
    temperature: 0.7
```

## API Endpoints

### Zero Forex Cards

#### POST `/api/zero-forex-cards/recommendations`
Get AI-powered zero-forex card recommendations for a destination.

**Request Body:**
```json
{
  "destination": "USA"
}
```

**Response:**
```json
{
  "destination": "USA",
  "aiRecommendations": "Comprehensive AI-generated recommendations...",
  "cards": {
    "cards": [
      {
        "name": "HDFC Regalia Credit Card",
        "bank": "HDFC Bank",
        "annualFee": "₹2,500 + GST",
        "forexMarkup": "0%",
        "acceptance": "Excellent",
        "applicationProcess": "Online/Offline",
        "features": ["Zero forex markup", "Airport lounge access", "Travel insurance", "Reward points"],
        "bestFor": "Frequent travelers to USA",
        "pros": "No forex charges, good rewards, lounge access",
        "cons": "High annual fee, income requirement",
        "applicationLink": "https://www.hdfcbank.com/personal/pay/cards/credit-cards/regalia",
        "comparison": "Best value for frequent travelers",
        "recommendation": "Highly recommended for business travelers"
      }
    ]
  }
}
```

#### GET `/api/zero-forex-cards/recommendations/{destination}`
Get recommendations for a specific destination using path parameter.

#### GET `/api/zero-forex-cards/health`
Health check endpoint.

## Running the Application

### Using Maven

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the application:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

### Using JAR file

1. Build the JAR:
   ```bash
   mvn clean package
   ```

2. Run the JAR:
   ```bash
   java -jar target/travel-assistant-backend-1.0.0.jar
   ```

The application will start on `http://localhost:8080`

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/ct/hackathon/
│   │   │   ├── config/           # Configuration classes
│   │   │   ├── model/            # Data models
│   │   │   ├── service/          # Business logic services
│   │   │   ├── web/              # REST controllers
│   │   │   └── TravelAssistantApplication.java
│   │   └── resources/
│   │       └── application.yml   # Application configuration
│   └── test/                     # Test files
├── pom.xml                       # Maven configuration
└── README.md                     # This file
```

## Key Components

### Services

- **AzureOpenAIService**: Handles communication with Azure OpenAI API
- **ZeroForexCardService**: Business logic for zero-forex card recommendations

### Models

- **AzureOpenAIRequest/Response**: Models for Azure OpenAI API communication
- **ZeroForexCardRequest/Response**: Models for zero-forex card API

### Controllers

- **ZeroForexCardController**: REST endpoints for zero-forex card functionality

## AI Integration

The application uses Azure OpenAI's GPT-4o model to provide intelligent recommendations. The AI prompt is designed to:

1. Analyze the destination and provide relevant card recommendations
2. Compare different cards based on fees, features, and acceptance
3. Provide application process information
4. Include cost comparisons and money-saving tips
5. Offer direct links to application portals

## Error Handling

The application includes comprehensive error handling:
- Graceful fallback to mock data if Azure OpenAI is unavailable
- Proper logging for debugging
- CORS configuration for frontend integration

## CORS Configuration

The application is configured to accept requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Alternative dev server)
- `http://127.0.0.1:5173` (Alternative localhost)

## Logging

The application uses SLF4J with the following log levels:
- `com.ct.hackathon`: DEBUG
- `org.springframework.web`: DEBUG
- `org.springframework.webflux`: DEBUG

## Development

### Adding New Features

1. Create models in the `model` package
2. Add business logic in the `service` package
3. Create REST endpoints in the `web` package
4. Update configuration as needed

### Testing

Run tests using:
```bash
mvn test
```

## Deployment

The application can be deployed to any Java-compatible platform:
- Docker containers
- Cloud platforms (AWS, Azure, GCP)
- Traditional servers

## Support

For issues or questions, please refer to the project documentation or contact the development team. 