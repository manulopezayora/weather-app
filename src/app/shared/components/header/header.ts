import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Icon } from '@components/icon/icon';
import { Store } from '@ngrx/store';
import { PrimeIcons } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { Menu } from 'primeng/menu';
import { Toolbar } from 'primeng/toolbar';
import { AuthService } from 'src/app/core/services/auth-service/auth-service';
import { selectUser } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-header',
  imports: [
    AvatarModule,
    Icon,
    Menu,
    Toolbar,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  private store = inject(Store);
  private authService = inject(AuthService);

  public user = toSignal(this.store.select(selectUser));
  public menuItems = computed(() => [
    {
      label: this.user()?.username,
      items: [
        {
          label: 'Log out',
          icon: PrimeIcons.SIGN_OUT,
          command: () => this.authService.logout()
        }
      ]
    }
  ]);
}
