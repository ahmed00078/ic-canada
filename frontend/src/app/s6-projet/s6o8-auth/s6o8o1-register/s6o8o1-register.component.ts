import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-s6o8o1-register',
  templateUrl: './s6o8o1-register.component.html',
  styleUrls: ['./s6o8o1-register.component.css']
})
export class S6o8o1RegisterComponent implements OnInit {
  form!: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address: ['', Validators.required],
    });
  }


  TS_Submit(): void {
    console.log("Form data being sent:", this.form.getRawValue());
    this.http.post('http://localhost:8000/api/accounts/register/', this.form.getRawValue())
      .subscribe({
        next: () => this.router.navigate(['/login/']),
        error: (error) => console.error('Error:', error)
      });
  }
}
