import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  userEmail = '';
  authService = inject(AuthService);
  isLoggedIn$!: Observable<boolean>;
  constructor() {
    if (JSON.parse(localStorage.getItem('user')!)) {
      this.userEmail = JSON.parse(localStorage.getItem('user')!).email;
    }
  }
  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }
  logout() {
    this.authService.logOut();
  }
}
