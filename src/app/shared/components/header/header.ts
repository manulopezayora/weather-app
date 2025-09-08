import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Icon } from '@components/icon/icon';
import { Store } from '@ngrx/store';
import { AvatarModule } from 'primeng/avatar';
import { Toolbar } from 'primeng/toolbar';
import { selectUser } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-header',
  imports: [Toolbar, AvatarModule, Icon, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  private store = inject(Store);

  public user$ = this.store.select(selectUser);

}
