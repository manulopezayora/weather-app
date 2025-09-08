import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUser } from 'src/app/store/user/user.actions';
import { UserService } from 'src/app/user/services/user-service/user-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userService = inject(UserService);
  private store = inject(Store);

  public login(user: User) {
    this.store.dispatch(loadUser({ user }));
  }

  public logout() {

  }

}
