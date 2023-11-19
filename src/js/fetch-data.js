const WEATHER_KEY = 'a1acc6cf8281413798190228231711';
const GIPHY_KEY = 'EN20l0Elyu5VVeoBSXsvwHRDyIqqEiOj';

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

async function fetchGiphyImage(searchTerm) {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_KEY}&s=${searchTerm}`,
      { mode: 'cors' }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error Giphy API:', error);
    return null;
  }
}

export async function getImage(searchTerm) {
  const data = await fetchGiphyImage(searchTerm);
  return data ? data.data.images.original.url : null;
}

export async function getWeatherData(locate = 'Saint-Petersburg') {
  const data = await fetchWeatherData(locate);
  return data;
}
