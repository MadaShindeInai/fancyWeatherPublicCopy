import Render from './render';
import LocationProvider from './providers/locationProvider';
import WeatherProvider from './providers/weatherProvider';
import ImageProvider from './providers/imageProvider';
import MapUpdater from './providers/mapUpdater';
import MapProvider from './providers/mapProvider';
import DateAndTimeProvider from './providers/dateAndTimeProvider';
import TranslateProvider from './providers/translateProvider';
import FanсyWeather from './module/fancyWeather';
import { OPTIONS } from './module/options';
import Image from './module/image';
import { AVAILABLE_LANGUAGES } from './module/languages';

export default class App {
  static async execute() {
    const renderInit = Render.renderInit();
    let langValue = AVAILABLE_LANGUAGES.ENG;
    const locationResponse = await LocationProvider.getLocationParams();
    const { loc, city } = locationResponse;
    let locArr = loc.split(',');
    let detailWeatherResponse = await WeatherProvider.getWeatherParams(loc);
    const imageResponse = await ImageProvider.getImage(
      detailWeatherResponse.currently.summary,
      city,
    );
    let temp = await DateAndTimeProvider.getDataAndTime(+locArr[0], +locArr[1]);
    let currentTimezoneTime = new Date(temp.formatted).getTime();

    let fancyWeather = FanсyWeather.parse(
      locationResponse,
      detailWeatherResponse,
      imageResponse,
    );
    setInterval(() => {
      currentTimezoneTime += 1000;
      document.querySelector('.main__data-and-time').innerText = new Date(currentTimezoneTime).toLocaleString(`${langValue}`, OPTIONS).toUpperCase();
    }, 1000);

    const myMap = MapProvider.init(+locArr[0], +locArr[1]);

    Render.render(fancyWeather, langValue);


    renderInit.buttonSearchRef.addEventListener('click', async () => {
      try {
        const inputValue = renderInit.inputFieldRef.value;
        const getInputLocationRes = await MapUpdater.changeCity(inputValue, myMap);
        locArr = getInputLocationRes.loc.split(',');
        temp = await DateAndTimeProvider.getDataAndTime(+locArr[0], +locArr[1]);
        currentTimezoneTime = new Date(temp.formatted).getTime();

        detailWeatherResponse = await WeatherProvider.getWeatherParams(
          getInputLocationRes.loc,
        );

        const tempImageResponse = await ImageProvider.getImage(
          detailWeatherResponse.currently.summary,
          inputValue,
        );
        this.tempImgLink = Image.parse(tempImageResponse);
        fancyWeather.image = this.tempImgLink;

        fancyWeather = FanсyWeather.parse(
          getInputLocationRes,
          detailWeatherResponse,
          tempImageResponse,
        );
        const locCityRes = await TranslateProvider.getTranslaterResponce(
          getInputLocationRes.city,
          langValue,
        );
        const locCountryRes = await TranslateProvider.getTranslaterResponce(
          getInputLocationRes.country,
          langValue,
        );
        fancyWeather.location.city = locCityRes.text || '';
        fancyWeather.location.country = locCountryRes.text;
        fancyWeather.detailWeather.time = currentTimezoneTime * 1000;

        Render.render(fancyWeather, langValue);
      } catch (err) {
        alert('You entered an invalid request! Enter the name of the city, country, or coordinates separated by a comma!');
      }
    });

    document.body.addEventListener('keydown', async (e) => {
      if (e.keyCode !== 13) return;
      try {
        const inputValue = renderInit.inputFieldRef.value;
        const getInputLocationRes = await MapUpdater.changeCity(inputValue, myMap);
        locArr = getInputLocationRes.loc.split(',');
        temp = await DateAndTimeProvider.getDataAndTime(+locArr[0], +locArr[1]);
        currentTimezoneTime = new Date(temp.formatted).getTime();

        detailWeatherResponse = await WeatherProvider.getWeatherParams(
          getInputLocationRes.loc,
        );

        const tempImageResponse = await ImageProvider.getImage(
          detailWeatherResponse.currently.summary,
          inputValue,
        );
        this.tempImgLink = Image.parse(tempImageResponse);
        fancyWeather.image = this.tempImgLink;

        fancyWeather = FanсyWeather.parse(
          getInputLocationRes,
          detailWeatherResponse,
          tempImageResponse,
        );

        const responceCity = await TranslateProvider.getTranslaterResponce(
          getInputLocationRes.city,
          langValue,
        );

        fancyWeather.location.city = responceCity.text;

        const responceCountry = await TranslateProvider.getTranslaterResponce(
          getInputLocationRes.country,
          langValue,
        );

        fancyWeather.location.country = responceCountry.text;

        fancyWeather.detailWeather.time = currentTimezoneTime * 1000;
        Render.render(fancyWeather, langValue);
      } catch (err) {
        alert('You entered an invalid request! Enter the name of the city, country, or coordinates separated by a comma!');
      }
    });

    renderInit.languageSwitcherRef.addEventListener('change', async (event) => {
      const inputValue = renderInit.inputFieldRef.value || 'Minsk';
      const getInputLocationRes = await MapUpdater.changeCity(inputValue, myMap);
      langValue = event.srcElement.value.toLowerCase();
      detailWeatherResponse = await WeatherProvider.getWeatherParams(locArr.join(','), langValue);
      const tempImageResponse = await ImageProvider.getImage(
        detailWeatherResponse.currently.summary,
        inputValue,
      );
      this.tempImgLink = Image.parse(tempImageResponse);
      fancyWeather.image = this.tempImgLink;
      fancyWeather = FanсyWeather.parse(
        getInputLocationRes,
        detailWeatherResponse,
        tempImageResponse,
      );
      const locCityRes = await TranslateProvider.getTranslaterResponce(
        getInputLocationRes.city,
        langValue,
      );
      const locCountryRes = await TranslateProvider.getTranslaterResponce(
        getInputLocationRes.country,
        langValue,
      );
      fancyWeather.location.city = locCityRes.text;
      fancyWeather.location.country = locCountryRes.text;
      Render.renderLocation(fancyWeather.location);
      Render.renderWeather(fancyWeather.detailWeather);
      Render.renderForecast(fancyWeather.forecast, langValue);
    });
  }

