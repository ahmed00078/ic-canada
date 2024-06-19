import { Component, OnInit } from '@angular/core';
import { S_AuthService } from '../services/authentifService/auth.service';

@Component({
  selector: 'app-s6o6-nav',
  templateUrl: './s6o6-nav.component.html',
  styleUrls: ['./s6o6-nav.component.css'],
})
export class S6o6NavComponent implements OnInit {
  constructor(public V_authService: S_AuthService) {}

  ngOnInit(): void {}

  TS_Logout() {
    this.V_authService.logout();
  }
}
