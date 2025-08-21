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

// Spring Boot Backend Configuration
const BACKEND_CONFIG = {
  baseURL: 'http://localhost:8080/api'
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
        // Add more parameters as per Cleartrip API documentation
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

// Spring Boot Backend Service for SIM Information
export class SimInformationService {
  constructor() {
    this.client = axios.create({
      baseURL: BACKEND_CONFIG.baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async getSIMInformation(destination, startDate, endDate) {
    try {
      console.log('🔍 Fetching SIM information from Spring Boot backend...');
      console.log('Destination:', destination, 'StartDate:', startDate, 'EndDate:', endDate);
      
      const response = await this.client.post('/sim/information', {
        destination: destination,
        startDate: startDate,
        endDate: endDate
      });
      
      console.log('✅ SIM information received from backend:', response.data);
      return response.data;
      
    } catch (error) {
      console.error('❌ Error fetching SIM information from backend:', error);
      
      // Fallback to mock data if backend is not available
      console.log('🔄 Falling back to mock data...');
      return this.getMockSIMInformation(destination, 'calculated duration');
    }
  }

  // Fallback mock data if backend is not available
  getMockSIMInformation(destination, duration) {
    console.log('🎭 Using mock SIM data for:', destination);
    
    return {
      aiRecommendations: `Based on your trip to ${destination} for ${duration}, here are my recommendations:\n\n` +
        `**Best Option: Local SIM Card**\n` +
        `- Most cost-effective for stays longer than 3 days\n` +
        `- Better network coverage and speeds\n` +
        `- Local customer support\n\n` +
        `**Alternative: eSIM**\n` +
        `- Instant activation\n` +
        `- No physical SIM needed\n` +
        `- Good for short trips\n\n` +
        `**Avoid: International SIMs**\n` +
        `- Higher costs\n` +
        `- Limited data\n` +
        `- Poor customer support`,
      simOptions: {
        destination: destination,
        localCarriers: [
          {
            name: 'Local Carrier 1',
            coverage: 'City-wide',
            dataPlans: ['2GB - $20', '5GB - $30', '10GB - $40'],
            price: '$20-40',
            networkQuality: 'Good',
            customerSupport: 'Business hours',
            activationTime: '24 hours'
          },
          {
            name: 'Local Carrier 2',
            coverage: 'City-wide',
            dataPlans: ['3GB - $25', '7GB - $35', '15GB - $45'],
            price: '$25-45',
            networkQuality: 'Fair',
            customerSupport: 'Business hours',
            activationTime: '24 hours'
          }
        ],
        internationalSIMs: [
          {
            name: 'Airalo',
            coverage: 'Global',
            dataPlans: ['1GB - $4.50', '3GB - $11', '5GB - $16'],
            price: '$4.50-16',
            validity: '7-30 days',
            activationProcess: 'Instant',
            customerSupport: 'Email'
          },
          {
            name: 'Truphone',
            coverage: 'Global',
            dataPlans: ['1GB - $5', '3GB - $12', '5GB - $18'],
            price: '$5-18',
            validity: '7-30 days',
            activationProcess: 'Instant',
            customerSupport: '24/7'
          }
        ],
        eSIMs: [
          {
            name: 'Airalo eSIM',
            coverage: 'Global',
            dataPlans: ['1GB - $4.50', '3GB - $11', '5GB - $16'],
            price: '$4.50-16',
            compatibility: 'iPhone/Android',
            activationTime: 'Instant',
            validity: '7-30 days'
          },
          {
            name: 'Truphone eSIM',
            coverage: 'Global',
            dataPlans: ['1GB - $5', '3GB - $12', '5GB - $18'],
            price: '$5-18',
            compatibility: 'iPhone/Android',
            activationTime: 'Instant',
            validity: '7-30 days'
          }
        ]
      }
    };
  }
}

// Combined Travel Service
export class TravelService {
  constructor() {
    this.openAI = new AzureOpenAIService();
    this.hotels = new CleartripHotelService();
    this.flights = new CleartripAirService();
    this.simInfo = new SimInformationService();
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

  // New method to get SIM information using the Spring Boot backend
  async getSIMInformation(destination, startDate, endDate) {
    return await this.simInfo.getSIMInformation(destination, startDate, endDate);
  }

  parseSearchQuery(aiResponse) {
    // This is a placeholder - implement based on your AI response format
    // You might want to use a more structured approach with JSON responses
    return {
      hotels: null,
      flights: null
    };
  }

  async getForexInformation(destination, amount) {
    try {
      const response = await axios.post('http://localhost:8080/api/forex-exchange/info', {
        destination: destination,
        amount: parseFloat(amount),
        currency: 'INR'
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching forex information:', error);
      // Fallback to mock data if backend is not available
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            aiRecommendations: `Forex Exchange Information for ${destination}:

**Exchange Rate Information:**
- Current Exchange Rate: 1 INR = ${(Math.random() * 0.02 + 0.01).toFixed(4)} ${destination.toUpperCase()} (approximate)
- Amount to Exchange: ₹${amount}
- Expected Value: ${(parseFloat(amount) * (Math.random() * 0.02 + 0.01)).toFixed(2)} ${destination.toUpperCase()}

**Best Places to Exchange Currency:**

1. **Airport Exchange Counters**
   - Convenience: High
   - Rates: Lower (2-5% markup)
   - Best for: Small amounts, emergency

2. **Local Banks**
   - Convenience: Medium
   - Rates: Better (1-2% markup)
   - Best for: Large amounts, better rates

3. **Authorized Forex Dealers**
   - Convenience: Medium
   - Rates: Best (0.5-1% markup)
   - Best for: Best rates, reliable service

4. **ATMs**
   - Convenience: High
   - Rates: Good (1-3% markup)
   - Best for: Convenient access, reasonable rates

**Tips for Currency Exchange:**
- Avoid exchanging at hotels (high markup)
- Compare rates at multiple locations
- Keep some local currency for immediate expenses
- Use credit cards for larger purchases
- Notify your bank before international travel

**Required Documents:**
- Valid passport
- PAN card
- Aadhaar card
- Travel itinerary
- Bank statement (for large amounts)

**Exchange Limits:**
- RBI limit: $250,000 per financial year
- Single transaction: $10,000 (without documentation)
- Large amounts require additional documentation

**Safety Tips:**
- Exchange only at authorized dealers
- Count money before leaving
- Keep receipts for record-keeping
- Be aware of current exchange rates`,
            destination: destination,
            amount: amount,
            exchangeRate: (Math.random() * 0.02 + 0.01).toFixed(4),
            exchangeOptions: [
              {
                name: "Airport Exchange Counters",
                convenience: "High",
                markup: "2-5%",
                bestFor: "Small amounts, emergency"
              },
              {
                name: "Local Banks",
                convenience: "Medium",
                markup: "1-2%",
                bestFor: "Large amounts, better rates"
              },
              {
                name: "Authorized Forex Dealers",
                convenience: "Medium",
                markup: "0.5-1%",
                bestFor: "Best rates, reliable service"
              },
              {
                name: "ATMs",
                convenience: "High",
                markup: "1-3%",
                bestFor: "Convenient access, reasonable rates"
              }
            ]
          });
        }, 2000);
      });
    }
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

  async getRouteInformation(destination, numberOfStops, timePreference, layoverDuration) {
    try {
      const response = await axios.post('http://localhost:8080/api/route-planning/info', {
        destination: destination,
        numberOfStops: numberOfStops,
        timePreference: timePreference,
        layoverDuration: layoverDuration
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching route information:', error);
      // Fallback to mock data if backend is not available
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            routeInfo: true,
            destination: destination,
            numberOfStops: numberOfStops,
            timePreference: timePreference,
            layoverDuration: layoverDuration,
            aiRecommendations: `Route Planning Analysis for ${destination}:

**Route Optimization for ${numberOfStops} ${numberOfStops === 1 ? 'Stop' : 'Stops'} with ${layoverDuration} layover:**

**Best Time Windows for ${timePreference}:**
- Optimal departure times based on your preference
- Connection timing considerations
- Layover duration recommendations

**Layover Duration Analysis (${layoverDuration}):**
${layoverDuration === 'short' ? `
- **Short Layovers (1-3 hours):**
  - Quick connections, minimal waiting time
  - Best for experienced travelers
  - Risk of missing connection if flight is delayed
  - Limited time for airport amenities` :
layoverDuration === 'medium' ? `
- **Medium Layovers (3-6 hours):**
  - Balanced approach for comfort and efficiency
  - Time for meals, shopping, and rest
  - Buffer time for flight delays
  - Good for families and leisure travelers` :
layoverDuration === 'long' ? `
- **Long Layovers (6-12 hours):**
  - Extended rest periods between flights
  - Opportunity to explore the connecting city
  - Time for airport lounges and amenities
  - Best for long-haul international travel` :
`
- **Overnight Layovers (12+ hours):**
  - Full rest period between flights
  - Opportunity for city exploration
  - May require transit visa
  - Best for reducing jet lag`}

**Route Recommendations:**

1. **Direct Routes (0 Stops)**
   - Fastest travel time
   - Higher cost but maximum convenience
   - Best for business travelers

2. **One-Stop Routes**
   - Good balance of cost and time
   - Reasonable layover durations
   - Popular choice for leisure travelers

3. **Two-Stop Routes**
   - Most economical option
   - Longer total travel time
   - Good for budget-conscious travelers

**Time Preference Analysis:**
- ${timePreference} flights typically have ${timePreference === 'early-morning' ? 'lower prices and less crowded airports' : 
  timePreference === 'morning' ? 'good availability and reasonable prices' :
  timePreference === 'afternoon' ? 'moderate prices and good connection options' :
  timePreference === 'evening' ? 'higher prices but convenient arrival times' :
  'variable pricing depending on destination'}

**Layover Strategy for ${layoverDuration} Preference:**
${layoverDuration === 'short' ? `
- Book flights with minimal connection time
- Choose major hub airports for better connections
- Have backup plans for missed connections
- Pack essentials in carry-on luggage` :
layoverDuration === 'medium' ? `
- Look for routes with 3-6 hour connections
- Choose airports with good amenities
- Plan for meals and rest during layover
- Consider airport lounge access` :
layoverDuration === 'long' ? `
- Select routes with extended layover periods
- Research airport and city attractions
- Check visa requirements for layover country
- Plan for comfortable rest and exploration` :
`
- Consider overnight layover packages
- Research hotel options near airport
- Check transit visa requirements
- Plan for city exploration if time permits`}

**Tips for ${numberOfStops > 0 ? 'Multi-Stop' : 'Direct'} Travel:**
${numberOfStops === 0 ? `
- Book early for best prices
- Consider premium economy for comfort
- Check baggage allowance carefully` :
numberOfStops === 1 ? `
- Allow minimum 2-3 hours for connections
- Check visa requirements for stopover country
- Pack essentials in carry-on for layovers` :
`
- Plan for longer total travel time
- Check multiple connection options
- Consider overnight layovers for rest`}

**Cost Considerations:**
- Direct flights: 20-40% more expensive
- One-stop: Best value for money
- Two-stop: Most economical but longest duration
- ${layoverDuration === 'short' ? 'Short layovers may cost more due to premium timing' :
  layoverDuration === 'medium' ? 'Medium layovers offer best price-performance ratio' :
  layoverDuration === 'long' ? 'Long layovers often reduce total ticket cost' :
  'Overnight layovers may require additional accommodation costs'}

**Booking Recommendations:**
- Book 3-6 months in advance for best prices
- Be flexible with dates for better deals
- Consider alternative airports nearby
- Check for seasonal route availability
- ${layoverDuration !== 'short' ? 'Research layover city attractions and visa requirements' : 'Ensure quick connection times for short layovers'}`,
            routeOptions: [
              {
                airline: "Emirates",
                price: "$1,200",
                duration: "14h 30m",
                departure: "2:30 AM",
                arrival: "5:00 PM",
                stops: numberOfStops,
                layoverTime: layoverDuration === 'short' ? "2h 15m" : layoverDuration === 'medium' ? "4h 30m" : layoverDuration === 'long' ? "8h 45m" : "14h 20m",
                stopDetails: numberOfStops > 0 ? [
                  {
                    airport: "DXB (Dubai)",
                    duration: layoverDuration === 'short' ? "2h 15m" : layoverDuration === 'medium' ? "4h 30m" : layoverDuration === 'long' ? "8h 45m" : "14h 20m"
                  }
                ] : null
              },
              {
                airline: "Qatar Airways",
                price: "$1,150",
                duration: "16h 15m",
                departure: "8:45 AM",
                arrival: "11:15 PM",
                stops: numberOfStops,
                layoverTime: layoverDuration === 'short' ? "1h 45m" : layoverDuration === 'medium' ? "3h 20m" : layoverDuration === 'long' ? "7h 15m" : "12h 30m",
                stopDetails: numberOfStops > 0 ? [
                  {
                    airport: "DOH (Doha)",
                    duration: layoverDuration === 'short' ? "1h 45m" : layoverDuration === 'medium' ? "3h 20m" : layoverDuration === 'long' ? "7h 15m" : "12h 30m"
                  }
                ] : null
              },
              {
                airline: "Lufthansa",
                price: "$1,350",
                duration: "12h 45m",
                departure: "4:15 PM",
                arrival: "7:00 AM",
                stops: numberOfStops,
                layoverTime: layoverDuration === 'short' ? "2h 30m" : layoverDuration === 'medium' ? "5h 15m" : layoverDuration === 'long' ? "9h 30m" : "16h 45m",
                stopDetails: numberOfStops > 0 ? [
                  {
                    airport: "FRA (Frankfurt)",
                    duration: layoverDuration === 'short' ? "2h 30m" : layoverDuration === 'medium' ? "5h 15m" : layoverDuration === 'long' ? "9h 30m" : "16h 45m"
                  }
                ] : null
              }
            ]
          });
        }, 2000);
      });
    }
  }

  async getVisaInformation(destination, purposeOfVisit) {
    try {
      const response = await axios.post('http://localhost:8080/api/visa-information/info', {
        destination: destination,
        purposeOfVisit: purposeOfVisit,
        nationality: 'Indian'
      });
      
      // Transform the backend response to match frontend expectations
      const backendData = response.data;
      return {
        aiRecommendations: backendData.visaInformation,
        visaRequirements: {
          data: backendData.visaRequirementsData
        },
        destination: backendData.destination,
        purposeOfVisit: backendData.purposeOfVisit,
        nationality: backendData.nationality
      };
    } catch (error) {
      console.error('Error fetching visa information:', error);
      // Fallback to mock data if backend is not available
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            aiRecommendations: `Visa Information for ${destination} (${purposeOfVisit}):

**Visa Type and Requirements:**
- Visa Type: Tourist/Business Visa (as applicable)
- Validity: 3 months to 1 year (depending on purpose)
- Entry Type: Single/Multiple entry

**Minimum Application Time:**
- Apply at least 4-6 weeks before your travel date
- Peak season: Apply 8-10 weeks in advance
- Emergency processing available (additional fees)

**Required Documents:**
1. **Passport**
   - Valid for at least 6 months beyond stay
   - At least 2 blank pages
   - Not damaged or mutilated

2. **Visa Application Form**
   - Completed and signed
   - Recent passport-size photographs (2-4 copies)

3. **Financial Documents**
   - Bank statements (last 3-6 months)
   - Income tax returns
   - Employment letter (if employed)

4. **Travel Documents**
   - Flight itinerary
   - Hotel reservations
   - Travel insurance

5. **Additional Documents**
   - Cover letter explaining purpose of visit
   - Invitation letter (if visiting friends/family)
   - Business documents (for business visits)

**Official Application Website:**
- Primary: Official government visa portal
- Alternative: Authorized visa service providers
- Avoid third-party websites

**Estimated Processing Time:**
- Standard processing: 15-30 business days
- Express processing: 5-10 business days
- Emergency processing: 1-3 business days

**Visa Fees:**
- Standard visa: ₹2,000 - ₹5,000
- Express processing: Additional ₹1,000 - ₹2,000
- Service charges: ₹500 - ₹1,000

**Application Process Steps:**
1. Visit official website
2. Fill online application form
3. Upload required documents
4. Pay visa fees
5. Schedule appointment (if required)
6. Submit application
7. Track application status
8. Collect visa

**Important Notes:**
- Keep copies of all documents
- Ensure all information is accurate
- Apply well in advance
- Check for any travel advisories
- Verify visa requirements before travel

**Common Rejection Reasons:**
- Incomplete documentation
- Insufficient funds
- Previous visa violations
- Criminal record
- Inconsistent information

**Emergency Contact:**
- Embassy/Consulate: [Contact details]
- Emergency helpline: [Phone number]
- Email support: [Email address]

**Travel Insurance:**
- Required for most destinations
- Minimum coverage: $50,000
- Should cover medical expenses and repatriation

**COVID-19 Requirements:**
- Vaccination certificate (if required)
- Negative test results (if required)
- Quarantine requirements (if applicable)
- Health declaration forms`,
            visaRequirements: {
              data: {
                destination: destination,
                visaTypes: [
                  {
                    type: "Tourist Visa",
                    validity: "3-6 months",
                    processingTime: "15-30 days",
                    fee: "₹2,000 - ₹5,000"
                  },
                  {
                    type: "Business Visa",
                    validity: "6-12 months",
                    processingTime: "10-20 days",
                    fee: "₹3,000 - ₹7,000"
                  }
                ],
                requiredDocuments: [
                  "Valid passport (6+ months validity)",
                  "Visa application form",
                  "Passport-size photographs (2-4 copies)",
                  "Bank statements (last 3-6 months)",
                  "Income tax returns",
                  "Employment letter (if employed)",
                  "Flight itinerary",
                  "Hotel reservations",
                  "Travel insurance",
                  "Cover letter explaining purpose of visit"
                ],
                applicationProcess: [
                  "Visit official government visa portal",
                  "Fill online application form",
                  "Upload required documents",
                  "Pay visa fees online",
                  "Schedule appointment (if required)",
                  "Submit application at visa center",
                  "Track application status online",
                  "Collect visa from center or courier"
                ]
              }
            },
            destination: destination,
            purposeOfVisit: purposeOfVisit,
            nationality: 'Indian'
          });
        }, 2000);
      });
    }
  }

  async getInternationalItinerary(request) {
    try {
      console.log('🔍 Fetching international itinerary from Spring Boot backend...');
      console.log('Request:', request);
      
      const response = await axios.post(`${BACKEND_CONFIG.baseURL}/itinerary/international`, request);
      
      console.log('✅ International itinerary received from backend:', response.data);
      return response.data;
      
    } catch (error) {
      console.error('❌ Error fetching international itinerary from backend:', error);
      
      // Fallback to mock data if backend is not available
      console.log('🔄 Falling back to mock data...');
      return this.getMockInternationalItinerary(request);
    }
  }

  getMockInternationalItinerary(request) {
    console.log('🎭 Using mock international itinerary data for:', request.destination);
    
    return {
      itinerarySummary: `Comprehensive ${request.duration}-day itinerary for ${request.destination} from ${request.origin}`,
      destinationInfo: `${request.destination} is a beautiful destination with rich culture, history, and modern amenities.`,
      flights: {
        recommendedAirlines: ["Emirates", "Qatar Airways", "Lufthansa"],
        flightOptions: [
          {
            airline: "Emirates",
            flightNumber: "EK123",
            departureTime: "2:30 AM",
            arrivalTime: "5:00 PM",
            duration: "14h 30m",
            price: "$1,200",
            stops: "1 stop"
          },
          {
            airline: "Qatar Airways",
            flightNumber: "QR456",
            departureTime: "8:45 AM",
            arrivalTime: "11:15 PM",
            duration: "16h 15m",
            price: "$1,150",
            stops: "1 stop"
          }
        ],
        bookingTips: "Book 3-6 months in advance for best prices",
        averagePrice: "$1,200-1,500",
        flightDuration: "14-16 hours"
      },
      hotels: {
        recommendedHotels: [
          {
            name: "Luxury Hotel",
            area: "City Center",
            rating: "4.5/5",
            price: "$200-300/night",
            amenities: ["WiFi", "Restaurant", "Spa", "Pool"],
            description: "Luxury hotel in the heart of the city",
            foodOptions: ["International", "Local", "Vegetarian"]
          },
          {
            name: "Boutique Hotel",
            area: "Historic District",
            rating: "4.2/5",
            price: "$150-200/night",
            amenities: ["WiFi", "Restaurant", "Garden"],
            description: "Charming boutique hotel in historic area",
            foodOptions: ["Local", "Vegetarian", "Vegan"]
          }
        ],
        hotelAreas: ["City Center", "Historic District", "Business District"],
        averagePrice: "$150-300/night",
        bookingTips: "Book early, especially during peak season",
        amenities: ["WiFi", "Restaurant", "24/7 Front Desk"]
      },
      activities: {
        mustVisitAttractions: [
          {
            name: "Historic Landmark",
            description: "Famous historical site",
            duration: "2-3 hours",
            price: "$20",
            bookingRequired: true,
            bookingLink: "https://example.com/book",
            bestTime: "Morning",
            location: "City Center"
          }
        ],
        preBookActivities: [
          {
            name: "Guided City Tour",
            description: "Comprehensive city tour with guide",
            duration: "4 hours",
            price: "$50",
            bookingRequired: true,
            bookingLink: "https://example.com/tour",
            bestTime: "Morning",
            location: "Various locations"
          }
        ],
        freeActivities: [
          {
            name: "City Park Walk",
            description: "Beautiful city park",
            duration: "1-2 hours",
            price: "Free",
            bookingRequired: false,
            bookingLink: "",
            bestTime: "Evening",
            location: "City Park"
          }
        ],
        activityTips: "Book popular activities in advance"
      },
      foodRecommendations: {
        localCuisine: "Rich and diverse local cuisine",
        recommendedRestaurants: [
          {
            name: "Local Restaurant",
            cuisine: "Local",
            location: "City Center",
            priceRange: "$20-40",
            rating: "4.3/5",
            specialties: ["Local Dish 1", "Local Dish 2"],
            dietaryOptions: ["Vegetarian", "Vegan"],
            reservationRequired: true
          }
        ],
        foodPreferences: "Based on your preferences",
        dietaryOptions: ["Vegetarian", "Vegan", "Halal", "Kosher"],
        foodSafetyTips: "Eat at reputable restaurants",
        mustTryDishes: ["Local Dish 1", "Local Dish 2"]
      },
      transportation: {
        airportTransfer: "Taxi, shuttle, or public transport",
        localTransport: ["Metro", "Bus", "Taxi"],
        transportationTips: "Get a travel pass for convenience",
        publicTransport: "Efficient and affordable",
        carRental: "Available but not recommended in city center"
      },
      bookingLinks: {
        cleartripFlights: "https://www.cleartrip.com/flights",
        cleartripHotels: "https://www.cleartrip.com/hotels",
        trippy: "https://www.trippy.com",
        bookingCom: "https://www.booking.com",
        agoda: "https://www.agoda.com",
        airbnb: "https://www.airbnb.com",
        viator: "https://www.viator.com",
        getYourGuide: "https://www.getyourguide.com"
      },
      travelTips: "General travel tips for the destination",
      weatherInfo: "Check weather before travel",
      currencyInfo: "Local currency information",
      emergencyContacts: "Emergency contact numbers"
    };
  }
}

// Export instances for easy use
export const travelService = new TravelService();
export const openAIService = new AzureOpenAIService();
export const hotelService = new CleartripHotelService();
export const airService = new CleartripAirService();
export const simInformationService = new SimInformationService();