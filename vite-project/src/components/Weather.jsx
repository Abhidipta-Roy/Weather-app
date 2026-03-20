import React, { useState } from "react";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "1bc7ccca59c92036efbd9e12dacfbb6a";

  const getWeather = async () => {
    if (!city) return;

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      const response = await fetch(url);
      const data = await response.json();

      console.log(data);

      setWeather(data);
    } catch (error) {
      console.error(error);
    }
  };

  // 👇 BACKGROUND LOGIC
  const getBackground = () => {
    if (!weather) return "default";

    const condition = weather.weather[0].main;

    if (condition === "Clear") return "clear";
    if (condition === "Clouds") return "clouds";
    if (condition === "Rain") return "rain";
    if (condition === "Snow") return "snow";

    return "default";
  };

  return (
    <div className={`app ${getBackground()}`}>
      <h1>Weather App 🌤️</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getWeather}>Search</button>

      {weather && weather.main && (
        <div>
          <h2>{weather.name}</h2>
          <h3>{weather.main.temp} °C</h3>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;