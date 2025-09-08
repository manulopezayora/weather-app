import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { UserService } from 'src/app/user/services/user-service/user-service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUser),
      exhaustMap(({ user }) => of(this.userService.getUser(user.username, user.password))
        .pipe(
          map(user => {
            const userParsed = user as User;
            return UserActions.loadUserSuccess({ user: userParsed });
          }),
          catchError(({ message }) => of(UserActions.loadUserFailure({ error: message})))
        )
      )
    );
  });
}
