export default class ImageProvider {
  static async getImage(summary, town) {
    this._UNSPLASH_API_TOKEN = '7118d7bac5b26d79c5fc5d735c9e2a52f0d2a4d7897bd6e61f25a9b29eaf1c6c';
    this._UNSPLASH_API_TOKEN2 = '0befbf182316cad78146a16286e63afa84cf9a204c5af610d54d03ec16996f7a';
    this._URL = `https://api.unsplash.com/photos/random?query=${summary},${town},winter,morning&client_id=${this._UNSPLASH_API_TOKEN}`;
    const res = await fetch(this._URL);
    if (res.headers.get('x-ratelimit-remaining') === '5') {
      alert('Осталость 5 обновлений');
    }
    return res.json();
  }
}
