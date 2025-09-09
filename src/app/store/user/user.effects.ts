import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth-service/auth-service';
import { UserService } from 'src/app/user/services/user-service/user-service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);

  loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUser),
      exhaustMap(({ user }) => of(this.userService.getUserIsExist(user.username, user.password))
        .pipe(
          tap(() => this.router.navigateByUrl('/weather')),
          map(user => {
            const userParsed = user as User;
            this.authService.setLoggedIn(true);
            sessionStorage.setItem('weatherAppUserLogged', user?.username || '');

            return UserActions.loadUserSuccess({ user: userParsed });
          }),
          catchError(({ message }) => {
            this.authService.setLoggedIn(false);
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
