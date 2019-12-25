import SimpleWeather from './simpleWeather';

export default class DetailWeather extends SimpleWeather {
  constructor(
    dataCloudImg,
    temperature,
    skyState,
    temprFeel,
    windSpeed,
    humidity,
    time,
  ) {
    super(dataCloudImg, temperature);
    this._skyState = skyState;
    this._temprFeel = temprFeel;
    this._windSpeed = windSpeed;
    this._humidityVal = humidity;
    this._time = time;
  }

  static parse(response) {
    return new DetailWeather(
      response.currently.icon,
      response.currently.temperature,
      response.currently.summary,
      response.currently.apparentTemperature,
      response.currently.windSpeed,
      response.currently.humidity,
      response.currently.time,
    );
  }

  static parseCurrentTimezone(unixTime) {
    const incomingDate = new Date(unixTime * 1000);
    return incomingDate;
  }

  get dataCloudImg() {
    return this._dataCloudImg;
  }

  get temperature() {
    return this._temperature;
  }

  get skyState() {
    return this._skyState;
  }

  get temprFeel() {
    return this._temprFeel;
  }

  get windSpeed() {
    return this._windSpeed;
  }

  get humidityVal() {
    return this._humidityVal;
  }

  get time() {
    return this._time;
  }

  set time(time) {
    this._time = time;
  }
}
