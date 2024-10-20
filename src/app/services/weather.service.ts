import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '15298f47c69a475f8bc222956240409';
  private apiUrl = 'http://api.weatherapi.com/v1/forecast.json';  // Güncel endpoint: 'forecast.json'

  constructor() {}

  // Şehir ismi ile hava durumu verisi ve tahmin almak için API çağrısı
  async getWeather(city: string, lang: string = 'en') {
    return (await axios.get(`${this.apiUrl}?key=${this.apiKey}&q=${city}&days=4&aqi=no&lang=${lang}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
      responseType: "json",
    })).data;
  }

  // Koordinatlar ile hava durumu verisi almak için API çağrısı
  async getWeatherByCoordinates(lat: number, lon: number, lang: string = 'en') {
    return (await axios.get(`${this.apiUrl}?key=${this.apiKey}&q=${lat},${lon}&days=4&aqi=no&lang=${lang}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
      responseType: "json",
    })).data;
  }
}
