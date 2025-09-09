import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth-service/auth-service';
import { ToastService } from 'src/app/shared/services/toast-service/toast-service';
import { UserService } from 'src/app/user/services/user-service/user-service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUser),
      exhaustMap(({ user }) => of(this.userService.getUserIsExist(user.username, user.password))
        .pipe(
          map(user => {

            if (!user) {
              throw Error('The username or password is incorrect');
            }

            const userParsed = user as User;
            this.authService.setLoggedIn(true);
            sessionStorage.setItem('weatherAppUserLogged', user?.username || '');
            this.router.navigateByUrl('/weather');

            return UserActions.loadUserSuccess({ user: userParsed });
          }),
          catchError(({ message }) => {
            this.authService.setLoggedIn(false);
            this.toastService.showError(message);
            sessionStorage.removeItem('weatherAppUserLogged');

            return of(UserActions.loadUserFailure({ error: message}));
          })
        )
      )
    );
  });

  logoutUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.logoutUser),
      exhaustMap(() => of(sessionStorage.removeItem('weatherAppUserLogged'))
        .pipe(
          map(() => {
            this.router.navigateByUrl('/auth/login');
            this.authService.setLoggedIn(false);

            return UserActions.logoutUserSuccess();
          }),
          catchError(({ message }) => of(UserActions.logoutUserFailure({ error: message})))
        )
      )
    );
  });
}
