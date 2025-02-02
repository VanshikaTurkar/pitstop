import React, { useState } from 'react';
import { Search, Star, Users, Clock, MapPin, Shield } from 'lucide-react';
//import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
//import { Alert, AlertDescription } from '@/components/ui/alert';

const PitStop = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedNeeds, setSelectedNeeds] = useState('all');

  const stopTypes = [
    { value: 'bathroom', label: 'Restrooms' },
    { value: 'nursing', label: 'Nursing & Baby Care' },
    { value: 'medical', label: 'First Aid & Medical' },
    { value: 'rest', label: 'Rest Areas' },
    { value: 'food', label: 'Family Dining' }
  ];

  const sampleStops = [
    {
      id: 1,
      name: "Rest Stop Haven",
      type: "rest",
      distance: "2 mins away",
      cleanliness: 4.7,
      reviews: 156,
      features: ["Family restroom", "Nursing room", "Wheelchair ramp"],
      lastCleaned: "1 hour ago",
      status: "Open",
      safetyRating: 4.8
    },
    {
      id: 2,
      name: "Quick Care Station",
      type: "medical",
      distance: "5 mins away",
      cleanliness: 4.9,
      reviews: 92,
      features: ["First aid", "Baby changing", "24/7 access"],
      lastCleaned: "30 mins ago",
      status: "Open",
      safetyRating: 5.0
    }
  ];

  // // useEffect(() => {
  // //   const fetchLocations = async () => {
  // //     try {
  // //       const response = await fetch("/api/locations"); // Call the API route
  // //       const data = await response.json();
  // //       setLocations(data); // Update state with fetched data
  // //     } catch (error) {
  // //       console.error("Error fetching locations:", error);
  // //     }
  // //   };

  //   fetchLocations();
  // }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header with new branding */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 text-gray-800 tracking-tight">PitStop</h1>
        <p className="text-gray-600 text-lg">Find clean, safe stops for your family's journey</p>
      </div>

      {/* Search Section */}
      <div className="space-y-4 mb-8">
        <div className="flex gap-4">
          <select 
            className="flex-1 p-3 border rounded-lg bg-white shadow-sm hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">What type of stop do you need?</option>
            {stopTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>

          <select 
            className="flex-1 p-3 border rounded-lg bg-white shadow-sm hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            value={selectedNeeds}
            onChange={(e) => setSelectedNeeds(e.target.value)}
          >
            <option value="all">All Accessibility Options</option>
            <option value="baby">Baby-Friendly</option>
            <option value="senior">Senior-Friendly</option>
            <option value="wheelchair">Wheelchair Access</option>
            <option value="family">Family Space</option>
          </select>
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        {sampleStops.map(stop => (
          <div key={stop.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="text-xl font-semibold text-gray-800">{stop.name}</span>
                </div>
                <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">{stop.distance}</span>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center mb-3">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    <span className="font-semibold text-gray-800">{stop.cleanliness}/5</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({stop.reviews} verified reviews)
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    <Shield className="h-4 w-4 mr-1 text-green-500" />
                    <span className="font-semibold text-gray-800">Safety: {stop.safetyRating}/5</span>
                  </div>
                  <div className="text-sm space-y-2.5">
                    {stop.features.map((feature, i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center bg-gray-50 rounded-lg p-2">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600">Last cleaned: {stop.lastCleaned}</span>
                  </div>
                  <div className="flex items-center bg-gray-50 rounded-lg p-2">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-600">Status: 
                      <span className="text-green-600 ml-1 font-medium">{stop.status}</span>
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-green-600 bg-green-50 p-2 rounded-lg">
                    <span className="mr-1">✨</span>
                    Verified clean & safe location
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PitStop;