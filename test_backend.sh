#!/bin/bash

echo "🧪 Testing Spring Boot Backend API"
echo "=================================="

# Test health endpoint
echo "1. Testing health endpoint..."
curl -s http://localhost:8080/api/sim/health
echo -e "\n\n"

# Test SIM information endpoint
echo "2. Testing SIM information endpoint..."
curl -s -X POST http://localhost:8080/api/sim/information \
  -H "Content-Type: application/json" \
  -d '{"destination":"USA","duration":"2 weeks"}' | jq '.' 2>/dev/null || echo "Response received (jq not available for formatting)"

echo -e "\n\n✅ Backend testing completed!"
echo "Frontend should now be able to connect to the backend at http://localhost:8080/api" 