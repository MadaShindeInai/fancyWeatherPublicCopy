import DetailWeather from './detailWeather';
import Forecast from './forecast';

export default class Weather {
  constructor(
    detailWeather,
    forecast,
  ) {
    this._detailWeather = detailWeather;
    this._forecast = forecast;
  }

  static parse(response) {
    return new Weather(DetailWeather.parse(response), Forecast.parse(response));
  }

  get detailWeather() {
    return this._detailWeather;
  }

  get forecast() {
    return this._forecast;
  }
}
