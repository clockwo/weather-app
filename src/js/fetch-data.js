const WEATHER_KEY = 'a1acc6cf8281413798190228231711';

async function fetchWeatherData(locate) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_KEY}&q=${locate}&aqi=no`,
      { mode: 'cors' }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.log('WeatherAPI has error: ', error);
    return null;
  }
}

export default async function getWeatherData(locate = 'Saint-Petersburg') {
  const data = await fetchWeatherData(locate);
  return data;
}
