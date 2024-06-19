import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { S_AuthService } from '../../services/authentifService/auth.service';

@Component({
  selector: 'app-s6o8o2-login',
  templateUrl: './s6o8o2-login.component.html',
  styleUrls: ['./s6o8o2-login.component.css'],
})
export class S6o8o2LoginComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private V_authService: S_AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  TS_Submit(): void {
    const { email, password } = this.form.getRawValue();
    this.V_authService.login(email, password).subscribe(() => {
      this.router.navigate(['/']); // Redirect to home page on successful login
    });
  }
}
