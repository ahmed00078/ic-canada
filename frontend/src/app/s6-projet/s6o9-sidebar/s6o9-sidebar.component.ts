import { Component} from '@angular/core';
import {trigger,state,style,transition,animate,} from '@angular/animations';

@Component({
  selector: 'app-s6o9-sidebar',
  templateUrl: './s6o9-sidebar.component.html',
  styleUrls: ['./s6o9-sidebar.component.css'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          width: '250px',
        })
      ),
      state(
        'closed',
        style({
          width: '70px',
        })
      ),
      transition('open <=> closed', [animate('0.1s')]),
    ]),
  ],
})

export class S6o9SidebarComponent {
  isOpen = false;
  hover = false;
  TS_ToggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
