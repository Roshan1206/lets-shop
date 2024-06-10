import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      userEmail: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onLogin() {
    const userEmail = this.loginForm.value.userEmail;
    const password = this.loginForm.value.password;
    this.authService.login(userEmail, password).subscribe((data) => {
      // console.log(data);
      this.router.navigate(['/products']);
    });
    setTimeout(() => {
      window.location.reload();
    }, 200);
    // this.reloadPage();
  }

  reloadPage() {
    window.location.reload();
  }
}
