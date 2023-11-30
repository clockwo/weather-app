import App from './app';

const locationElement = document.querySelector('[data-js-location]');
const temperatureElement = document.querySelector('[data-js-temperature]');
const conditionElement = document.querySelector('[data-js-condition]');
const temperatureMaxElement = document.querySelector('[data-js-max]');
const temperatureMinElement = document.querySelector('[data-js-min]');
const hoursContainerElement = document.querySelector(
  '[data-js-hours-container]'
);
const daysContainerElement = document.querySelector('[data-js-days-container]');

const weekDays = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};
const getCurrentHour = () => {
  const hour = new Date();
  return hour.getHours();
};

const getRightHourFormat = (dateTimeString) => {
  const partTime = dateTimeString.split(' ')[1].split(':');
  return parseInt(partTime, 10);
};

const getMaxTempOfDay = (day) => day.day.maxtemp_c;
const getMinTempOfDay = (day) => day.day.mintemp_c;
const getNameOfDay = (day) => {
  const numericDate = new Date(day.date);
  const today = new Date();

  const dayName =
    numericDate.getDate() === today.getDate()
      ? 'Today'
      : weekDays[numericDate.getDay()].slice(0, 3);

  return dayName;
};
const getIconOfDay = (day) => day.day.condition.icon;

const clearElements = () => {
  daysContainerElement.replaceChildren();
  hoursContainerElement.replaceChildren();
};

function setHoursWeather(app) {
  const hourWeatherArr = app.getWeatherHourArray();
  const currentHour = getCurrentHour();

  hourWeatherArr.forEach((hour) => {
    const hourTime = getRightHourFormat(hour.time);
    if (hourTime < currentHour) return;

    const hourCard = document.createElement('div');
    hourCard.classList.add('hour-card');

    const time = document.createElement('p');
    time.textContent = hourTime === currentHour ? 'Now' : hourTime;
    time.classList.add('time');

    const icon = new Image();
    icon.src = `${hour.condition.icon}`;
    icon.classList.add('icon');

    const temperature = document.createElement('p');
    temperature.textContent = `${Math.round(hour.temp_c)}°`;
    temperature.classList.add('temperature');

    [time, icon, temperature].forEach((item) => {
      hourCard.appendChild(item);
    });

    hoursContainerElement.appendChild(hourCard);
  });
}

function setDaysForecast(app) {
  const minTempOf10Days = app.getLowestTemperatureOf10Days(); // 0%
  const maxTempOf10Days = app.getHighestTemperatureOf10Days(); // 100%

  const days = app.getDays();

  days.forEach((day) => {
    const dayName = getNameOfDay(day);
    const dayIcon = getIconOfDay(day);
    const maxTemp = getMaxTempOfDay(day);
    const minTemp = getMinTempOfDay(day);

    const dayElement = document.createElement('div');
    dayElement.classList.add('day');

    const dayNameElement = document.createElement('p');
    dayNameElement.classList.add('day-name');
    dayNameElement.textContent = dayName;

    const dayIconElement = new Image();
    dayIconElement.src = dayIcon;

    const tempScaleElement = document.createElement('div');
    tempScaleElement.classList.add('temp-scale');

    const minTempElement = document.createElement('p');
    minTempElement.textContent = `${Math.round(minTemp)}°`;

    const maxTempElement = document.createElement('p');
    maxTempElement.textContent = `${Math.round(maxTemp)}°`;

    const spanLineElement = document.createElement('span');
    spanLineElement.classList.add('line');

    const lineWidth =
      ((maxTemp - minTemp) / (maxTempOf10Days - minTempOf10Days)) * 100;
    const marginLeft =
      ((minTemp - minTempOf10Days) / (maxTempOf10Days - minTempOf10Days)) * 100;

    spanLineElement.style.setProperty('--width', `${lineWidth}%`);
    spanLineElement.style.setProperty('--margin-left', `${marginLeft}%`);

    [minTempElement, spanLineElement, maxTempElement].forEach((item) => {
      tempScaleElement.appendChild(item);
    });

    [dayNameElement, dayIconElement, tempScaleElement].forEach((item) => {
      dayElement.appendChild(item);
    });

    daysContainerElement.appendChild(dayElement);
  });
}

function setToday(app) {
  locationElement.textContent = app.getLocation();
  conditionElement.textContent = app.getWeatherCondition();
  temperatureElement.textContent = `${Math.round(
    app.getCurrentDayTemperature()
  )}°`;
  temperatureMaxElement.textContent = `${Math.round(
    app.getMaxTemperature(0)
  )}°`;
  temperatureMinElement.textContent = `${Math.round(
    app.getMinTemperature(0)
  )}°`;
}

export default async function init(locate) {
  const app = new App();
  await app.init(locate);
  console.log(app.getWeatherJSON());
  clearElements();
  setToday(app);
  setHoursWeather(app);
  setDaysForecast(app);
}
