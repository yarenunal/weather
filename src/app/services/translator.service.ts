import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {

  constructor(private translateService: TranslateService) { }

  getDefaultLanguage() {
    const language = this.translateService.getBrowserLang();
    console.log(language);
    this.translateService.setDefaultLang(language ? language : 'en-US');
    return language ? language : 'en-US';
  }

  setLanguage(language: string) {
    this.translateService.use(language);
  }
}
