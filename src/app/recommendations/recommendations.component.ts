import { Component, Input, OnInit } from '@angular/core';
import { RcmdMovies, Result } from '../interface/rcmd-movies';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  constructor (private apiService:ApiService, private router:Router, private activatedRoute: ActivatedRoute){}
  
  rcmdSub: Subscription = new Subscription();

  rcmdMovieID!: number;
  rcmdMovieList: Result[] = [];

  ngOnInit(): void {
    this.rcmdMovieID = this.activatedRoute.snapshot.params['movieid'];
    this.getRcmdMovies();
  }

  getRcmdMovies() {
    var result = this.apiService.getRcmdMovies(this.rcmdMovieID);
    this.rcmdSub = result.subscribe({
      next: (response: RcmdMovies) => {
        this.rcmdMovieList = response.results!;
      }
    })
  }
  
  goToDetail(movieID: number) {
    this.router.navigateByUrl(`detail/${movieID}`);
  }

  ngOnDestroy() {
    if (this.rcmdSub) {
      this.rcmdSub.unsubscribe();
    }
  }

}
