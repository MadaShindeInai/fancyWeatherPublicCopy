export default class DateAndTimeProvider {
  static async getDataAndTime(latitude, longitude) {
    this._TIMEZONEDB_API_TOKEN = 'K5UVAAZB1SDD';
    this._URL = `https://api.timezonedb.com/v2.1/get-time-zone?key=${this._TIMEZONEDB_API_TOKEN}&format=json&by=position&lat=${latitude}&lng=${longitude}`;
    return (await fetch(this._URL)).json();
  }
}
