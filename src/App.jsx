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
    nationality: '',
    purpose: ''
  });

  // Insurance Information State
  const [insuranceSearch, setInsuranceSearch] = useState({
    destination: '',
    tripType: '',
    duration: '',
    startDate: '',
    endDate: ''
  });

  // International Itinerary State
  const [itinerarySearch, setItinerarySearch] = useState({
    destination: '',
    duration: '',
    interests: ''
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
    if (!visaSearch.destination.trim() || !visaSearch.nationality.trim() || !visaSearch.purpose.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const visaInfo = await travelService.getVisaInformation(visaSearch.destination, visaSearch.nationality, visaSearch.purpose);
      setResults(visaInfo);
    } catch (err) {
      setError('Failed to get visa information. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInsuranceSearch = async () => {
    if (!insuranceSearch.destination.trim() || !insuranceSearch.tripType.trim() || !insuranceSearch.duration.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const insuranceInfo = await travelService.getInsuranceInformation(insuranceSearch.destination, insuranceSearch.tripType, insuranceSearch.duration);
      setResults(insuranceInfo);
    } catch (err) {
      setError('Failed to get insurance information. Please try again.');
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
      const itinerary = await travelService.getInternationalItinerary(itinerarySearch.destination, itinerarySearch.duration, itinerarySearch.interests);
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
                      Nationality
                    </label>
                    <select
                      value={visaSearch.nationality}
                      onChange={(e) => setVisaSearch({...visaSearch, nationality: e.target.value})}
                      className="input-field"
                    >
                      <option value="">Select nationality</option>
                      <option value="Indian">Indian</option>
                      <option value="American">American</option>
                      <option value="British">British</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Australian">Australian</option>
                      {/* Add more nationalities as needed */}
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
                    disabled={loading || !visaSearch.destination.trim() || !visaSearch.nationality.trim() || !visaSearch.purpose}
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

              {activeTab === 'insurance-info' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold gradient-text">Insurance Information</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Destination
                    </label>
                    <select
                      value={insuranceSearch.destination}
                      onChange={(e) => setInsuranceSearch({...insuranceSearch, destination: e.target.value})}
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
                      Trip Type
                    </label>
                    <select
                      value={insuranceSearch.tripType}
                      onChange={(e) => setInsuranceSearch({...insuranceSearch, tripType: e.target.value})}
                      className="input-field"
                    >
                      <option value="">Select trip type</option>
                      <option value="Leisure">Leisure</option>
                      <option value="Business">Business</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Family">Family</option>
                      <option value="Solo">Solo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={insuranceSearch.startDate}
                      onChange={(e) => setInsuranceSearch({...insuranceSearch, startDate: e.target.value})}
                      className="input-field"
                    />
                    <label className="block text-sm font-medium text-gray-300 mb-3 mt-3">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={insuranceSearch.endDate}
                      onChange={(e) => setInsuranceSearch({...insuranceSearch, endDate: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  <button
                    onClick={handleInsuranceSearch}
                    disabled={loading || !insuranceSearch.destination.trim() || !insuranceSearch.tripType || !insuranceSearch.duration.trim()}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Getting Insurance Information...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Shield className="w-5 h-5" />
                        <span>Get Insurance Information</span>
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
                      Destination
                    </label>
                    <input
                      type="text"
                      value={itinerarySearch.destination}
                      onChange={(e) => setItinerarySearch({...itinerarySearch, destination: e.target.value})}
                      placeholder="e.g., Paris, Tokyo, New York"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Trip Duration
                    </label>
                    <input
                      type="text"
                      value={itinerarySearch.duration}
                      onChange={(e) => setItinerarySearch({...itinerarySearch, duration: e.target.value})}
                      placeholder="e.g., 5 days, 1 week, 10 days"
                      className="input-field"
                    />
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
                  <button
                    onClick={handleItinerarySearch}
                    disabled={loading || !itinerarySearch.destination.trim() || !itinerarySearch.duration.trim()}
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
                    <input
                      type="text"
                      value={forexSearch.destination}
                      onChange={(e) => setForexSearch({...forexSearch, destination: e.target.value})}
                      placeholder="e.g., USA, UK, Japan, Australia"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Amount to Exchange
                    </label>
                    <input
                      type="text"
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
                    <input
                      type="text"
                      value={zeroForexSearch.destination}
                      onChange={(e) => setZeroForexSearch({...zeroForexSearch, destination: e.target.value})}
                      placeholder="e.g., USA, Europe, Asia, Worldwide"
                      className="input-field"
                    />
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
                        <h3 className="text-xl font-bold gradient-text">SIM Information for {results.simOptions.data.destination}</h3>
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

                      {/* SIM Options */}
                      <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-gray-200">Available SIM Options</h4>
                        
                        {/* Local Carriers */}
                        <div>
                          <h5 className="font-semibold text-blue-300 mb-3">Local Carriers</h5>
                          <div className="space-y-4">
                            {results.simOptions.data.localCarriers.map((carrier, index) => (
                              <div key={index} className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h6 className="font-semibold text-blue-200">{carrier.name}</h6>
                                    <p className="text-blue-300 text-sm">Coverage: {carrier.coverage}</p>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <p className="text-blue-300 text-sm font-medium">Data Plans:</p>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {carrier.dataPlans.map((plan, idx) => (
                                      <span key={idx} className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-500/30">
                                        {plan}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* International SIMs */}
                        <div>
                          <h5 className="font-semibold text-green-300 mb-3">International SIMs</h5>
                          <div className="space-y-4">
                            {results.simOptions.data.internationalSIMs.map((sim, index) => (
                              <div key={index} className="bg-green-900/20 border border-green-500/30 rounded-xl p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h6 className="font-semibold text-green-200">{sim.name}</h6>
                                    <p className="text-green-300 text-sm">Coverage: {sim.coverage}</p>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <p className="text-green-300 text-sm font-medium">Data Plans:</p>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {sim.dataPlans.map((plan, idx) => (
                                      <span key={idx} className="text-xs bg-green-500/20 text-green-300 px-3 py-1 rounded-full border border-green-500/30">
                                        {plan}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* eSIMs */}
                        <div>
                          <h5 className="font-semibold text-purple-300 mb-3">eSIM Options</h5>
                          <div className="space-y-4">
                            {results.simOptions.data.eSIMs.map((esim, index) => (
                              <div key={index} className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h6 className="font-semibold text-purple-200">{esim.name}</h6>
                                    <p className="text-purple-300 text-sm">Coverage: {esim.coverage}</p>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <p className="text-purple-300 text-sm font-medium">Data Plans:</p>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {esim.dataPlans.map((plan, idx) => (
                                      <span key={idx} className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30">
                                        {plan}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
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

                  {/* Insurance Information Results */}
                  {results.aiRecommendations && results.insurancePlans && (
                    <div className="card">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                          <Shield className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold gradient-text">Insurance Information for {results.insurancePlans.data.destination}</h3>
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

                      {/* Insurance Plans */}
                      <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-gray-200">Available Insurance Plans</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {results.insurancePlans.data.plans.map((plan, index) => (
                            <div key={index} className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-6 hover:bg-orange-900/30 transition-all duration-300">
                              <div className="text-center mb-4">
                                <h5 className="font-semibold text-orange-200 text-lg">{plan.name}</h5>
                                <p className="text-orange-400 text-2xl font-bold">{plan.premium}</p>
                                <p className="text-orange-300 text-sm">Coverage: {plan.coverageAmount}</p>
                              </div>
                              
                              <div className="space-y-2">
                                <p className="text-orange-300 text-sm font-medium">Coverage Includes:</p>
                                {plan.coverage.map((item, idx) => (
                                  <div key={idx} className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                    <span className="text-orange-300 text-sm">{item}</span>
                                  </div>
                                ))}
                              </div>
                              
                              <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                                Get Quote
                              </button>
                            </div>
                          ))}
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

                  {/* Forex Information Results */}
                  {results.aiRecommendations && results.exchangeRates && (
                    <div className="card">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold gradient-text">Forex Information for {results.exchangeRates.data.destination}</h3>
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

                      {/* Exchange Rates */}
                      <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-gray-200">Current Exchange Rates</h4>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {Object.entries(results.exchangeRates.data.rates).map(([currency, data]) => (
                            <div key={currency} className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 text-center">
                              <h5 className="font-semibold text-yellow-200 text-lg">{currency}</h5>
                              <p className="text-yellow-400 text-2xl font-bold">{data.rate}</p>
                              <div className={`text-sm ${data.trend === 'up' ? 'text-green-400' : data.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
                                {data.change}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Exchange Options */}
                        <div>
                          <h5 className="font-semibold text-yellow-200 mb-3">Exchange Options</h5>
                          <div className="space-y-3">
                            {results.exchangeRates.data.exchangeOptions.map((option, index) => (
                              <div key={index} className="bg-yellow-800/30 border border-yellow-600/30 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h6 className="font-semibold text-yellow-200">{option.type}</h6>
                                    <p className="text-yellow-300 text-sm">Rate: {option.rate}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-yellow-400 font-semibold">Fee: {option.fee}</p>
                                    <p className="text-yellow-300 text-sm">Convenience: {option.convenience}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
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
                        <h3 className="text-xl font-bold gradient-text">Zero-Forex Cards for {results.cards.data.destination}</h3>
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
                          {results.cards.data.cards.map((card, index) => (
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
                      Use the search panel on the left to get travel information, SIM details, visa requirements, insurance plans, itineraries, forex rates, and zero-forex credit cards.
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