  static async refreshBgi() {
    document.querySelector('.tools__refresh-button').addEventListener('click', async () => {
      const tempImageResponse = await ImageProvider.getImage(
        document.querySelector('.sky').innerHTML,
        document.querySelector('.location__city').innerHTML,
      );
      this.tempImgLink = Image.parse(tempImageResponse);
      document.querySelector('.wrapper').style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${this.tempImgLink.linkToImage}')`;
      document.querySelector('.wrapper').style.backgroundPosition = 'center center';
      document.querySelector('.wrapper').style.backgroundSize = 'cover';
    });
  }

  static async switchToFahrenheit() {
    document.querySelector('.tools__fahrenheit-btn').addEventListener('click', () => {
      document.querySelectorAll('.degreesSwitcher').forEach((element) => {
        const fahrenheitValue = Math.round(element.innerText.slice(0, -1) * 1.8 + 32);
        element.innerText = `${fahrenheitValue}°`;
        document.querySelector('.tools__fahrenheit-btn').style.display = 'none';
        document.querySelector('.tools__celsius-btn').style.display = 'block';
      });
    });
  }

  static async switchToCelcius() {
    document.querySelector('.tools__celsius-btn').addEventListener('click', () => {
      document.querySelectorAll('.degreesSwitcher').forEach((element) => {
        const celsiusValue = Math.round((element.innerText.slice(0, -1) - 32) * (5 / 9));
        element.innerText = `${celsiusValue}°`;
        document.querySelector('.tools__celsius-btn').style.display = 'none';
        document.querySelector('.tools__fahrenheit-btn').style.display = 'block';
      });
    });
  }
}
