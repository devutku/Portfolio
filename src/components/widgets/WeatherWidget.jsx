import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, Wind, Droplets } from 'lucide-react';
import './WeatherWidget.css';

export default function WeatherWidget({ location = "Istanbul" }) {
  const [temp, setTemp] = useState(21);
  const [condition, setCondition] = useState("Clear Sky");

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <span className="weather-location">{location}</span>
        <Sun size={20} color="#f59e0b" />
      </div>

      <div className="weather-main">
        <span className="weather-temp">{temp}°C</span>
        <span className="weather-desc">{condition}</span>
      </div>

      <div className="weather-details">
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Droplets size={12} /> 48% Humidity
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Wind size={12} /> 14 km/h
        </span>
      </div>
    </div>
  );
}
