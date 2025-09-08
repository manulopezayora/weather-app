import { inject, Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUser } from 'src/app/store/user/user.actions';
import { UserService } from 'src/app/user/services/user-service/user-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userService = inject(UserService);
  private store = inject(Store);

  public loggedIn = signal<boolean>(false);

  public setLoggedIn(value: boolean): void {
    this.loggedIn.set(value);
  }

  public login(user: User): void {
    this.store.dispatch(loadUser({ user }));
  }

  public logout() {

  }

}
