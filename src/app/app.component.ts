import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.initializeApp();
  }

  async initializeApp() {
    this.translate.setDefaultLang('en');

    // Bildirim izni isteme
    await LocalNotifications.requestPermissions();
  }
}
