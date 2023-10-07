import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  constructor(
    private router: Router,
    private cookieService: CookieService
  ) { }
  
  // movieName: any = document.querySelector('input')?.textContent;
  // search() {
  //   this.router.navigateByUrl(`search/${this.movieName}`);
  //   console.log(this.movieName);
  // }

  handleSearch() {
    const searchBox = document.getElementById('searchBox') as HTMLInputElement;
  
    if (searchBox) {
      const searchValue = searchBox.value;
      console.log('Search value:', searchValue);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl(`search/${searchValue}`)
  
      // Use the searchValue as needed
    } else {
      console.error('Search box not found.');
    }
  }

  logout() {
    this.cookieService.delete('token');
    this.router.navigateByUrl('');
  }

}
