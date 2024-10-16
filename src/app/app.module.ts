import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx'; // Eklendi

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Start - ben ekledim - 2024-09-16 -> sil 12.09.2025
import { TranslatorService } from './services/translator.service';
// End - ben ekledim - 2024-09-16 -> sil 12.09.2025

// Translate loader function
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader, 
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    LocalNotifications, 
    TranslatorService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
