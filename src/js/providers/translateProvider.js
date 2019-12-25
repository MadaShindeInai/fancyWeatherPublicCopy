export default class TranslateProvider {
  static async getTranslaterResponce(text, lang = 'en') {
    this._TRANSLATER_API_TOKEN = 'trnsl.1.1.20191213T213840Z.5864933b0399010a.0bf83f6bb93b934af8f955bb7f3de5abdf41c646';
    this._URL = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this._TRANSLATER_API_TOKEN}&text=${text}&lang=${lang}`;
    return (await fetch(this._URL)).json();
  }
}
