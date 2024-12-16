import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    JSON.parse(localStorage.getItem('user')!) ? true : false
  );
  isLoggedInGuard: boolean = JSON.parse(localStorage.getItem('user')!)
    ? true
    : false;
  private auth = inject(AngularFireAuth);
  private toastor = inject(ToastrService);
  private router = inject(Router);
  logIn(email: string, password: string) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.logInData();
        this.toastor.success('LogIn Successfully..!');
        this.loggedIn$.next(true);
        this.isLoggedInGuard = true;
        this.router.navigate(['']);
      })
      .catch((e) => {
        this.toastor.warning(e);
      });
  }
  logInData() {
    this.auth.authState.subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }
  logOut() {
    this.auth.signOut().then(() => {
      this.toastor.success('User Logged Out Successfully..!');
      this.router.navigate(['login']);
    });
    this.loggedIn$.next(false);
    this.isLoggedInGuard = false;
    localStorage.removeItem('user');
  }
  isLoggedIn() {
    return this.loggedIn$.asObservable();
  }
}
