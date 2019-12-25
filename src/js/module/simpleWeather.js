export default class SimpleWeather {
  constructor(
    dataCloudImg,
    temperature,
  ) {
    this._dataCloudImg = dataCloudImg;
    this._temperature = temperature;
  }

  static parse(response) {
    return new SimpleWeather(
      response.icon,
      response.temperatureMin,
    );
  }

  get dataCloudImg() {
    return this._dataCloudImg;
  }

  get temperature() {
    return this._temperature;
  }
}
