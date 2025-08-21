# 🚀 CT Hackathon 2025 - Travel SIM Information Backend

A Java Spring Boot backend API that provides comprehensive SIM information for international travelers using Azure OpenAI integration.

## ✨ Features

- **AI-Powered Recommendations**: Uses Azure OpenAI GPT-4 to generate personalized SIM recommendations
- **Comprehensive SIM Data**: Local carriers, international SIMs, and eSIM options
- **Destination-Specific Information**: Tailored data for different countries
- **Price Comparison**: Cost analysis of different connectivity options
- **Network Coverage Analysis**: Quality and reliability information
- **RESTful API**: Clean, documented endpoints for frontend integration

## 🛠️ Tech Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Azure OpenAI SDK**
- **Maven**
- **Lombok**

## 🚀 Quick Start

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- Azure OpenAI API access

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ct-hackathon-2025
   ```

2. **Build the project**
   ```bash
   mvn clean install
   ```

3. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

The API will be available at `http://localhost:8080/api`

## 📡 API Endpoints

### 1. Get SIM Information
```
POST /api/sim/information
```

**Request Body:**
```json
{
  "destination": "USA",
  "duration": "2 weeks"
}
```

**Response:**
```json
{
  "aiRecommendations": "AI-generated comprehensive recommendations...",
  "simOptions": {
    "destination": "USA",
    "localCarriers": [...],
    "internationalSIMs": [...],
    "eSIMs": [...]
  }
}
```

### 2. Health Check
```
GET /api/sim/health
```

## 🔧 Configuration

The application uses the following Azure OpenAI configuration:

```properties
azure.openai.endpoint=https://openai-hack-9.openai.azure.com/
azure.openai.api-key=your_api_key_here
azure.openai.deployment=gpt-4o
azure.openai.api-version=2025-01-01-preview
```

## 🌐 CORS Configuration

The API is configured to accept requests from:
- `http://localhost:3000`
- `http://localhost:3001`
- `http://localhost:3002`

## 📊 Data Structure

### Local Carriers
- Name, coverage area, data plans, pricing
- Network quality, customer support, activation time

### International SIMs
- Global providers, coverage, plans, costs
- Validity, activation process, support

### eSIMs
- Digital SIM options, compatibility
- Activation time, validity, pricing

## 🔗 Frontend Integration

To integrate with your React frontend, update the API calls to use:

```javascript
// Example API call
const response = await fetch('http://localhost:8080/api/sim/information', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    destination: 'USA',
    duration: '2 weeks'
  })
});

const simInfo = await response.json();
```

## 🚀 Running in Production

1. **Build JAR file**
   ```bash
   mvn clean package
   ```

2. **Run JAR**
   ```bash
   java -jar target/travel-sim-api-1.0.0.jar
   ```

3. **Environment Variables**
   ```bash
   export AZURE_OPENAI_ENDPOINT=your_endpoint
   export AZURE_OPENAI_API_KEY=your_api_key
   export AZURE_OPENAI_DEPLOYMENT=your_deployment
   export AZURE_OPENAI_API_VERSION=your_version
   ```

## 🧪 Testing

### Test the API
```bash
# Health check
curl http://localhost:8080/api/sim/health

# SIM information request
curl -X POST http://localhost:8080/api/sim/information \
  -H "Content-Type: application/json" \
  -d '{"destination":"USA","duration":"2 weeks"}'
```

## 📝 Logging

The application provides detailed logging for:
- API requests and responses
- Azure OpenAI interactions
- Error handling and debugging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Happy Traveling! ✈️📱** 