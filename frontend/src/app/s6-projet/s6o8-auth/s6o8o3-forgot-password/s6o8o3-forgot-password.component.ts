import { Component } from '@angular/core';
import { S_AuthService } from '../../services/authentifService/auth.service';

@Component({
  selector: 'app-s6o8o3-forgot-password',
  templateUrl: './s6o8o3-forgot-password.component.html',
  styleUrls: ['./s6o8o3-forgot-password.component.css'],
})
export class S6o8o3ForgotPasswordComponent {
  email: string = '';

  constructor(private V_authService: S_AuthService) {}

  TS_OnSubmit() {
    this.V_authService.forgotPassword(this.email).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
