import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-personal-settings',
  templateUrl: './personal-settings.page.html',
  styleUrls: ['./personal-settings.page.scss'],
})
export class PersonalSettingsPage implements OnInit {
  settings = [
    { description: 'Hava Kaç Derecedeyken Hırka İhtiyacı Hissedersiniz', userInput: '18' },
    { description: 'Hava Kaç Derecedeyken Üşümeye Başlayıp Mont İhtiyacı Hissedersiniz', userInput: '10' },
    { description: 'Hava Kaç Derecedeyken Terlemeye Başlarsınız', userInput: '25' },
    { description: 'Hava Kaç Derecedeyken Sizin İçin İdealdir', userInput: '20' },
  ];

  selectedHour: string = ''; // Seçilen saat
  selectedMinute: string = ''; // Seçilen dakika
  hours: string[] = []; // Saatleri tutan dizi
  minutes: string[] = []; // Dakikaları tutan dizi

  constructor(private localNotifications: LocalNotifications, private weatherService: WeatherService) {}

  ngOnInit() {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      this.settings = JSON.parse(savedSettings);
    }

    // Daha önce kaydedilmiş bildirim saatini al
    this.selectedHour = localStorage.getItem('selectedHour') || '';
    this.selectedMinute = localStorage.getItem('selectedMinute') || '';

    // 24 saat dilimini oluştur
    this.hours = Array.from({ length: 24 }, (_, index) => {
      const hour = index < 10 ? `0${index}` : `${index}`; // 00, 01... 23 formatında saat
      return hour;
    });

    // 60 dakika dilimini oluştur
    this.minutes = Array.from({ length: 60 }, (_, index) => {
      const minute = index < 10 ? `0${index}` : `${index}`; // 00, 01... 59 formatında dakika
      return minute;
    });
  }

  updateUserInput(index: number, value: string) {
    this.settings[index].userInput = value;
    this.saveSettings();
  }

  saveSettings() {
    localStorage.setItem('userSettings', JSON.stringify(this.settings));
    localStorage.setItem('selectedHour', this.selectedHour); // Seçilen saati kaydet
    localStorage.setItem('selectedMinute', this.selectedMinute); // Seçilen dakikayı kaydet
  }

  setNotification() {
    // Hava durumu verisini al
    this.weatherService.getWeather('Ankara').then(weatherData => {
      const temp = weatherData.current.temp_c; // Anlık sıcaklık
      const description = weatherData.current.condition.text; // Hava durumu açıklaması

      // Kullanıcının ayarlarını kontrol et
      const sweaterTemp = parseInt(this.settings[0].userInput, 10);
      const coatTemp = parseInt(this.settings[1].userInput, 10);
      const hotTemp = parseInt(this.settings[2].userInput, 10);
      const idealTemp = parseInt(this.settings[3].userInput, 10);

      let recommendation = '';

      // Hava durumu tavsiyesi ver
      if (temp <= coatTemp) {
        recommendation = `Hava şu an ${temp}°C, montunuzu giymeyi unutmayın!`;
      } else if (temp <= sweaterTemp) {
        recommendation = `Hava şu an ${temp}°C, bir hırka iyi olabilir.`;
      } else if (temp >= hotTemp) {
        recommendation = `Hava şu an ${temp}°C, sıcak bir gün, rahat giysiler tercih edin!`;
      } else if (temp === idealTemp) {
        recommendation = `Hava şu an ${temp}°C, tam size göre!`;
      } else {
        recommendation = `Hava şu an ${temp}°C, gününüz keyifli geçsin!`;
      }

      // Kullanıcının belirlediği saat ve dakikayı al
      const notificationHour = parseInt(this.selectedHour, 10);
      const notificationMinute = parseInt(this.selectedMinute, 10);

      // Bildirim ayarla
      this.localNotifications.schedule({
        id: 1,
        title: 'Hava Durumu Bildirimi',
        text: `${description}. ${recommendation}`, // Özelleştirilmiş bildirim metni
        trigger: { at: new Date(new Date().setHours(notificationHour, notificationMinute, 0, 0)) },
        foreground: true,
      });

      console.log('Bildirim ayarlandı:', `${this.selectedHour}:${this.selectedMinute}`, `Hava durumu: ${temp}°C, ${description}`);
    }).catch(error => {
      console.error('Hava durumu alınırken hata oluştu:', error);
    });
  }
}
