import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { TranslatorService } from 'src/app/services/translator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  weatherData: any = {
    region: '',
    country: '',
    status: '',
    temperature: 0,
    humidity: 0,
  };
  forecastData: any[] = []; // 3 günlük hava tahmini için boş array 27.09
  city: string = 'Ankara';

  constructor(
    private router: Router,
    private weatherService: WeatherService,
    private translatorService: TranslatorService
  ) {}

  ionViewDidEnter() {
    const lang = this.translatorService.getDefaultLanguage();
    this.getWeather(this.city, lang);
  }

  async getWeather(city: string, lang: string = 'en') {
    try {
      const data: any = await this.weatherService.getWeather(city, lang);

      // Veriyi kontrol et, hem güncel hava durumu hem tahmin verisi var mı?
      if (data && data.current && data.forecast) {
        this.weatherData = {
          status: data.current.condition.text,
          region: data.location.region,
          country: data.location.country,
          temperature: data.current.feelslike_c,
          humidity: data.current.humidity,
        };

        // 3 günlük hava tahmini alınan yer 27.09
        if (data.forecast.forecastday && data.forecast.forecastday.length > 1) {
          this.forecastData = data.forecast.forecastday.slice(1, 4);
        }
      } else {
        console.error('Veri formatı beklenmiyor:', data);
      }
    } catch (err: any) {
      console.error(err);
    }
  }
  // Hava durumu simgeleri 27.09
  getWeatherIcon(condition: string): string {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return 'sunny-outline'; // Güneşli simgesi
      case 'rain':
        return 'rainy'; // Yağışlı simgesi
      case 'cloudy':
        return 'cloud-outline'; // Bulutlu simgesi
      case 'partly cloud':
        return 'partly-sunny-outline'; // Kısmen bulutlu simgesi
      case 'snow':
        return 'snow-outline'; // Kar simgesi
      default:
        return 'cloudy-night-outline'; // Bilinmeyen durum için varsayılan simge
    }
  }

  open(url: string) {
    if (url) this.router.navigateByUrl(url);
  }
}
