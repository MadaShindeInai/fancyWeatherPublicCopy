export default class Image {
  constructor(
    linkToImage,
  ) {
    this._linkToImage = linkToImage;
  }

  static parse(response) {
    return new Image(
      response.links.download,
    );
  }

  get linkToImage() {
    return this._linkToImage;
  }
}
