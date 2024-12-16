import { Component, inject } from '@angular/core';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthService);
  onSubmit(loginForm: any) {
    this.authService.logIn(loginForm.email, loginForm.password);
  }
}
