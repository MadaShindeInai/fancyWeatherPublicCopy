export default class Location {
  constructor(
    city,
    country,
    coordinates,
  ) {
    this._city = city;
    this._country = country;
    this._coordinates = coordinates;
  }

  static parse(locationResponse) {
    return new Location(locationResponse.city, locationResponse.country, locationResponse.loc);
  }

  get city() {
    return this._city;
  }

  get country() {
    return this._country;
  }

  set city(city) {
    this._city = city;
  }

  set country(country) {
    this._country = country;
  }

  get coordinates() {
    return this._coordinates;
  }
}
