import axios from 'axios';

// API Configuration - Real CT Hackathon 2025 Keys
const AZURE_CONFIG = {
  endpoint: import.meta.env.VITE_AZURE_ENDPOINT,
  apiKey: import.meta.env.VITE_AZURE_API_KEY,
  deployment: import.meta.env.VITE_AZURE_DEPLOYMENT,
  apiVersion: import.meta.env.VITE_AZURE_API_VERSION
};

const CLEARTRIP_CONFIG = {
  hostname: import.meta.env.VITE_CLEARTRIP_HOSTNAME,
  apiKey: import.meta.env.VITE_CLEARTRIP_API_KEY,
  daAccount: import.meta.env.VITE_CLEARTRIP_DA_ACCOUNT
};

// Azure OpenAI API Service
export class AzureOpenAIService {
  constructor() {
    this.client = axios.create({
      baseURL: AZURE_CONFIG.endpoint,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AZURE_CONFIG.apiKey}`
      }
    });
  }

  async chatCompletion(messages, options = {}) {
    try {
      const response = await this.client.post(
        `/openai/deployments/${AZURE_CONFIG.deployment}/chat/completions?api-version=${AZURE_CONFIG.apiVersion}`,
        {
          messages,
          max_tokens: options.maxTokens || 4096,
          temperature: options.temperature || 0.7,
          top_p: options.topP || 1,
          model: AZURE_CONFIG.deployment,
          ...options
        }
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Azure OpenAI API Error:', error);
      throw error;
    }
  }

  async getTravelRecommendations(destination, preferences = '') {
    const systemPrompt = `You are a knowledgeable travel assistant. Provide personalized travel recommendations based on the user's destination and preferences. Keep responses concise and actionable.`;
    
    const userPrompt = `I'm planning a trip to ${destination}. ${preferences ? `My preferences: ${preferences}` : ''} Please suggest:
    1. Top 3-5 must-visit attractions
    2. Best time to visit
    3. Local cuisine recommendations
    4. Any travel tips specific to this destination
    
    Format your response in a clear, structured way.`;

    return this.chatCompletion([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);
  }

  async naturalLanguageSearch(query) {
    const systemPrompt = `You are a travel search assistant. Analyze the user's natural language query and extract key information for hotel and flight searches.`;
    
    return this.chatCompletion([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: query }
    ]);
  }
}

// Cleartrip Hotel API Service
export class CleartripHotelService {
  constructor() {
    this.client = axios.create({
      baseURL: CLEARTRIP_CONFIG.hostname,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': CLEARTRIP_CONFIG.apiKey,
        'DA-Account': CLEARTRIP_CONFIG.daAccount
      }
    });
  }

  async searchHotels(params) {
    try {
      // Using the correct Cleartrip Hotel API endpoint
      const response = await this.client.post('/api/v4/hotels/search', {
        checkIn: params.checkIn,
        checkOut: params.checkOut,
        locationId: params.locationId,
        rooms: params.rooms || 1,
        adults: params.adults || 1,
        children: params.children || 0,
        // Additional parameters that might be required
        currency: 'INR',
        nationality: 'IN',
        // Add more parameters as per Cleartrip API documentation
      });
      
      console.log('Hotel Search Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Cleartrip Hotel API Error:', error.response?.data || error.message);
      
      // Return mock data for demo purposes if API fails
      return {
        success: false,
        message: 'Hotel API not available in demo mode',
        mockData: {
          hotels: [
            {
              id: 'hotel_1',
              name: 'Sample Hotel',
              location: 'City Center',
              price: '₹2,500',
              rating: 4.2,
              amenities: ['WiFi', 'Restaurant', 'Parking']
            }
          ]
        }
      };
    }
  }

  async getHotelDetails(hotelId) {
    try {
      const response = await this.client.get(`/api/v4/hotels/${hotelId}`);
      return response.data;
    } catch (error) {
      console.error('Cleartrip Hotel Details API Error:', error);
      throw error;
    }
  }

  // Available location IDs for testing
  getAvailableLocations() {
    return [
      { id: 34849, name: 'Lucknow' },
      { id: 33897, name: 'Hyderabad' }
    ];
  }
}

// Cleartrip Air API Service
export class CleartripAirService {
  constructor() {
    this.client = axios.create({
      baseURL: CLEARTRIP_CONFIG.hostname,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': CLEARTRIP_CONFIG.apiKey,
        'DA-Account': CLEARTRIP_CONFIG.daAccount
      }
    });
  }

  async searchFlights(params) {
    try {
      // Using the correct Cleartrip Air API endpoint
      const response = await this.client.post('/api/air/search', {
        from: params.from,
        to: params.to,
        departureDate: params.departureDate,
        returnDate: params.returnDate,
        adults: params.adults || 1,
        children: params.children || 0,
        infants: params.infants || 0,
        cabinClass: params.cabinClass || 'Economy',
        // Additional parameters that might be required
        currency: 'INR',
        nationality: 'IN',
        // Add more parameters as per Cleartrip Air API documentation
      });
      
      console.log('Flight Search Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Cleartrip Air API Error:', error.response?.data || error.message);
      
      // Return mock data for demo purposes if API fails
      return {
        success: false,
        message: 'Flight API not available in demo mode',
        mockData: {
          flights: [
            {
              id: 'flight_1',
              airline: 'Sample Airline',
              flightNumber: 'SA123',
              departure: '10:00 AM',
              arrival: '12:00 PM',
              price: '₹5,000',
              duration: '2h 00m'
            }
          ]
        }
      };
    }
  }

  async getFlightDetails(flightId) {
    try {
      const response = await this.client.get(`/api/air/flights/${flightId}`);
      return response.data;
    } catch (error) {
      console.error('Cleartrip Flight Details API Error:', error);
      throw error;
    }
  }
}

