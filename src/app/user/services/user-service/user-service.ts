import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public createUser(user: Partial<User>) {
    const existUser = localStorage.getItem(user.username!);

    if (!existUser) {
      const parsedUser = JSON.stringify(user);
      localStorage.setItem('weatherUser', parsedUser)
    }

    console.error('User is already exist');

  }

}
