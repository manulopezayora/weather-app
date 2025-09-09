import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private router = inject(Router);

  public createUser(user: User) {
    const existUser = this.getUser(user.username);

    if (existUser) {
      console.error('User is already exist');

      return;
    }

    this.saveUser({
      city: user.city || '',
      favorites: [],
      password: user.password || '',
      username: user.username || '',
    });
  }

  public getUser(username: string): User | undefined {
    const parsedUsers = this.getUsersFromLocalStorage();

    return parsedUsers?.find((user) => username === user.username);
  }

  public getUserIsExist(username: string, password: string): User | undefined {
    const parsedUsers = this.getUsersFromLocalStorage();

    return parsedUsers?.find((user) => username === user.username && password === user.password);
  }

  private getUsersFromLocalStorage(): User[] {
    const users = localStorage.getItem('weatherUser');
    return users ? JSON.parse(users) : [];
  }

  private saveUser(newUser: User): void {
    const parsedUsers = this.getUsersFromLocalStorage();
    const parsedUser = JSON.stringify([...parsedUsers, newUser]);
    localStorage.setItem('weatherUser', parsedUser);
    this.router.navigateByUrl('/login');
  }

}
