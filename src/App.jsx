import React, { useState } from 'react';
import { Search, Plane, Hotel, MapPin, Sparkles, MessageCircle, Zap, Globe, Star, Image, Video, FileText, Palette, Play, Video as VideoIcon } from 'lucide-react';
import { travelService } from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('ai-assistant');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // AI Assistant State
  const [destination, setDestination] = useState('');
  const [preferences, setPreferences] = useState('');
  const [chatQuery, setChatQuery] = useState('');

  // Hotel Search State
  const [hotelSearch, setHotelSearch] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    rooms: 1,
    adults: 1
  });

  // Flight Search State
  const [flightSearch, setFlightSearch] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
    cabinClass: 'Economy'
  });

  // Content Creator State
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [contentType, setContentType] = useState('blog');
  const [contentPrompt, setContentPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState(null);

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

  const handleNaturalLanguageSearch = async () => {
    if (!chatQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const searchResults = await travelService.naturalLanguageSearch(chatQuery);
      setResults(searchResults);
    } catch (err) {
      setError('Failed to process your query. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleHotelSearch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const availableLocations = travelService.hotels.getAvailableLocations();
      const location = availableLocations.find(loc => 
        loc.name.toLowerCase().includes(hotelSearch.location.toLowerCase())
      );
      
      if (!location) {
        setError('Location not available. Try Lucknow or Hyderabad.');
        setLoading(false);
        return;
      }
      
      const hotelResults = await travelService.hotels.searchHotels({
        locationId: location.id,
        checkIn: hotelSearch.checkIn,
        checkOut: hotelSearch.checkOut,
        rooms: hotelSearch.rooms,
        adults: hotelSearch.adults
      });
      
      setResults({ hotels: hotelResults });
    } catch (err) {
      setError('Failed to search hotels. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFlightSearch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const flightResults = await travelService.flights.searchFlights(flightSearch);
      setResults({ flights: flightResults });
    } catch (err) {
      setError('Failed to search flights. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Content Creator Functions
  const handleImageUpload = (event) => {
    console.log('File upload triggered');
    console.log('Files selected:', event.target.files);
    
    const files = Array.from(event.target.files);
    console.log('Files array:', files);
    
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    console.log('Image files:', imageFiles);
    
    if (imageFiles.length === 0) {
      setError('Please select valid image files (JPG, PNG, GIF, etc.).');
      console.log('No valid image files found');
      return;
    }

    // Check file size (10MB limit)
    const validFiles = imageFiles.filter(file => file.size <= 10 * 1024 * 1024);
    if (validFiles.length !== imageFiles.length) {
      setError('Some files were too large. Maximum size is 10MB per image.');
    }

    const newImages = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    }));

    console.log('New images to add:', newImages);
    setUploadedImages(prev => [...prev, ...newImages]);
    setError(null);
    
    // Clear the input value to allow re-uploading the same file
    event.target.value = '';
  };

  const openFilePicker = () => {
    const fileInput = document.getElementById('image-upload');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add('border-purple-500', 'bg-purple-500/10');
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove('border-purple-500', 'bg-purple-500/10');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove('border-purple-500', 'bg-purple-500/10');
    
    const files = Array.from(event.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      setError('Please drop valid image files (JPG, PNG, GIF, etc.).');
      return;
    }

    // Check file size (10MB limit)
    const validFiles = imageFiles.filter(file => file.size <= 10 * 1024 * 1024);
    if (validFiles.length !== imageFiles.length) {
      setError('Some files were too large. Maximum size is 10MB per image.');
    }

    const newImages = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    }));

    setUploadedImages(prev => [...prev, ...newImages]);
    setError(null);
  };

  const handleImageSelect = (imageId) => {
    setSelectedImages(prev => {
      if (prev.includes(imageId)) {
        return prev.filter(id => id !== imageId);
      } else {
        return [...prev, imageId];
      }
    });
  };

  const handleContentGeneration = async () => {
    console.log('🎯 handleContentGeneration called!');
    console.log('Selected images:', selectedImages);
    console.log('Content type:', contentType);
    console.log('Content prompt:', contentPrompt);
    
    if (selectedImages.length < 2) {
      console.log('❌ Not enough images selected');
      setError('Please select at least 2 images for content generation.');
      return;
    }

    console.log('✅ Starting content generation...');
    setLoading(true);
    setError(null);

    try {
      const selectedImageData = uploadedImages.filter(img => selectedImages.includes(img.id));
      const imageNames = selectedImageData.map(img => img.name).join(', ');
      
      console.log('Selected image data:', selectedImageData);
      console.log('Image names:', imageNames);
      
      let prompt = '';
      switch (contentType) {
        case 'blog':
          prompt = `Create a travel blog post based on these images: ${imageNames}. ${contentPrompt ? `Additional context: ${contentPrompt}` : ''} Include a compelling title, introduction, detailed descriptions, travel tips, and a conclusion.`;
          break;
        case 'video-script':
          prompt = `Create a video script for a travel vlog based on these images: ${imageNames}. ${contentPrompt ? `Additional context: ${contentPrompt}` : ''} Include an engaging intro, scene descriptions, narration script, and call-to-action.`;
          break;
        case 'collage':
          prompt = `Create a creative collage concept and layout description based on these images: ${imageNames}. ${contentPrompt ? `Additional context: ${contentPrompt}` : ''} Describe the arrangement, theme, and visual story.`;
          break;
        case 'video':
          prompt = `Create a video concept and storyboard based on these images: ${imageNames}. ${contentPrompt ? `Additional context: ${contentPrompt}` : ''} Include scene transitions, music suggestions, and visual effects.`;
          break;
      }

      console.log('Generated prompt:', prompt);
      console.log('Calling OpenAI API...');

      const aiResponse = await travelService.openAI.chatCompletion([
        {
          role: 'system',
          content: 'You are a creative travel content creator. Generate engaging, detailed content based on travel images provided by users.'
        },
        {
          role: 'user',
          content: prompt
        }
      ]);

      console.log('✅ AI Response received:', aiResponse);

      setGeneratedContent({
        type: contentType,
        content: aiResponse,
        images: selectedImageData
      });
      
      console.log('✅ Generated content set successfully');
    } catch (err) {
      console.error('❌ Error in content generation:', err);
      setError('Failed to generate content. Please try again.');
    } finally {
      setLoading(false);
      console.log('🏁 Content generation completed');
    }
  };

  const removeImage = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
    setSelectedImages(prev => prev.filter(id => id !== imageId));
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
              { id: 'hotels', label: 'Hotels', icon: Hotel, color: 'from-blue-500 to-cyan-500' },
              { id: 'flights', label: 'Flights', icon: Plane, color: 'from-green-500 to-emerald-500' },
              { id: 'chat', label: 'Natural Language Search', icon: MessageCircle, color: 'from-orange-500 to-red-500' },
              { id: 'content-creator', label: 'Content Creator', icon: Image, color: 'from-indigo-500 to-purple-500' }
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

              {activeTab === 'hotels' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Hotel className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold gradient-text">Hotel Search</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Location
                    </label>
                    <input
                      type="text"
                      value={hotelSearch.location}
                      onChange={(e) => setHotelSearch({...hotelSearch, location: e.target.value})}
                      placeholder="Lucknow or Hyderabad"
                      className="input-field"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Check-in
                      </label>
                      <input
                        type="date"
                        value={hotelSearch.checkIn}
                        onChange={(e) => setHotelSearch({...hotelSearch, checkIn: e.target.value})}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Check-out
                      </label>
                      <input
                        type="date"
                        value={hotelSearch.checkOut}
                        onChange={(e) => setHotelSearch({...hotelSearch, checkOut: e.target.value})}
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Rooms
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={hotelSearch.rooms}
                        onChange={(e) => setHotelSearch({...hotelSearch, rooms: parseInt(e.target.value)})}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Adults
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={hotelSearch.adults}
                        onChange={(e) => setHotelSearch({...hotelSearch, adults: parseInt(e.target.value)})}
                        className="input-field"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleHotelSearch}
                    disabled={loading}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Searching Hotels...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Hotel className="w-5 h-5" />
                        <span>Search Hotels</span>
                      </div>
                    )}
                  </button>
                </div>
              )}

              {activeTab === 'flights' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Plane className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold gradient-text">Flight Search</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      From
                    </label>
                    <input
                      type="text"
                      value={flightSearch.from}
                      onChange={(e) => setFlightSearch({...flightSearch, from: e.target.value})}
                      placeholder="Airport code or city"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      To
                    </label>
                    <input
                      type="text"
                      value={flightSearch.to}
                      onChange={(e) => setFlightSearch({...flightSearch, to: e.target.value})}
                      placeholder="Airport code or city"
                      className="input-field"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Departure
                      </label>
                      <input
                        type="date"
                        value={flightSearch.departureDate}
                        onChange={(e) => setFlightSearch({...flightSearch, departureDate: e.target.value})}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Return
                      </label>
                      <input
                        type="date"
                        value={flightSearch.returnDate}
                        onChange={(e) => setFlightSearch({...flightSearch, returnDate: e.target.value})}
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Adults
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={flightSearch.adults}
                        onChange={(e) => setFlightSearch({...flightSearch, adults: parseInt(e.target.value)})}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Cabin Class
                      </label>
                      <select
                        value={flightSearch.cabinClass}
                        onChange={(e) => setFlightSearch({...flightSearch, cabinClass: e.target.value})}
                        className="input-field"
                      >
                        <option value="Economy">Economy</option>
                        <option value="Premium Economy">Premium Economy</option>
                        <option value="Business">Business</option>
                        <option value="First">First</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={handleFlightSearch}
                    disabled={loading}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Searching Flights...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Plane className="w-5 h-5" />
                        <span>Search Flights</span>
                      </div>
                    )}
                  </button>
                </div>
              )}

              {activeTab === 'chat' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold gradient-text">Natural Language Search</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Ask anything about travel
                    </label>
                    <textarea
                      value={chatQuery}
                      onChange={(e) => setChatQuery(e.target.value)}
                      placeholder="e.g., I need a hotel in Lucknow for next weekend, or Show me flights from Delhi to Mumbai"
                      className="input-field"
                      rows="4"
                    />
                  </div>
                  <button
                    onClick={handleNaturalLanguageSearch}
                    disabled={loading || !chatQuery.trim()}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <MessageCircle className="w-5 h-5" />
                        <span>Ask AI Assistant</span>
                      </div>
                    )}
                  </button>
                </div>
              )}

              {activeTab === 'content-creator' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Image className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold gradient-text">Travel Content Creator</h3>
                  </div>
                  
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Upload Travel Images
                    </label>
                    <div 
                      className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-purple-500 transition-colors"
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <div className="mb-4">
                        <Image className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-400 mb-2 font-medium">Click to browse images or drag & drop</p>
                        <p className="text-sm text-gray-500 mb-4">Supports: JPG, PNG, GIF, WebP (max 10MB each)</p>
                        <button
                          type="button"
                          onClick={openFilePicker}
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                        >
                          <Image className="w-5 h-5 mr-2" />
                          Choose Images
                        </button>
                      </div>
                    </div>
                    {uploadedImages.length === 0 && (
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Select at least 2 images to generate content
                      </p>
                    )}
                  </div>

                  {/* Uploaded Images */}
                  {uploadedImages.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Uploaded Images ({uploadedImages.length})
                      </label>
                      <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto">
                        {uploadedImages.map((image) => (
                          <div key={image.id} className="relative group">
                            <img
                              src={image.url}
                              alt={image.name}
                              className={`w-full h-20 object-cover rounded-lg cursor-pointer transition-all ${
                                selectedImages.includes(image.id) 
                                  ? 'ring-2 ring-purple-500 scale-105' 
                                  : 'hover:scale-105'
                              }`}
                              onClick={() => handleImageSelect(image.id)}
                            />
                            <button
                              onClick={() => removeImage(image.id)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                            <p className="text-xs text-gray-400 mt-1 truncate">{image.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Content Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Choose Content Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'blog', label: 'Travel Blog', icon: FileText, color: 'from-blue-500 to-cyan-500' },
                        { id: 'video-script', label: 'Video Script', icon: VideoIcon, color: 'from-green-500 to-emerald-500' },
                        { id: 'collage', label: 'Photo Collage', icon: Palette, color: 'from-purple-500 to-pink-500' },
                        { id: 'video', label: 'Reel/Videos', icon: Play, color: 'from-orange-500 to-red-500' }
                      ].map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => {
                            console.log('Button clicked:', type.id);
                            setContentType(type.id);
                            console.log('State should be:', type.id);
                          }}
                          className={`p-4 rounded-xl border-2 transition-all relative ${
                            contentType === type.id
                              ? `border-purple-500 bg-gradient-to-r ${type.color} text-white shadow-lg`
                              : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600'
                          }`}
                        >
                          <type.icon className="w-6 h-6 mx-auto mb-2" />
                          <span className="text-sm font-medium">{type.label}</span>
                          {contentType === type.id && (
                            <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Additional Prompt */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Additional Context (Optional)
                    </label>
                    <textarea
                      value={contentPrompt}
                      onChange={(e) => setContentPrompt(e.target.value)}
                      placeholder="e.g., This was a trip to the mountains, focus on adventure activities..."
                      className="input-field"
                      rows="3"
                    />
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={handleContentGeneration}
                    disabled={loading || selectedImages.length < 2}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Generating Content...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Sparkles className="w-5 h-5" />
                        <span>Generate {contentType === 'blog' ? 'Blog Post' : contentType === 'video-script' ? 'Video Script' : contentType === 'collage' ? 'Collage Concept' : 'Reel/Videos'}</span>
                      </div>
                    )}
                  </button>
                  
                  {selectedImages.length < 2 && uploadedImages.length > 0 && (
                    <p className="text-sm text-yellow-400 text-center">
                      ⚠️ Please select at least 2 images to generate content
                    </p>
                  )}
                  
                  {uploadedImages.length === 0 && (
                    <p className="text-sm text-gray-400 text-center">
                      📸 Please upload some images first
                    </p>
                  )}
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

                  {/* Hotel Results */}
                  {results.hotels && (
                    <div className="card">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                          <Hotel className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold gradient-text">Hotel Search Results</h3>
                      </div>
                      {results.hotels.success === false ? (
                        <div className="space-y-6">
                          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4">
                            <p className="text-yellow-300 text-sm">
                              <strong>Demo Mode:</strong> {results.hotels.message}
                            </p>
                          </div>
                          {results.hotels.mockData && results.hotels.mockData.hotels && (
                            <div className="space-y-4">
                              <h4 className="font-semibold text-gray-200">Sample Hotel Data:</h4>
                              <div className="space-y-4">
                                {results.hotels.mockData.hotels.map((hotel, index) => (
                                  <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h5 className="font-semibold text-white text-lg">{hotel.name}</h5>
                                        <p className="text-gray-400">{hotel.location}</p>
                                        <div className="flex items-center mt-3">
                                          <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                              <Star key={i} className={`w-4 h-4 ${i < Math.floor(hotel.rating) ? 'fill-current' : ''}`} />
                                            ))}
                                          </div>
                                          <span className="text-gray-400 text-sm ml-2">{hotel.rating}</span>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <p className="font-bold text-2xl text-green-400">{hotel.price}</p>
                                        <p className="text-xs text-gray-500">per night</p>
                                      </div>
                                    </div>
                                    <div className="mt-4">
                                      <div className="flex flex-wrap gap-2">
                                        {hotel.amenities.map((amenity, idx) => (
                                          <span key={idx} className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30">
                                            {amenity}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-gray-400">
                          <p>Hotel search completed. Check the console for detailed results.</p>
                          <p className="text-sm mt-2">
                            Note: This is a demo. In a real implementation, you would display actual hotel data from the Cleartrip API.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Flight Results */}
                  {results.flights && (
                    <div className="card">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                          <Plane className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold gradient-text">Flight Search Results</h3>
                      </div>
                      {results.flights.success === false ? (
                        <div className="space-y-6">
                          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4">
                            <p className="text-yellow-300 text-sm">
                              <strong>Demo Mode:</strong> {results.flights.message}
                            </p>
                          </div>
                          {results.flights.mockData && results.flights.mockData.flights && (
                            <div className="space-y-4">
                              <h4 className="font-semibold text-gray-200">Sample Flight Data:</h4>
                              <div className="space-y-4">
                                {results.flights.mockData.flights.map((flight, index) => (
                                  <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300">
                                    <div className="flex justify-between items-center">
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between mb-4">
                                          <div>
                                            <h5 className="font-semibold text-white text-lg">{flight.airline}</h5>
                                            <p className="text-gray-400">{flight.flightNumber}</p>
                                          </div>
                                          <div className="text-right">
                                            <p className="font-bold text-2xl text-green-400">{flight.price}</p>
                                            <p className="text-xs text-gray-500">per person</p>
                                          </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <div className="text-center">
                                            <p className="font-semibold text-white text-lg">{flight.departure}</p>
                                            <p className="text-xs text-gray-400">Departure</p>
                                          </div>
                                          <div className="flex-1 mx-6">
                                            <div className="border-t border-gray-600 relative">
                                              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                              </div>
                                            </div>
                                            <p className="text-center text-sm text-gray-400 mt-2">{flight.duration}</p>
                                          </div>
                                          <div className="text-center">
                                            <p className="font-semibold text-white text-lg">{flight.arrival}</p>
                                            <p className="text-xs text-gray-400">Arrival</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-gray-400">
                          <p>Flight search completed. Check the console for detailed results.</p>
                          <p className="text-sm mt-2">
                            Note: This is a demo. In a real implementation, you would display actual flight data from the Cleartrip API.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Natural Language Search Results */}
                  {results.aiInterpretation && (
                    <div className="card">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                          <MessageCircle className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold gradient-text">AI Interpretation</h3>
                      </div>
                      <div className="prose prose-invert max-w-none">
                        <pre className="ai-response-box whitespace-pre-wrap text-gray-300 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                          {results.aiInterpretation}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Available Locations Info */}
                  {results.availableLocations && (
                    <div className="card bg-blue-900/20 border-blue-500/30">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                          <Globe className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-blue-300">
                          Available Locations for Testing
                        </h3>
                      </div>
                      <div className="text-blue-200">
                        <p className="text-sm mb-3">Currently, hotel data is available for these locations:</p>
                        <div className="grid grid-cols-2 gap-3">
                          {results.availableLocations.map(location => (
                            <div key={location.id} className="bg-blue-800/30 border border-blue-600/30 rounded-lg p-3">
                              <p className="font-medium text-blue-200">{location.name}</p>
                              <p className="text-xs text-blue-300">ID: {location.id}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Content Creator Results */}
                  {generatedContent && (
                    <div className="card">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <Image className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-xl font-bold gradient-text">
                          Generated {generatedContent.type === 'blog' ? 'Travel Blog' : 
                                   generatedContent.type === 'video-script' ? 'Video Script' : 
                                   generatedContent.type === 'collage' ? 'Collage Concept' : 'Reel/Videos'}
                        </h3>
                      </div>
                      
                      {/* Selected Images */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-200 mb-3">Selected Images</h4>
                        <div className="grid grid-cols-3 gap-3">
                          {generatedContent.images.map((image, index) => (
                            <div key={image.id} className="relative">
                              <img
                                src={image.url}
                                alt={image.name}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                              <div className="absolute top-1 left-1 w-6 h-6 bg-purple-500 text-white rounded-full text-xs flex items-center justify-center">
                                {index + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Generated Content */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-200 mb-3">Generated Content</h4>
                        <div className="prose prose-invert max-w-none">
                          <pre className="ai-response-box whitespace-pre-wrap text-gray-300 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                            {generatedContent.content}
                          </pre>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-6 flex space-x-3">
                        <button className="btn-secondary flex-1">
                          <FileText className="w-4 h-4 mr-2" />
                          Copy to Clipboard
                        </button>
                        <button className="btn-secondary flex-1">
                          <Video className="w-4 h-4 mr-2" />
                          Download
                        </button>
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
                      Use the search panel on the left to find hotels, flights, or get AI-powered travel recommendations.
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