import App from './app';

// TODO: Make file for fetch data Giphy or Weather
// TODO: Get data from WeatherApi -> Get str of current weather -> Get img by str from giphy

// TODO: Make class app what handle all data
// TODO: For each day make obj with data

// App init
// Then init initialize default city - 'Saint-Petersburg'
// Get weather data by API about Saint-Petersburg
// Get current weather gif by giphy
// Initialize background
// Show data about current weather

const locationElement = document.querySelector('[data-js-location]');
const temperatureElement = document.querySelector('[data-js-temperature]');
const conditionElement = document.querySelector('[data-js-condition]');
const temperatureMaxElement = document.querySelector('[data-js-max]');
const temperatureMinElement = document.querySelector('[data-js-min]');

const hoursContainerElement = document.querySelector(
  '[data-js-hours-container]'
);

const getCurrentHour = () => {
  const hour = new Date();
  return hour.getHours();
};

const getRightHourFormat = (dateTimeString) => {
  const partTime = dateTimeString.split(' ')[1].split(':');
  return parseInt(partTime, 10);
};

async function setHoursWeather(app) {
  const hourWeatherArr = app.getWeatherHourArray();
  const currentHour = getCurrentHour();
  console.log(currentHour);

  hourWeatherArr.forEach((hour) => {
    const hourTime = getRightHourFormat(hour.time);
    if (hourTime < currentHour) return;

    const hourCard = document.createElement('div');
    hourCard.classList.add('hour-card');

    const time = document.createElement('p');
    time.textContent = hourTime === currentHour ? 'Now' : hourTime;
    time.classList.add('time');

    const icon = new Image(32, 32);
    icon.src = `${hour.condition.icon}`;

    const temperature = document.createElement('p');
    temperature.textContent = Math.round(hour.temp_c);
    temperature.classList.add('temperature');

    [time, icon, temperature].forEach((item) => {
      hourCard.appendChild(item);
    });

    hoursContainerElement.appendChild(hourCard);
  });

  console.log(getRightHourFormat(hourWeatherArr[15].time));
}

async function setToday(app) {
  locationElement.textContent = app.getLocation();
  conditionElement.textContent = app.getWeatherCondition();
  temperatureElement.textContent = Math.round(app.getCurrentDayTemperature());
  temperatureMaxElement.textContent = Math.round(app.getMaxTemperature(0));
  temperatureMinElement.textContent = Math.round(app.getMinTemperature(0));
}

export default async function init() {
  const app = new App();
  await app.init();
  console.log(app.getWeatherJSON());
  setToday(app);
  setHoursWeather(app);
}
