import SimpleWeather from './simpleWeather';

export default class ForecastItem {
  constructor(
    dayLabel,
    weather,
  ) {
    this._dayLabel = dayLabel;
    this._weather = weather;
  }

  static parse(response) {
    return new ForecastItem(
      ForecastItem.parseDayOfWeek(response.time),
      SimpleWeather.parse(response),
    );
  }

  static parseDayOfWeek(unixTime) {
    return new Date(new Date(unixTime * 1000).toISOString().split('T')[0]);
  }

  get dayLabel() {
    return this._dayLabel;
  }

  get weather() {
    return this._weather;
  }
}
