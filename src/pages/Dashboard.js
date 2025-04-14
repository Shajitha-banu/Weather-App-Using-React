import React, { useEffect, useState } from 'react';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [searchCity, setSearchCity] = useState('Chennai');

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=b0f1871b6a994bc0f27f5a2d21173324&units=metric`)
      .then(res => res.json())
      .then(data => setWeather(data));
  }, [searchCity]);

  const handleSearch = () => {
    if (city.trim() !== '') {
      setSearchCity(city);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    window.location.href = '/';
  };

  return (
    <div className="dashboard-container">
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      <h1>Welcome to Shajitha's Weather Dashboard</h1>

      <div className="search-box">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={handleSearch}>Get Weather</button>
      </div>

      {weather && weather.main ? (
        <div className="weather-card">
          <h2>Weather in {weather.name}</h2>
          <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
          <p><strong>Condition:</strong> {weather.weather[0].description}</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p className="loading">Enter Valid Weather Data...</p>
      )}
    </div>
  );
};

export default Dashboard;
