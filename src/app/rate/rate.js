'use client';
import { useState } from 'react';
import axios from 'axios';

export default function UpdatePitStop() {
  const [features, setFeatures] = useState({
    AllDayAccess: false,
    LGBTQfriendly: false,
    wheelChairFriendly: false
  });

  const handleToggle = (feature) => {
    setFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

//   id: {
//     requried: true,
//     type: String,
// },
// type: {
//     required: true,
//     type: String,
// },
// name: {
//     required: true,
//     type: String,
// },
// location: {
//     type: {
//         type: String,
//         enum: ['Point'],
//         required: true,
//     },
//     coordinates: {
//         type: [Number],
//         required: true,
//     },
// },
// AllDayAccess: {
//     require: true,
//     type: Boolean,
// },
// LGBTQfriendly: {
//     required: true,
//     type: Boolean
// },
// wheelChairFriendly: {
//     required: true,
//     type: Boolean,
// },

const handleSave = async () => {
  try {
    console.log('Sending request...');
    const response = await axios.post('http://localhost:3001/api/pitstops/createPitStop', {
      id: "1",
      type: "pitStop",
      name: "PitStop 1",
      location: {
        type: "Point",
        coordinates: [100, 100]
      },
      AllDayAccess: features.AllDayAccess,
      LGBTQfriendly: features.LGBTQfriendly,
      wheelChairFriendly: features.wheelChairFriendly
    });
    console.log('Response:', response);
    alert('Features saved successfully!');
  } catch (error) {
    console.error('Error:', error);
    alert('Error saving features. Please try again.');
  }
};

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <div className="mb-4">
          <label htmlFor="locationName" className="block text-sm font-medium text-gray-700">Location Name</label>
          <input
            type="text"
            id="locationName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter location name"
          />
        </div>
        {Object.keys(features).map((feature) => (
          <button
            key={feature}
            onClick={() => handleToggle(feature)}
            className={`w-full p-2 rounded ${
              features[feature] 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {feature}: {features[feature] ? '✓' : '✗'}
          </button>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Save Features
      </button>
    </div>
  );
}
