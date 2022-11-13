import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LineLoginComponent } from './line-login/line-login.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: LineLoginComponent
  },
  {
    path: 'main',
    component: MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
