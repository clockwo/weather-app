import getImage from './giphy';
import getWeatherData from './fetch-data';

const backgroundElement = document.querySelector('[data-js-background]');

export default async function setBackground(searchTerm = 'cloudy') {
  const imgUrl = await getImage(searchTerm);
  console.log(await getWeatherData('Moscow'));
  if (imgUrl) {
    backgroundElement.style.backgroundImage = `url("${imgUrl}")`;
  }
}
