export default class WeatherProvider {
  static async getWeatherParams(locationCoordinates, lang = 'en') {
    this._WEATHER_API_TOKEN = 'c800916f116117300293d90afd31aab1';
    this._URL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${this._WEATHER_API_TOKEN}/${locationCoordinates}?lang=${lang}&units=si`;
    return (await fetch(this._URL)).json();
  }
}
