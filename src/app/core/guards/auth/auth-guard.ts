import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.loggedIn()) {
    return router.createUrlTree(['/auth/login']);
  }

  return true;
};

export const authMatchGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);

  return authService.loggedIn();
};
