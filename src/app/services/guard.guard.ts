import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

export const guardGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);
  let toastr = inject(ToastrService);
  if (authService.isLoggedInGuard) {
    return true;
  } else {
    router.navigate(['login']);
    toastr.warning('You Donot Have Permission To Access');
    return false;
  }
};
