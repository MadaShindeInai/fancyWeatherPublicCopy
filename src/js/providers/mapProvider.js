export default class MapProvider {
  static init(latitude, longitude) {
    return new ymaps.Map('map', {
      center: [latitude, longitude],
      zoom: 9,
    });
  }
}
