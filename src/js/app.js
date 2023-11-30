import getWeatherData from './fetch-data';

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

  getDays() {
    return this.weatherInfo.forecast.forecastday;
  }

  getLowestTemperatureOf10Days() {
    const days = this.weatherInfo.forecast.forecastday;
    const minTemp = days.reduce(
      (min, b) => Math.min(min, b.day.mintemp_c),
      days[0].day.mintemp_c
    );
    return minTemp;
  }

  getHighestTemperatureOf10Days() {
    const days = this.weatherInfo.forecast.forecastday;
    const maxTemp = days.reduce(
      (max, b) => Math.max(max, b.day.maxtemp_c),
      days[0].day.maxtemp_c
    );
    return maxTemp;
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

  async init(locate) {
    this.weatherInfo = await getWeatherData(locate);
  }
}
