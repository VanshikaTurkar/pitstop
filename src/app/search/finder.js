import React, { useState } from 'react';
import { Search, Star, Users, Clock, MapPin, Shield } from 'lucide-react';
import axios from 'axios';
import styles from './finder.module.css'
//import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
//import { Alert, AlertDescription } from '@/components/ui/alert';

const PitStop = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedNeeds, setSelectedNeeds] = useState('all');
  const [features, setFeatures] = useState({
    AllDayAccess: false,
    LGBTQfriendly: false,
    wheelChairFriendly: false
  });
  const [searchResults, setSearchResults] = useState([]);

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

  const handleFilter = async () => {
      try {
        console.log('Sending request...');
        console.log("In handleFilter", features);
        const response = await axios.post('http://localhost:3001/filter/filtered', {
          AllDayAccess: features.AllDayAccess,
          LGBTQfriendly: features.LGBTQfriendly,
          wheelChairFriendly: features.wheelChairFriendly
        });
        console.log('Response:', response);
        setSearchResults(response.data.data);
        console.log("searchResults", response.data.data);
        alert('Features get successfully!');
      } catch (error) {
        console.error('Error:', error);
        alert('Error saving features. Please try again.');
      }
  }
  const handleNeedsChange = (e) => {
    const value = e.target.value;
    setSelectedNeeds(value);
    console.log("In handleNeedsChange", value);
    // Reset all features to false
    const newFeatures = {
      allDayAccess: false,
      LGBTQfriendly: false,
      wheelChairFriendly: false,
    };
    // Set the selected feature to true
  switch(value) {
    case 'allDayAccess':
      newFeatures.allDayAccess = true;
      break;
    case 'LGBTQfriendly':
      newFeatures.LGBTQfriendly = true;
      break;
    case 'wheelChairFriendly':
      newFeatures.wheelChairFriendly = true;
      break;
    case 'all':
      // All features remain false
      break;
  }

  setFeatures(newFeatures);
};

return (
  <div className={styles.container}>
    <div className={styles.hero}>
      <h1 className={styles.title}>PitStop</h1>
      <p className={styles.subtitle}>Find clean, safe stops for your family's journey</p>
    </div>

    {/* Search Section */}
    <div className={styles.searchSection}>
      <div className={styles.searchControls}>
        <select
          className={styles.select}
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">What type of stop do you need?</option>
          {stopTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>

        <select
          className={styles.select}
          value={selectedNeeds}
          onChange={handleNeedsChange}
        >
          <option value="all">All Accessibility Options</option>
          <option value="allDayAccess">All Day Access</option>
          <option value="LGBTQfriendly">LGBTQ Friendly</option>
          <option value="wheelChairFriendly">Wheelchair Access</option>
        </select>

        <button onClick={handleFilter} className={styles.filterButton}>
          Filter
        </button>
      </div>
    </div>

    {/* Results Section */}
    <div className={styles.results}>
      {searchResults.map((result, index) => (
        <div key={index} className={styles.card}>
          <h3 className={styles.pitstopTitle}>{result.name}</h3>
          <p className={styles.pitstopDescription}>{result.description}</p>
        </div>
        
        
      ))}
    </div>
  </div>
);

}

export default PitStop;