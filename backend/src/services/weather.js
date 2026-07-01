import axios from "axios";

export async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

    const response = await axios.get(url);

    return {
      city: response.data.name,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      condition: response.data.weather[0].main,
      windSpeed: response.data.wind.speed
    };

  } catch (err) {
    return {
      city,
      temperature: null,
      humidity: null,
      condition: "Unknown",
      windSpeed: null
    };
  }
}