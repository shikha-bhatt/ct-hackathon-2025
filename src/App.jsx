import React, { useState } from 'react';
import { Search, Plane, Hotel, MapPin, Sparkles, MessageCircle, Zap, Globe, Star, Image, Video, FileText, Palette, Play, Video as VideoIcon, Smartphone, FileCheck, Shield, Route, DollarSign, CreditCard } from 'lucide-react';
import { travelService } from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('ai-assistant');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // AI Assistant State
  const [destination, setDestination] = useState('');
  const [preferences, setPreferences] = useState('');

  // SIM Information State
  const [simSearch, setSimSearch] = useState({
    destination: '',
    startDate: '',
    endDate: ''
  });

  // Visa Information State
  const [visaSearch, setVisaSearch] = useState({
    destination: '',
    purpose: ''
  });

  // International Itinerary State
  const [itinerarySearch, setItinerarySearch] = useState({
    destination: '',
    duration: '',
    interests: '',
    startDate: '',
    endDate: '',
    origin: ''
  });

  // Forex Information State
  const [forexSearch, setForexSearch] = useState({
    destination: '',
    amount: ''
  });

  // Zero Forex Cards State
  const [zeroForexSearch, setZeroForexSearch] = useState({
    destination: ''
  });

  // Route Planning State
  const [routeSearch, setRouteSearch] = useState({
    destination: '',
    numberOfStops: 0,
    timePreference: '',
    layoverDuration: ''
  });

  // Function to format AI recommendations
  const formatAIRecommendations = (text) => {
    if (!text) return '';
    
    return text
      // Convert markdown headers to styled headers
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-blue-300 mb-3 mt-6">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-blue-200 mb-4 mt-8">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-blue-100 mb-6 mt-10">$1</h1>')
      
      // Convert bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      
      // Convert italic text
      .replace(/\*(.*?)\*/g, '<em class="text-gray-300 italic">$1</em>')
      
      // Convert markdown tables to beautiful HTML tables
      .replace(/(\|.*\|[\s\S]*?)(?=\n\n|\n[^|]|$)/g, (match) => {
        const lines = match.trim().split('\n').filter(line => line.trim());
        if (lines.length < 2) return match;
        
        // Check if it's actually a table (has | characters)
        if (!lines[0].includes('|')) return match;
        
        // Parse table structure
        const tableRows = lines.map(line => 
          line.split('|').map(cell => cell.trim()).filter(cell => cell)
        );
        
        // Remove separator row (contains only dashes and |)
        const dataRows = tableRows.filter(row => 
          !row.every(cell => /^[-|:\s]+$/.test(cell))
        );
        
        if (dataRows.length < 2) return match;
        
        // Create beautiful HTML table
        let htmlTable = '<div class="overflow-x-auto my-6"><table class="w-full border-collapse bg-gray-800/50 rounded-lg overflow-hidden border border-gray-600">';
        
        // Table header
        htmlTable += '<thead><tr class="bg-blue-600/30">';
        dataRows[0].forEach((header, index) => {
          htmlTable += `<th class="px-4 py-3 text-left text-blue-100 font-semibold border-b border-blue-500/50">${header}</th>`;
        });
        htmlTable += '</tr></thead>';
        
        // Table body
        htmlTable += '<tbody>';
        dataRows.slice(1).forEach((row, rowIndex) => {
          const rowClass = rowIndex % 2 === 0 ? 'bg-gray-700/30' : 'bg-gray-800/30';
          htmlTable += `<tr class="${rowClass} hover:bg-gray-600/30 transition-colors">`;
          row.forEach((cell, cellIndex) => {
            // Check if cell contains price or special formatting
            let cellContent = cell;
            let cellClass = 'px-4 py-3 text-gray-200 border-b border-gray-600/30';
            
            // Highlight prices
            if (/\$[\d,]+/.test(cell)) {
              cellContent = cell.replace(/(\$[\d,]+)/g, '<span class="text-green-400 font-semibold">$1</span>');
              cellClass += ' text-center';
            }
            // Highlight data amounts
            else if (/\d+GB|\d+MB/.test(cell)) {
              cellContent = cell.replace(/(\d+GB|\d+MB)/g, '<span class="text-blue-400 font-medium">$1</span>');
              cellClass += ' text-center';
            }
            // Center align other cells
            else {
              cellClass += ' text-center';
            }
            
            htmlTable += `<td class="${cellClass}">${cellContent}</td>`;
          });
          htmlTable += '</tr>';
        });
        htmlTable += '</tbody></table></div>';
        
        return htmlTable;
      })
      
      // Convert bullet points
      .replace(/^- (.*$)/gim, '<div class="flex items-start space-x-3 mb-2"><div class="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div><span class="text-gray-300">$1</span></div>')
      
      // Convert numbered lists
      .replace(/^(\d+)\. (.*$)/gim, '<div class="flex items-start space-x-3 mb-2"><div class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">$1</div><span class="text-gray-300">$2</span></div>')
      
      // Convert line breaks to proper spacing
      .replace(/\n\n/g, '</div><div class="mb-4">')
      .replace(/\n/g, '<br>')
      
      // Wrap in container
      .replace(/^(.*)$/s, '<div class="space-y-4">$1</div>');
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setResults(null);
    setError(null);
    setLoading(false);
  };

  const handleAISearch = async () => {
    if (!destination.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const suggestions = await travelService.getIntelligentTravelSuggestions(destination, preferences);
      setResults(suggestions);
    } catch (err) {
      setError('Failed to get travel suggestions. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSIMSearch = async () => {
    if (!simSearch.destination.trim() || !simSearch.startDate.trim() || !simSearch.endDate.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const simInfo = await travelService.getSIMInformation(simSearch.destination, simSearch.duration);
      setResults(simInfo);
    } catch (err) {
      setError('Failed to get SIM information. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVisaSearch = async () => {
    if (!visaSearch.destination.trim() || !visaSearch.purpose.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const visaInfo = await travelService.getVisaInformation(visaSearch.destination, visaSearch.purpose);
      setResults(visaInfo);
    } catch (err) {
      setError('Failed to get visa information. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleItinerarySearch = async () => {
    if (!itinerarySearch.destination.trim() || !itinerarySearch.duration.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const itinerary = await travelService.getInternationalItinerary(itinerarySearch.origin, itinerarySearch.destination, itinerarySearch.duration, itinerarySearch.interests);
      setResults(itinerary);
    } catch (err) {
      setError('Failed to generate itinerary. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleForexSearch = async () => {
    if (!forexSearch.destination.trim() || !forexSearch.amount.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const forexInfo = await travelService.getForexInformation(forexSearch.destination, forexSearch.amount);
      setResults(forexInfo);
    } catch (err) {
      setError('Failed to get forex information. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleZeroForexSearch = async () => {
    if (!zeroForexSearch.destination.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const zeroForexInfo = await travelService.getZeroForexCards(zeroForexSearch.destination);
      setResults(zeroForexInfo);
    } catch (err) {
      setError('Failed to get zero-forex cards information. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRouteSearch = async () => {
    if (!routeSearch.destination.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const routeInfo = await travelService.getRouteInformation(routeSearch.destination, routeSearch.numberOfStops, routeSearch.timePreference, routeSearch.layoverDuration);
      setResults(routeInfo);
    } catch (err) {
      setError('Failed to get route information. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Cleartrip Watermark */}
      <div className="watermark">CLEARTRIP</div>
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl floating-animation"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl floating-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl floating-animation" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 glass-effect border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center pulse-glow">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">JetSetGo Travel</h1>
                <p className="text-gray-400 text-sm flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>Powered by Azure OpenAI & Cleartrip</span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="px-4 py-2 bg-gray-800/50 rounded-xl border border-gray-700">
                <span className="text-sm text-gray-300">CT Hackathon 2025</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="relative z-10 glass-effect border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1">
            {[
              { id: 'ai-assistant', label: 'AI Travel Assistant', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
              { id: 'route', label: 'Route Planning', icon: MapPin, color: 'from-violet-500 to-purple-500' },
              { id: 'sim-info', label: 'SIM Information', icon: Smartphone, color: 'from-blue-500 to-cyan-500' },
              { id: 'visa-info', label: 'Visa Information', icon: FileCheck, color: 'from-green-500 to-emerald-500' },
              { id: 'insurance-info', label: 'Insurance Information', icon: Shield, color: 'from-orange-500 to-red-500' },
              { id: 'itinerary', label: 'International Itinerary', icon: Route, color: 'from-indigo-500 to-purple-500' },
              { id: 'forex', label: 'Forex Exchange', icon: DollarSign, color: 'from-yellow-500 to-orange-500' },
              { id: 'zero-forex', label: 'Zero-Forex Cards', icon: CreditCard, color: 'from-teal-500 to-green-500' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center space-x-3 py-4 px-6 rounded-xl font-medium text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Built by Section - Far Left */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-20">
        <div className="bg-gradient-to-b from-purple-900/90 to-pink-900/90 backdrop-blur-xl border-r border-purple-500/30 p-6 rounded-r-2xl shadow-2xl">
          <div className="text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 pulse-glow">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <h2 className="text-xl font-bold gradient-text mb-2">Built by</h2>
              <h3 className="text-2xl font-bold gradient-text mb-4">SAAMverse</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-orange-500/30 border-2 border-orange-400/50 rounded-xl p-4 shadow-lg">
                <span className="text-orange-200 font-bold text-xl">
                  <span className="text-2xl bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-extrabold">S</span>hikha
                </span>
              </div>
              <div className="bg-pink-500/20 border border-pink-500/30 rounded-xl p-4">
                <span className="text-pink-300 font-bold text-lg">
                  <span className="text-xl bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent font-extrabold">A</span>bhinav
                </span>
              </div>
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
                <span className="text-blue-300 font-bold text-lg">
                  <span className="text-xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-extrabold">A</span>nusha
                </span>
              </div>
              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
                <span className="text-green-300 font-bold text-lg">
                  <span className="text-xl bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-extrabold">M</span>ahima
                </span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-400">The Dream Team</p>
              <p className="text-xs text-gray-500">CT Hackathon 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search Panel */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8 cyber-border">
              {activeTab === 'ai-assistant' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold gradient-text">AI Travel Recommendations</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Destination
                    </label>
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="e.g., Lucknow, Hyderabad"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Preferences (optional)
                    </label>
                    <textarea
                      value={preferences}
                      onChange={(e) => setPreferences(e.target.value)}
                      placeholder="e.g., I love history, prefer budget hotels, vegetarian food"
                      className="input-field"
                      rows="3"
                    />
                  </div>
                  <button
                    onClick={handleAISearch}
                    disabled={loading || !destination.trim()}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Getting Recommendations...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Sparkles className="w-5 h-5" />
                        <span>Get AI Recommendations</span>
                      </div>
                    )}
                  </button>
                </div>
              )}

              {activeTab === 'sim-info' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold gradient-text">SIM Information</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Destination
                    </label>
                    <select
                      value={simSearch.destination}
                      onChange={(e) => setSimSearch({...simSearch, destination: e.target.value})}
                      className="input-field"
                    >
                      <option value="">Select a country</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Japan">Japan</option>
                      <option value="India">India</option>
                      <option value="Australia">Australia</option>
                      {/* Add more countries as needed */}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={simSearch.startDate}
                      onChange={(e) => setSimSearch({...simSearch, startDate: e.target.value})}
                      className="input-field"
                    />
                    <label className="block text-sm font-medium text-gray-300 mb-3 mt-3">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={simSearch.endDate}
                      onChange={(e) => setSimSearch({...simSearch, endDate: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  <button
                    onClick={handleSIMSearch}
                    disabled={loading || !simSearch.destination || !simSearch.startDate || !simSearch.endDate}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Getting SIM Information...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Smartphone className="w-5 h-5" />
                        <span>Get SIM Information</span>
                      </div>
                    )}
                  </button>
                </div>
              )}

              {activeTab === 'visa-info' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <FileCheck className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold gradient-text">Visa Information</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Destination
                    </label>
                    <select
                      value={visaSearch.destination}
                      onChange={(e) => setVisaSearch({...visaSearch, destination: e.target.value})}
                      className="input-field"
                    >
                      <option value="">Select a country</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Japan">Japan</option>
                      <option value="India">India</option>
                      <option value="Australia">Australia</option>
                      {/* Add more countries as needed */}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Purpose of Visit
                    </label>
                    <select
                      value={visaSearch.purpose}
                      onChange={(e) => setVisaSearch({...visaSearch, purpose: e.target.value})}
                      className="input-field"
                    >
                      <option value="">Select purpose</option>
                      <option value="Tourism">Tourism</option>
                      <option value="Business">Business</option>
                      <option value="Study">Study</option>
                      <option value="Work">Work</option>
                      <option value="Family Visit">Family Visit</option>
                    </select>
                  </div>
                  <button
                    onClick={handleVisaSearch}
                    disabled={loading || !visaSearch.destination.trim() || !visaSearch.purpose}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Getting Visa Information...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <FileCheck className="w-5 h-5" />
                        <span>Get Visa Information</span>
                      </div>
                    )}
                  </button>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Route className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold gradient-text">International Itinerary</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Origin Country
                    </label>
                    <select
                      value={itinerarySearch.origin}
                      onChange={(e) => setItinerarySearch({...itinerarySearch, origin: e.target.value})}
                      className="input-field"
                    >
                      <option value="">Select a country</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Japan">Japan</option>
                      <option value="India">India</option>
                      <option value="Australia">Australia</option>
                      {/* Add more countries as needed */}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Destination Country
                    </label>
                    <select
                      value={itinerarySearch.destination}
                      onChange={(e) => setItinerarySearch({...itinerarySearch, destination: e.target.value})}
                      className="input-field"
                    >
                      <option value="">Select a country</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Japan">Japan</option>
                      <option value="India">India</option>
                      <option value="Australia">Australia</option>
                      {/* Add more countries as needed */}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Interests (Optional)
                    </label>
                    <textarea
                      value={itinerarySearch.interests}
                      onChange={(e) => setItinerarySearch({...itinerarySearch, interests: e.target.value})}
                      placeholder="e.g., History, Food, Adventure, Culture, Shopping"
                      className="input-field"
                      rows="3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={itinerarySearch.startDate}
                      onChange={(e) => setItinerarySearch({...itinerarySearch, startDate: e.target.value})}
                      className="input-field"
                    />
                    <label className="block text-sm font-medium text-gray-300 mb-3 mt-3">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={itinerarySearch.endDate}
                      onChange={(e) => setItinerarySearch({...itinerarySearch, endDate: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  <button
                    onClick={handleItinerarySearch}
                    disabled={loading || !itinerarySearch.origin.trim() || !itinerarySearch.destination.trim() || !itinerarySearch.duration.trim()}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Generating Itinerary...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Route className="w-5 h-5" />
                        <span>Generate Itinerary</span>
                      </div>
                    )}
                  </button>
                </div>
              )}

              {activeTab === 'route' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold gradient-text">Route Planning</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Destination
                    </label>
                    <input
                      type="text"
                      value={routeSearch.destination}
                      onChange={(e) => setRouteSearch({...routeSearch, destination: e.target.value})}
                      placeholder="e.g., Paris, Tokyo, New York"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Number of Stops
                    </label>
                    <select
                      value={routeSearch.numberOfStops}
                      onChange={(e) => setRouteSearch({...routeSearch, numberOfStops: parseInt(e.target.value)})}
                      className="input-field"
                    >
                      <option value={0}>0 Stops (Direct)</option>
                      <option value={1}>1 Stop</option>
                      <option value={2}>2 Stops</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Preferred Time
                    </label>
                    <select
                      value={routeSearch.timePreference}
                      onChange={(e) => setRouteSearch({...routeSearch, timePreference: e.target.value})}
                      className="input-field"
                    >
                      <option value="">Select time preference</option>
                      <option value="early-morning">Early Morning (12AM - 8AM)</option>
                      <option value="morning">Morning (8AM - 12PM)</option>
                      <option value="afternoon">Afternoon (12PM - 4PM)</option>
                      <option value="evening">Evening (4PM - 8PM)</option>
                      <option value="night">Night (8PM - 12AM)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Expected Layover Duration
                    </label>
                    <select
                      value={routeSearch.layoverDuration}
                      onChange={(e) => setRouteSearch({...routeSearch, layoverDuration: e.target.value})}
                      className="input-field"
                    >
                      <option value="">Select layover preference</option>
                      <option value="short">Short (1-3 hours)</option>
                      <option value="medium">Medium (3-6 hours)</option>
                      <option value="long">Long (6-12 hours)</option>
                      <option value="overnight">Overnight (12+ hours)</option>
                    </select>
                  </div>
                  <button
                    onClick={handleRouteSearch}
                    disabled={loading || !routeSearch.destination.trim() || !routeSearch.timePreference || !routeSearch.layoverDuration}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Planning Route...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <MapPin className="w-5 h-5" />
                        <span>Plan Route</span>
                      </div>
                    )}
                  </button>
                </div>
              )}

              {activeTab === 'forex' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold gradient-text">Forex Exchange</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Destination
                    </label>
                    <select
                      value={forexSearch.destination}
                      onChange={(e) => setForexSearch({...forexSearch, destination: e.target.value})}
                      className="input-field"
                    >
                      <option value="">Select a country</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Japan">Japan</option>
                      <option value="India">India</option>
                      <option value="Australia">Australia</option>
                      {/* Add more countries as needed */}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Amount to Exchange
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={forexSearch.amount}
                      onChange={(e) => setForexSearch({...forexSearch, amount: e.target.value})}
                      placeholder="e.g., ₹50,000, $1000, €500"
                      className="input-field"
                    />
                  </div>
                  <button
                    onClick={handleForexSearch}
                    disabled={loading || !forexSearch.destination.trim() || !forexSearch.amount.trim()}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Getting Forex Information...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <DollarSign className="w-5 h-5" />
                        <span>Get Forex Information</span>
                      </div>
                    )}
                  </button>
                </div>
              )}

              {activeTab === 'zero-forex' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold gradient-text">Zero-Forex Cards</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Destination
                    </label>
                    <select
                      value={zeroForexSearch.destination}
                      onChange={(e) => setZeroForexSearch({...zeroForexSearch, destination: e.target.value})}
                      className="input-field"
                    >
                      <option value="">Select a country</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Japan">Japan</option>
                      <option value="India">India</option>
                      <option value="Australia">Australia</option>
                      {/* Add more countries as needed */}
                    </select>
                  </div>
                  <button
                    onClick={handleZeroForexSearch}
                    disabled={loading || !zeroForexSearch.destination.trim()}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Getting Zero-Forex Cards...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <CreditCard className="w-5 h-5" />
                        <span>Get Zero-Forex Cards</span>
                      </div>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {error && (
                <div className="card bg-red-900/20 border-red-500/30">
                  <div className="flex items-center space-x-3 text-red-300">
                    <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                      <span className="text-red-400 text-sm">!</span>
                    </div>
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                </div>
              )}

              {loading && (
                <div className="card">
                  <div className="flex items-center justify-center py-12">
                    <div className="relative">
                      <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 w-12 h-12 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin" style={{animationDelay: '0.5s'}}></div>
                    </div>
                    <span className="ml-4 text-gray-300 font-medium">Loading...</span>
                  </div>
                </div>
              )}

              {results && !loading && (
                <div className="space-y-6">
                  {/* AI Recommendations */}
                  {results.recommendations && (
                    <div className="card">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold gradient-text">
                          AI Travel Recommendations for {destination}
                        </h3>
                      </div>
                      <div className="prose prose-invert max-w-none">
                        <pre className="ai-response-box whitespace-pre-wrap text-gray-300 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                          {results.recommendations}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* SIM Information Results */}
                  {results.aiRecommendations && results.simOptions && (
                    <div className="card">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                          <Smartphone className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold gradient-text">SIM Information for {results.simOptions.destination}</h3>
                      </div>
                      
                      {/* AI Recommendations */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-200 mb-3">AI Recommendations</h4>
                        <div className="prose prose-invert max-w-none">
                          <div 
                            className="ai-response-box bg-gray-800/50 p-6 rounded-xl border border-gray-700 text-gray-300 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: formatAIRecommendations(results.aiRecommendations) }}
                            style={{
                              '--tw-prose-headings': 'rgb(209 213 219)',
                              '--tw-prose-links': 'rgb(59 130 246)',
                              '--tw-prose-bold': 'rgb(255 255 255)',
                              '--tw-prose-counters': 'rgb(156 163 175)',
                              '--tw-prose-bullets': 'rgb(156 163 175)',
                              '--tw-prose-hr': 'rgb(75 85 99)',
                              '--tw-prose-quotes': 'rgb(156 163 175)',
                              '--tw-prose-quote-borders': 'rgb(75 85 99)',
                              '--tw-prose-captions': 'rgb(156 163 175)',
                              '--tw-prose-code': 'rgb(255 255 255)',
                              '--tw-prose-pre-code': 'rgb(209 213 219)',
                              '--tw-prose-pre-bg': 'rgb(17 24 39)',
                              '--tw-prose-th-borders': 'rgb(75 85 99)',
                              '--tw-prose-td-borders': 'rgb(55 65 81)'
                            }}
                          />
                        </div>
                      </div>

                      {/* SIM Options */}
                      <div className="space-y-8">
                        <h4 className="text-xl font-semibold text-gray-200 border-b border-gray-600 pb-2">Available SIM Options</h4>
                        
                        {/* Local Carriers */}
                        <div>
                          <h5 className="font-semibold text-blue-300 mb-4 flex items-center">
                            <div className="w-5 h-5 bg-blue-500 rounded-full mr-3"></div>
                            Local Carriers
                          </h5>
                          <div className="space-y-4">
                            {results.simOptions.localCarriers && results.simOptions.localCarriers.length > 0 ? (
                              results.simOptions.localCarriers.map((carrier, index) => (
                                <div key={index} className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 hover:bg-blue-900/30 transition-all duration-300">
                                  <div className="flex justify-between items-start mb-4">
                                    <div>
                                      <h6 className="font-semibold text-blue-200 text-lg mb-2">{carrier.name}</h6>
                                      <div className="space-y-2 text-sm">
                                        <p className="text-blue-300 flex items-center">
                                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                          Coverage: {carrier.coverage}
                                        </p>
                                        <p className="text-blue-300 flex items-center">
                                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                          Network Quality: {carrier.networkQuality}
                                        </p>
                                        <p className="text-blue-300 flex items-center">
                                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                          Customer Support: {carrier.customerSupport}
                                        </p>
                                        <p className="text-blue-300 flex items-center">
                                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                          Activation: {carrier.activationTime}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="bg-blue-500/20 text-blue-200 px-4 py-2 rounded-lg border border-blue-500/30">
                                        <span className="text-sm font-medium">Price Range</span>
                                        <div className="text-lg font-bold">{carrier.price}</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-4">
                                    <p className="text-blue-300 text-sm font-medium mb-3">Data Plans:</p>
                                    <div className="flex flex-wrap gap-3">
                                      {carrier.dataPlans && carrier.dataPlans.map((plan, idx) => (
                                        <span key={idx} className="text-sm bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full border border-blue-500/30 hover:bg-blue-500/30 transition-colors">
                                          {plan}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-400 text-sm">No local carrier information available</p>
                            )}
                          </div>
                        </div>

                        {/* International SIMs */}
                        <div>
                          <h5 className="font-semibold text-green-300 mb-4 flex items-center">
                            <div className="w-5 h-5 bg-green-500 rounded-full mr-3"></div>
                            International SIMs
                          </h5>
                          <div className="space-y-4">
                            {results.simOptions.internationalSIMs && results.simOptions.internationalSIMs.length > 0 ? (
                              results.simOptions.internationalSIMs.map((sim, index) => (
                                <div key={index} className="bg-green-900/20 border border-green-500/30 rounded-xl p-6 hover:bg-green-900/30 transition-all duration-300">
                                  <div className="flex justify-between items-start mb-4">
                                    <div>
                                      <h6 className="font-semibold text-green-200 text-lg mb-2">{sim.name}</h6>
                                      <div className="space-y-2 text-sm">
                                        <p className="text-green-300 flex items-center">
                                          <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                          Coverage: {sim.coverage}
                                        </p>
                                        <p className="text-green-300 flex items-center">
                                          <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                          Validity: {sim.validity}
                                        </p>
                                        <p className="text-green-300 flex items-center">
                                          <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                          Activation: {sim.activationProcess}
                                        </p>
                                        <p className="text-green-300 flex items-center">
                                          <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                          Support: {sim.customerSupport}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="bg-green-500/20 text-green-200 px-4 py-2 rounded-lg border border-green-500/30">
                                        <span className="text-sm font-medium">Price Range</span>
                                        <div className="text-lg font-bold">{sim.price}</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-4">
                                    <p className="text-green-300 text-sm font-medium mb-3">Data Plans:</p>
                                    <div className="flex flex-wrap gap-3">
                                      {sim.dataPlans && sim.dataPlans.map((plan, idx) => (
                                        <span key={idx} className="text-sm bg-green-500/20 text-green-300 px-4 py-2 rounded-full border border-green-500/30 hover:bg-green-500/30 transition-colors">
                                          {plan}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-400 text-sm">No international SIM information available</p>
                            )}
                          </div>
                        </div>

                        {/* eSIMs */}
                        <div>
                          <h5 className="font-semibold text-purple-300 mb-4 flex items-center">
                            <div className="w-5 h-5 bg-purple-500 rounded-full mr-3"></div>
                            eSIM Options
                          </h5>
                          <div className="space-y-4">
                            {results.simOptions.eSIMs && results.simOptions.eSIMs.length > 0 ? (
                              results.simOptions.eSIMs.map((esim, index) => (
                                <div key={index} className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6 hover:bg-purple-900/30 transition-all duration-300">
                                  <div className="flex justify-between items-start mb-4">
                                    <div>
                                      <h6 className="font-semibold text-purple-200 text-lg mb-2">{esim.name}</h6>
                                      <div className="space-y-2 text-sm">
                                        <p className="text-purple-300 flex items-center">
                                          <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                                          Coverage: {esim.coverage}
                                        </p>
                                        <p className="text-purple-300 flex items-center">
                                          <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                                          Compatibility: {esim.compatibility}
                                        </p>
                                        <p className="text-purple-300 flex items-center">
                                          <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                                          Activation: {esim.activationTime}
                                        </p>
                                        <p className="text-purple-300 flex items-center">
                                          <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                                          Validity: {esim.validity}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="bg-purple-500/20 text-purple-200 px-4 py-2 rounded-lg border border-purple-500/30">
                                        <span className="text-sm font-medium">Price Range</span>
                                        <div className="text-lg font-bold">{esim.price}</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-4">
                                    <p className="text-purple-300 text-sm font-medium mb-3">Data Plans:</p>
                                    <div className="flex flex-wrap gap-3">
                                      {esim.dataPlans && esim.dataPlans.map((plan, idx) => (
                                        <span key={idx} className="text-sm bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full border border-purple-500/30 hover:bg-purple-500/30 transition-colors">
                                          {plan}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-400 text-sm">No eSIM information available</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Visa Information Results */}
                  {results.aiRecommendations && results.visaRequirements && (
                    <div className="card">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                          <FileCheck className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold gradient-text">Visa Information for {results.visaRequirements.data.destination}</h3>
                      </div>
                      
                      {/* AI Recommendations */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-200 mb-3">AI Recommendations</h4>
                        <div className="prose prose-invert max-w-none">
                          <pre className="ai-response-box whitespace-pre-wrap text-gray-300 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                            {results.aiRecommendations}
                          </pre>
                        </div>
                      </div>

                      {/* Visa Requirements */}
                      <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-gray-200">Visa Requirements</h4>
                        
                        <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h5 className="font-semibold text-green-200 mb-3">Visa Types</h5>
                              <div className="space-y-3">
                                {results.visaRequirements.data.visaTypes.map((visa, index) => (
                                  <div key={index} className="bg-green-800/30 border border-green-600/30 rounded-lg p-3">
                                    <h6 className="font-semibold text-green-200">{visa.type}</h6>
                                    <p className="text-green-300 text-sm">Validity: {visa.validity}</p>
                                    <p className="text-green-300 text-sm">Processing: {visa.processingTime}</p>
                                    <p className="text-green-300 text-sm">Fee: {visa.fee}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="font-semibold text-green-200 mb-3">Required Documents</h5>
                              <div className="space-y-2">
                                {results.visaRequirements.data.requiredDocuments.map((doc, index) => (
                                  <div key={index} className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span className="text-green-300 text-sm">{doc}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-6">
                            <h5 className="font-semibold text-green-200 mb-3">Application Process</h5>
                            <div className="space-y-2">
                              {results.visaRequirements.data.applicationProcess.map((step, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                    {index + 1}
                                  </div>
                                  <span className="text-green-300 text-sm">{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* International Itinerary Results */}
                  {results.itinerary && (
                    <div className="card">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Route className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold gradient-text">
                          {results.duration} Itinerary for {results.destination}
                        </h3>
                      </div>
                      
                      <div className="prose prose-invert max-w-none">
                        <pre className="ai-response-box whitespace-pre-wrap text-gray-300 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                          {results.itinerary}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Route Planning Results */}
                  {results.routeInfo && (
                    <div className="card">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold gradient-text">
                          Route Planning for {results.destination}
                        </h3>
                      </div>
                      
                      <div className="space-y-6">
                        {/* Route Summary */}
                        <div className="bg-violet-900/20 border border-violet-500/30 rounded-xl p-6">
                          <h4 className="text-lg font-semibold text-violet-200 mb-4">Route Summary</h4>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="text-center">
                              <p className="text-violet-300 text-sm">Destination</p>
                              <p className="text-violet-200 font-semibold">{results.destination}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-violet-300 text-sm">Stops</p>
                              <p className="text-violet-200 font-semibold">{results.numberOfStops} {results.numberOfStops === 1 ? 'Stop' : 'Stops'}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-violet-300 text-sm">Preferred Time</p>
                              <p className="text-violet-200 font-semibold">{results.timePreference}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-violet-300 text-sm">Layover Duration</p>
                              <p className="text-violet-200 font-semibold">{results.layoverDuration}</p>
                            </div>
                          </div>
                        </div>

                        {/* AI Recommendations */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-200 mb-3">AI Route Recommendations</h4>
                          <div className="prose prose-invert max-w-none">
                            <pre className="ai-response-box whitespace-pre-wrap text-gray-300 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                              {results.aiRecommendations}
                            </pre>
                          </div>
                        </div>

                        {/* Route Options */}
                        {results.routeOptions && (
                          <div>
                            <h4 className="text-lg font-semibold text-gray-200 mb-3">Available Routes</h4>
                            <div className="space-y-4">
                              {results.routeOptions.map((route, index) => (
                                <div key={index} className="bg-violet-900/20 border border-violet-500/30 rounded-xl p-6 hover:bg-violet-900/30 transition-all duration-300">
                                  <div className="flex justify-between items-start mb-4">
                                    <div>
                                      <h5 className="font-semibold text-violet-200 text-lg">Route {index + 1}</h5>
                                      <p className="text-violet-300 text-sm">{route.airline}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-violet-400 font-bold text-lg">{route.price}</p>
                                      <p className="text-violet-300 text-sm">{route.duration}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <div className="text-center">
                                        <p className="text-violet-300 text-sm">Departure</p>
                                        <p className="text-violet-200 font-semibold">{route.departure}</p>
                                      </div>
                                      <div className="flex-1 mx-4">
                                        <div className="border-t border-violet-600 relative">
                                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <div className="w-3 h-3 bg-violet-400 rounded-full"></div>
                                          </div>
                                        </div>
                                        <p className="text-center text-sm text-violet-300 mt-2">{route.stops} {route.stops === 1 ? 'Stop' : 'Stops'}</p>
                                      </div>
                                      <div className="text-center">
                                        <p className="text-violet-300 text-sm">Arrival</p>
                                        <p className="text-violet-200 font-semibold">{route.arrival}</p>
                                      </div>
                                    </div>
                                    
                                    {route.stops > 0 && route.stopDetails && (
                                      <div className="mt-4">
                                        <p className="text-violet-300 text-sm font-medium mb-2">Stop Details:</p>
                                        <div className="space-y-2">
                                          {route.stopDetails.map((stop, stopIndex) => (
                                            <div key={stopIndex} className="bg-violet-800/30 border border-violet-600/30 rounded-lg p-3">
                                              <p className="text-violet-200 text-sm">
                                                <span className="font-medium">{stop.airport}</span> - {stop.duration} layover
                                              </p>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <button className="w-full mt-4 bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                                    Select Route
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Forex Information Results */}
                  {results.aiRecommendations && results.destination && (
                    <div className="card">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold gradient-text">Forex Information for {results.destination}</h3>
                      </div>
                      
                      {/* AI Recommendations */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-200 mb-3">AI Recommendations</h4>
                        <div className="prose prose-invert max-w-none">
                          <pre className="ai-response-box whitespace-pre-wrap text-gray-300 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                            {results.aiRecommendations}
                          </pre>
                        </div>
                      </div>

                      {/* Exchange Details */}
                      <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-gray-200">Exchange Details</h4>
                        
                        {/* Exchange Rate Summary */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 text-center">
                            <h5 className="font-semibold text-yellow-200 text-lg">Source Amount</h5>
                            <p className="text-yellow-400 text-2xl font-bold">₹{results.sourceAmount?.toLocaleString()}</p>
                            <p className="text-yellow-300 text-sm">{results.sourceCurrency}</p>
                          </div>
                          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 text-center">
                            <h5 className="font-semibold text-yellow-200 text-lg">Converted Amount</h5>
                            <p className="text-yellow-400 text-2xl font-bold">{results.convertedAmount?.toLocaleString()}</p>
                            <p className="text-yellow-300 text-sm">{results.destinationCurrency}</p>
                          </div>
                          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 text-center">
                            <h5 className="font-semibold text-yellow-200 text-lg">Exchange Rate</h5>
                            <p className="text-yellow-400 text-2xl font-bold">{results.exchangeRate}</p>
                            <p className="text-yellow-300 text-sm">1 {results.sourceCurrency} = {results.exchangeRate} {results.destinationCurrency}</p>
                          </div>
                          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 text-center">
                            <h5 className="font-semibold text-yellow-200 text-lg">Last Updated</h5>
                            <p className="text-yellow-400 text-lg font-bold">{results.lastUpdated}</p>
                            <p className="text-yellow-300 text-sm">Real-time data</p>
                          </div>
                        </div>

                        {/* Exchange Tips */}
                        {results.exchangeTips && results.exchangeTips.length > 0 && (
                          <div>
                            <h5 className="font-semibold text-yellow-200 mb-3">Exchange Tips</h5>
                            <div className="space-y-3">
                              {results.exchangeTips.map((tip, index) => (
                                <div key={index} className="bg-yellow-800/30 border border-yellow-600/30 rounded-lg p-4">
                                  <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                      {index + 1}
                                    </div>
                                    <div>
                                      <h6 className="font-semibold text-yellow-200">{tip.title}</h6>
                                      <p className="text-yellow-300 text-sm mt-1">{tip.description}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Exchange Websites */}
                        {results.exchangeWebsites && results.exchangeWebsites.length > 0 && (
                          <div>
                            <h5 className="font-semibold text-yellow-200 mb-3">Recommended Exchange Websites</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {results.exchangeWebsites.map((website, index) => (
                                <div key={index} className="bg-yellow-800/30 border border-yellow-600/30 rounded-lg p-4">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <h6 className="font-semibold text-yellow-200">{website.name}</h6>
                                      <p className="text-yellow-300 text-sm">{website.description}</p>
                                    </div>
                                    <a 
                                      href={website.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                                    >
                                      Visit
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Exchange Info */}
                        {results.exchangeInfo && (
                          <div>
                            <h5 className="font-semibold text-yellow-200 mb-3">Additional Information</h5>
                            <div className="bg-yellow-800/30 border border-yellow-600/30 rounded-lg p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(results.exchangeInfo).map(([key, value]) => (
                                  <div key={key}>
                                    <p className="text-yellow-300 text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</p>
                                    <p className="text-yellow-200">{value}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Zero Forex Cards Results */}
                  {results.aiRecommendations && results.cards && (
                    <div className="card">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-green-500 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold gradient-text">Zero-Forex Cards for {results.destination || 'your destination'}</h3>
                      </div>
                      
                      {/* AI Recommendations */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-200 mb-3">AI Recommendations</h4>
                        <div className="prose prose-invert max-w-none">
                          <pre className="ai-response-box whitespace-pre-wrap text-gray-300 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                            {results.aiRecommendations}
                          </pre>
                        </div>
                      </div>

                      {/* Credit Cards */}
                      <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-gray-200">Available Zero-Forex Cards</h4>
                        
                        <div className="space-y-4">
                          {results.cards.cards && results.cards.cards.map((card, index) => (
                            <div key={index} className="bg-teal-900/20 border border-teal-500/30 rounded-xl p-6 hover:bg-teal-900/30 transition-all duration-300">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h5 className="font-semibold text-teal-200 text-lg">{card.name}</h5>
                                  <p className="text-teal-300 text-sm">Annual Fee: {card.annualFee}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-teal-400 font-bold text-lg">{card.forexMarkup}</p>
                                  <p className="text-teal-300 text-sm">Forex Markup</p>
                                </div>
                              </div>
                              
                              <div className="space-y-3">
                                <div>
                                  <p className="text-teal-300 text-sm font-medium">Features:</p>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {card.features.map((feature, idx) => (
                                      <span key={idx} className="text-xs bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full border border-teal-500/30">
                                        {feature}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="text-teal-300">Acceptance: <span className="text-teal-200">{card.acceptance}</span></p>
                                  </div>
                                  <div>
                                    <p className="text-teal-300">Application: <span className="text-teal-200">{card.applicationProcess}</span></p>
                                  </div>
                                </div>
                              </div>
                              
                              <button className="w-full mt-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                                Apply Now
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!results && !loading && !error && (
                <div className="card">
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 floating-animation">
                      <Search className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold gradient-text mb-3">
                      Ready to explore?
                    </h3>
                    <p className="text-gray-400 text-lg">
                      Use the search panel on the left to get travel information, SIM details, visa requirements, itineraries, forex rates, and zero-forex credit cards.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App; 