import getWeatherData from './fetch-data';

const DEFAULT_LOCATE = 'Saint-Petersburg';

export default class App {
  constructor() {
    this.weatherInfo = null;
  }

  getWeatherJSON() {
    return this.weatherInfo;
  }

  getLocation() {
    return this.weatherInfo.location.name;
  }

  getCurrentDayTemperature() {
    return this.weatherInfo.current.temp_c;
  }

  getMinTemperature(dayIndex) {
    return this.weatherInfo.forecast.forecastday[dayIndex].day.mintemp_c;
  }

  getMaxTemperature(dayIndex) {
    return this.weatherInfo.forecast.forecastday[dayIndex].day.maxtemp_c;
  }

  getWeatherCondition() {
    return this.weatherInfo.current.condition.text;
  }

  getWeatherHourArray() {
    return this.weatherInfo.forecast.forecastday[0].hour;
  }

  async init(locate = DEFAULT_LOCATE) {
    this.weatherInfo = await getWeatherData(locate);
  }
}
