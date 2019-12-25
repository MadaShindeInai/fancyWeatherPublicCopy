import Weather from './weather';
import Location from './location';
import Image from './image';

export default class FanсyWeather {
  constructor(
    location,
    dateAndTime = null,
    detailWeather,
    forecast,
    image,
  ) {
    this._location = location;
    this._dateAndTime = dateAndTime;
    this._detailWeather = detailWeather;
    this._forecast = forecast;
    this._image = image;
  }

  static parse(locationResponse, detailWeatherResponse, imageResponse) {
    const { detailWeather, forecast } = Weather.parse(detailWeatherResponse);
    return new FanсyWeather(
      Location.parse(locationResponse),
      null,
      detailWeather,
      forecast,
      Image.parse(imageResponse),
    );
  }

  set image(tempImage) {
    this._image = tempImage;
  }

  get location() {
    return this._location;
  }

  get dateAndTime() {
    return this._dateAndTime;
  }

  get detailWeather() {
    return this._detailWeather;
  }

  get forecast() {
    return this._forecast;
  }

  get image() {
    return this._image;
  }
}
