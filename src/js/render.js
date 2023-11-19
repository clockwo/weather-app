import { getWeatherData, getImage } from './fetch-data';

// TODO: Make file for fetch data Giphy or Weather
// TODO: Get data from WeatherApi -> Get str of current weather -> Get img by str from giphy

// TODO: Make class app what handle all data
// TODO: For each day make obj with data

const backgroundElement = document.querySelector('[data-js-background]');

export default async function setBackground() {
  const weatherData = await getWeatherData('Moscow');
  console.log(weatherData);
  console.log(weatherData.current.condition.text);
  const imgUrl = await getImage('snow-background');
  if (imgUrl) {
    backgroundElement.style.backgroundImage = `url("${imgUrl}")`;
  }
}
