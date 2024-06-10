import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isUserLoggedIn();
  }

  onLogout() {
    this.authService.logout();
    this.isAuthenticated = false;
  }
}