// Combined Travel Service
export class TravelService {
  constructor() {
    this.openAI = new AzureOpenAIService();
    this.hotels = new CleartripHotelService();
    this.flights = new CleartripAirService();
  }

  async getIntelligentTravelSuggestions(destination, preferences) {
    try {
      // Get AI-powered recommendations
      const recommendations = await this.openAI.getTravelRecommendations(destination, preferences);
      
      // Get available hotels for the destination
      const availableLocations = this.hotels.getAvailableLocations();
      const location = availableLocations.find(loc => 
        loc.name.toLowerCase().includes(destination.toLowerCase())
      );

      let hotelSuggestions = null;
      if (location) {
        // Search for hotels in the available location
        hotelSuggestions = await this.hotels.searchHotels({
          locationId: location.id,
          checkIn: new Date().toISOString().split('T')[0],
          checkOut: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          rooms: 1,
          adults: 1
        });
      }

      return {
        recommendations,
        hotelSuggestions,
        availableLocations
      };
    } catch (error) {
      console.error('Travel Service Error:', error);
      throw error;
    }
  }

  async naturalLanguageSearch(query) {
    try {
      // Use AI to understand the query and extract search parameters
      const aiResponse = await this.openAI.naturalLanguageSearch(query);
      
      // Parse the AI response to extract search parameters
      // This is a simplified example - you'd need more sophisticated parsing
      const searchParams = this.parseSearchQuery(aiResponse);
      
      // Perform actual searches based on parsed parameters
      const results = {};
      
      if (searchParams.hotels) {
        results.hotels = await this.hotels.searchHotels(searchParams.hotels);
      }
      
      if (searchParams.flights) {
        results.flights = await this.flights.searchFlights(searchParams.flights);
      }
      
      return {
        aiInterpretation: aiResponse,
        searchResults: results
      };
    } catch (error) {
      console.error('Natural Language Search Error:', error);
      throw error;
    }
  }

  parseSearchQuery(aiResponse) {
    // This is a placeholder - implement based on your AI response format
    // You might want to use a more structured approach with JSON responses
    return {
      hotels: null,
      flights: null
    };
  }

  async getZeroForexCards(destination) {
    try {
      const response = await axios.post('http://localhost:8080/api/zero-forex-cards/recommendations', {
        destination: destination
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching zero forex cards:', error);
      // Fallback to mock data if backend is not available
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            aiRecommendations: `Based on your destination ${destination}, here are the best zero-forex credit cards:

**Top Recommendations for ${destination}:**

1. **HDFC Regalia Credit Card**
   - Annual Fee: ₹2,500 + GST
   - Forex Markup: 0%
   - Best for: Frequent travelers
   - Features: Airport lounge access, travel insurance, reward points

2. **Axis Bank Flipkart Axis Bank Credit Card**
   - Annual Fee: ₹500 + GST
   - Forex Markup: 0%
   - Best for: Budget-conscious travelers
   - Features: Flipkart rewards, no joining fee

3. **ICICI Bank Sapphiro Credit Card**
   - Annual Fee: ₹3,000 + GST
   - Forex Markup: 0%
   - Best for: Premium travelers
   - Features: Premium lounge access, golf privileges

**Key Benefits:**
- No foreign transaction fees
- Better exchange rates than traditional forex cards
- Reward points on international spending
- Travel insurance coverage

**Application Process:**
1. Visit the bank's website
2. Fill out the online application
3. Submit required documents
4. Wait for approval (usually 7-10 days)

**Tips:**
- Apply at least 2-3 weeks before your trip
- Ensure you meet the income requirements
- Keep your credit score in good standing
- Consider the annual fee vs. potential savings

**Cost Comparison:**
Traditional forex cards: 3-5% markup
Zero-forex cards: 0% markup
Potential savings on ₹50,000 spending: ₹1,500-2,500`,
            destination: destination,
            cards: {
              cards: [
                {
                  name: "HDFC Regalia Credit Card",
                  annualFee: "₹2,500 + GST",
                  forexMarkup: "0%",
                  acceptance: "Excellent",
                  applicationProcess: "Online/Offline",
                  features: ["Zero forex markup", "Airport lounge access", "Travel insurance", "Reward points"]
                },
                {
                  name: "Axis Bank Flipkart Axis Bank Credit Card",
                  annualFee: "₹500 + GST",
                  forexMarkup: "0%",
                  acceptance: "Good",
                  applicationProcess: "Online",
                  features: ["Zero forex markup", "Flipkart rewards", "No joining fee", "Welcome benefits"]
                },
                {
                  name: "ICICI Bank Sapphiro Credit Card",
                  annualFee: "₹3,000 + GST",
                  forexMarkup: "0%",
                  acceptance: "Excellent",
                  applicationProcess: "Online/Offline",
                  features: ["Zero forex markup", "Premium lounge access", "Golf privileges", "Concierge services"]
                }
              ]
            }
          });
        }, 2000);
      });
    }
  }
}

// Export instances for easy use
export const travelService = new TravelService();
export const openAIService = new AzureOpenAIService();
export const hotelService = new CleartripHotelService();
export const airService = new CleartripAirService();