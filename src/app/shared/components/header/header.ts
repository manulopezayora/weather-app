import { Component } from '@angular/core';
import { Icon } from '@components/icon/icon';
import { AvatarModule } from 'primeng/avatar';
import { Toolbar } from 'primeng/toolbar';

@Component({
  selector: 'app-header',
  imports: [Toolbar, AvatarModule, Icon],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

}
