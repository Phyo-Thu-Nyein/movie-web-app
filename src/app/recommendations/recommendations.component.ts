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

  // data!: RcmdMovies;
  rcmdMovieID!: number;
  rcmdMovieList: Result[] = [];
  rcmd_movies!: number;
  // NoResult: any;

  ngOnInit(): void {
    this.rcmdMovieID = this.activatedRoute.snapshot.params['movieid'];
    this.getRcmdMovies();
  }

  getRcmdMovies() {
    var result = this.apiService.getRcmdMovies(this.rcmdMovieID);
    this.rcmdSub = result.subscribe({
      next: (response: RcmdMovies) => {
        this.rcmdMovieList = response.results!;
        console.log("total results right below")
        console.log(response.total_results);
        this.rcmd_movies = response.total_results!;
        // this.total_pages = response.total_pages!;
        // if (response.total_results == 0) {
        //   this.NoResult = null;
        // }
      }
    })
  }
  
  goToDetail(movieID: number) {
    this.router.navigate([`detail/${movieID}`]);
  }

  ngOnDestroy() {
    if (this.rcmdSub) {
      this.rcmdSub.unsubscribe();
    }
  }

}
