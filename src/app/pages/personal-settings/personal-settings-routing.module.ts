import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalSettingsPage } from './personal-settings.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalSettingsPageRoutingModule {}
