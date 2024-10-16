import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';


const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
  // ,{
  //   path: 'home/:id',
  //   loadChildren: () => import('./pages/home/tab1/tab1.module').then( m => m.Tab1PageModule)
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
