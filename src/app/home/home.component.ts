import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  constructor(private apiService: ApiService, private router:Router) { }
  
  arcaneID: number = 94605;

  goToDetail() {
    this.router.navigateByUrl(`detail/${this.arcaneID}`);
  }

}
