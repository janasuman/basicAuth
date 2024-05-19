import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { logOutResponse } from '../model/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
  logOutSubcription: Subscription | undefined;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.logOutSubcription = this.authService
      .getLogOutResponse()
      .subscribe((res: logOutResponse) => {
        this.router.navigate(['login']);
      });
  }

  logout(): void {
    this.authService.logoutapi();
  }

  ngOnDestroy(): void {
    if (this.logOutSubcription) this.logOutSubcription.unsubscribe();
  }
}
