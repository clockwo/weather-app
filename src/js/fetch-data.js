import showError from './error';

const WEATHER_KEY = 'a1acc6cf8281413798190228231711';
const DEFAULT_LOCATE = 'Saint-Petersburg';

async function fetchWeatherData(locate, isDefaultAttempt = false) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_KEY}&q=${locate}&days=10&aqi=no`,
      { mode: 'cors' }
    );

    if (!response.ok) {
      if (response.status === 400 && !isDefaultAttempt) {
        showError();
        return fetchWeatherData(DEFAULT_LOCATE);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.log('WeatherAPI has error: ', error.message);
  }
  return null;
}

export default async function getWeatherData(locate) {
  const data = await fetchWeatherData(locate);
  return data;
}
