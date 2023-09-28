import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
}
}
