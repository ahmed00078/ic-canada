import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakingAppComponent } from './making-app/making-app.component';
import { AppReaderComponent } from './app-reader/app-reader.component';
import { HomeComponent } from './home/home.component';
import { S6o7HomeComponent } from './s6-projet/s6o7-home/s6o7-home.component';
import { S6o8o2LoginComponent } from './s6-projet/s6o8-auth/s6o8o2-login/s6o8o2-login.component';
import { S6o8o1RegisterComponent } from './s6-projet/s6o8-auth/s6o8o1-register/s6o8o1-register.component';
import { S6o8o3ForgotPasswordComponent } from './s6-projet/s6o8-auth/s6o8o3-forgot-password/s6o8o3-forgot-password.component';
import { S6o8o4ConfirmationMsgComponent } from './s6-projet/s6o8-auth/s6o8o4-confirmation-msg/s6o8o4-confirmation-msg.component';
import { S6o5o1GestionDBComponent } from './s6-projet/s6o5-pages/s6o5o1-GestionDB/s6o5o1-GestionDB.component';
import { S6o5o2GestionRapportsComponent } from './s6-projet/s6o5-pages/s6o5o2-GestionRapports/s6o5o2-GestionRapports.component';
import { S6o5o3GestionAccessComponent } from './s6-projet/s6o5-pages/s6o5o3-GestionAccess/s6o5o3-GestionAccess.component';


const routes: Routes = [
  { path: '', component: S6o7HomeComponent },
  { path: 'login', component: S6o8o2LoginComponent },
  { path: 'register', component: S6o8o1RegisterComponent },
  { path: 'forgot-password', component: S6o8o3ForgotPasswordComponent },
  { path: 'confirmation', component: S6o8o4ConfirmationMsgComponent },
  { path: 'GestionDB', component: S6o5o1GestionDBComponent },
  { path: 'GestionRapports', component: S6o5o2GestionRapportsComponent},
  { path: 'GestionAccess', component: S6o5o3GestionAccessComponent},
  

  {
    path:"making-app/:id", 
    component:MakingAppComponent
  },
  {
    path: "app-reader/:id",
    component: AppReaderComponent
  },
  {
    path: "websites",
    component:HomeComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
