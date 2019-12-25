export default class ElementForListener {
  constructor(
    buttonSearchRef,
    inputFieldRef,
    buttonRefreshBgkRef,
    btnCelsiusRef,
    btnFahrenheitRef,
    languageSwitcherRef,
  ) {
    this._buttonSearchRef = buttonSearchRef;
    this._inputFieldRef = inputFieldRef;
    this._buttonRefreshBgkRef = buttonRefreshBgkRef;
    this._btnCelsiusRef = btnCelsiusRef;
    this._btnFahrenheitRef = btnFahrenheitRef;
    this._languageSwitcherRef = languageSwitcherRef;
  }

  get buttonSearchRef() {
    return this._buttonSearchRef;
  }

  get inputFieldRef() {
    return this._inputFieldRef;
  }

  get buttonRefreshBgkRef() {
    return this._buttonRefreshBgkRef;
  }

  get btnCelsiusRef() {
    return this._btnCelsiusRef;
  }

  get btnFahrenheitRef() {
    return this._btnFahrenheitRef;
  }

  get languageSwitcherRef() {
    return this._languageSwitcherRef;
  }
}
