import { Component, Input } from '@angular/core';
import { Result } from '../interface/movie-result';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css']
})
export class MovielistComponent {

  constructor (private router:Router){}
  
  @Input() category: string = '';
  @Input() movieList: Result[] = [];

  
  goToDetail(movieID: number) {
    var id = movieID;
    this.router.navigateByUrl(`detail/${id}`);
  }
  

}
