import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '15298f47c69a475f8bc222956240409';
  private apiUrl = 'http://api.weatherapi.com/v1/forecast.json';  // Güncel endpoint: 'forecast.json'

  constructor() {}

  // Hava durumu verisi ve tahmin almak için API çağrısı. 'forecast.json' endpoint'i kullanılıyor.
  async getWeather(city: string, lang: string = 'en') {
    return (await axios
      .get(`${this.apiUrl}?key=${this.apiKey}&q=${city}&days=4&aqi=no&lang=${lang}`, { // 4 günlük tahmin için 'days=4' eklendi
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
        responseType: "json",
      })).data;
  }
}
