import ForecastItem from './forecastItem';

export default class Forecast {
  constructor(forecastItems) {
    this._forecastItems = forecastItems;
  }

  static parse(response) {
    return new Forecast(
      response.daily.data.map((d) => ForecastItem.parse(d)),
    );
  }

  get forecastItems() {
    return this._forecastItems;
  }
}
