import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { loginReq } from '../model/login.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    Username: new FormControl(null, Validators.required),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
    ]),
  });
  loginSubscription: Subscription | undefined;
  errorSubscription: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginSubscription = this.authService
      .getLoginResponse()
      .subscribe((res) => {
        alert('login successfull');
        this.router.navigate(['home']);
      });

    this.errorSubscription = this.authService
      .getErrorRespose()
      .subscribe((err) => {
        alert(err);
      });
  }

  onsubmit(): void {
    if (this.loginForm.valid) {
      const req = {
        Username: this.loginForm.value.Username,
        password: this.loginForm.value.password,
      } as loginReq;
      this.authService.login(req);
      this.loginForm.reset();
    }
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) this.loginSubscription.unsubscribe();
    if (this.errorSubscription) this.errorSubscription.unsubscribe();
  }
}
