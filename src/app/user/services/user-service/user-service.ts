import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastService } from '@services/toast-service/toast-service';
import { first } from 'rxjs';
import { selectUser } from 'src/app/store/user/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private router = inject(Router);
  private toastService = inject(ToastService);
  private store = inject(Store);

  public createUser(user: User): void {
    const existUser = this.getUser(user.username);

    if (existUser) {
      this.toastService.showError('User is already exist');

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

  public addToFavorite(id: number): number {
    this.managementFavoritesFromLocalStorage(id, 'add');

    return id;
  }

  public removeFromFavorites(id: number): number {
    this.managementFavoritesFromLocalStorage(id, 'remove');

    return id;
  }

  private managementFavoritesFromLocalStorage(id: number, action: 'add' | 'remove'): void {
    this.store.select(selectUser).pipe(first()).subscribe(user => {

      const parsedUsers = this.getUsersFromLocalStorage();
      const userToEdit = parsedUsers.find(({ username }) => user?.username === username);

      if (userToEdit && action === 'add') {
        userToEdit.favorites = [...new Set([...(userToEdit?.favorites ?? []), id])];
      }

      if (userToEdit && action === 'remove') {
        userToEdit.favorites = userToEdit?.favorites?.filter(fav => fav !== id) ?? [];
      }

      const usersToSave = JSON.stringify(parsedUsers);
      localStorage.setItem('weatherUser', usersToSave);
    });
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
    this.toastService.showSuccess('User is created');
  }

}
