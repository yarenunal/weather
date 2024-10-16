import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalSettingsPageRoutingModule } from './personal-settings-routing.module';

import { PersonalSettingsPage } from './personal-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalSettingsPageRoutingModule
  ],
  declarations: [PersonalSettingsPage]
})
export class PersonalSettingsPageModule {}
