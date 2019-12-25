export default class LocationProvider {
  static async getLocationParams() {
    this._IPINFO_API_TOKEN = '52eaa50f9a9473';
    this._URL = `https://ipinfo.io/json?token=${this._IPINFO_API_TOKEN}`;
    return (await fetch(this._URL)).json();
  }
}
