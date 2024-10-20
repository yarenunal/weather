import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { TranslatorService } from 'src/app/services/translator.service';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { LocalNotifications } from '@capacitor/local-notifications';

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
  forecastData: any[] = []; // 3 günlük hava tahmini için boş array
  city: string = 'Ankara'; // Varsayılan şehir

  constructor(
    private router: Router,
    private weatherService: WeatherService,
    private translatorService: TranslatorService
  ) {}

  // Sayfa yüklendiğinde çalışacak
  ionViewDidEnter() {
    const lang = this.translatorService.getDefaultLanguage();
    this.getCurrentLocationAndWeather(lang); // GPS üzerinden hava durumu sorgulama
  }

  // GPS üzerinden koordinatları alıp hava durumu sorgulama
  async getCurrentLocationAndWeather(lang: string) {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const lat = coordinates.coords.latitude;
      const lon = coordinates.coords.longitude;

      // Koordinatlarla hava durumu al
      this.getWeatherByCoordinates(lat, lon, lang);
    } catch (error) {
      console.error('Koordinatlar alınamadı:', error);
      // Eğer GPS'ten konum alınamazsa varsayılan şehir üzerinden hava durumu al
      this.getWeather(this.city, lang);
    }
  }

  // Şehir ismi ile hava durumu al
  async getWeather(city: string, lang: string = 'en') {
    try {
      const data: any = await this.weatherService.getWeather(city, lang);
      this.updateWeatherData(data);
    } catch (err: any) {
      console.error(err);
    }
  }

  // Koordinatlarla hava durumu al
  async getWeatherByCoordinates(lat: number, lon: number, lang: string = 'en') {
    try {
      const data: any = await this.weatherService.getWeatherByCoordinates(lat, lon, lang);
      this.updateWeatherData(data); // Hava durumu verilerini güncelle
    } catch (err: any) {
      console.error(err);
    }
  }

  // Hava durumu verilerini güncelle ve bildirim gönder
  updateWeatherData(data: any) {
    if (data && data.current && data.forecast) {
      this.weatherData = {
        status: data.current.condition.text,
        region: data.location.region,
        country: data.location.country,
        temperature: data.current.feelslike_c,
        humidity: data.current.humidity,
      };

      // 3 günlük hava tahmini
      if (data.forecast.forecastday && data.forecast.forecastday.length > 1) {
        this.forecastData = data.forecast.forecastday.slice(1, 4);
      }

      // Bildirim gönder
      this.showLocalNotification();
    } else {
      console.error('Veri formatı beklenmiyor:', data);
    }
  }

  // Hava durumu simgeleri
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

  // Yerel bildirim gönderme fonksiyonu
  async showLocalNotification() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'My App',
          body: `Current temperature in ${this.weatherData.region}: ${this.weatherData.temperature}°C`,
          id: Math.ceil(Math.random() * 100), // Rastgele bir ID
          schedule: { at: new Date(Date.now() + 1000 * 5) }, // 5 saniye sonra bildirim
          ongoing: false, // Ongoing false
        },
      ],
    });
  }
}
