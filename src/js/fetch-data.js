const WEATHER_KEY = 'a1acc6cf8281413798190228231711';

async function fetchWeatherData(locate) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_KEY}&q=${locate}&aqi=no`,
      { mode: 'cors' }
    );

    return response.json();
  } catch (error) {
    console.log('There is error: ', error);
    return null;
  }
}

export default async function getWeatherData(locate = 'Saint-Petersburg') {
  const data = await fetchWeatherData(locate);
  return data;
}
