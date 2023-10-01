import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { Movie, Result } from '../interface/movie-result';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  constructor(private apiService: ApiService, private router: Router, private activatedRoute:ActivatedRoute) {  }

  //loading
  loading: boolean = true;
  // mySubscription: Subscription = new Subscription();
  movieSub: Subscription = new Subscription();

  popularMovieList: Result[] = [];
  nowPlayingList: Result[] = [];
  topRatedList: Result[] = [];
  upComingList: Result[] = [];

  movieID?: number;
  backdrop_path: string = '';
  // http://image.tmdb.org/t/p/w500/
  poster_path: string = '';

  ngOnInit() {

    var result = this.apiService.getMovies('popular');
    this.movieSub = result.subscribe({
      next: (response: Movie) => {
        this.popularMovieList = response.results!;
        console.log(this.popularMovieList[1].id);
        this.movieID = response.results![1].id;
        this.backdrop_path = response.results![1].backdrop_path!;
        this.poster_path = response.results![1].poster_path!;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });

    var result = this.apiService.getMovies('now_playing');
    this.movieSub = result.subscribe({
      next: (response: any) => {
        this.nowPlayingList = response['results'];
        this.backdrop_path = response['results'][2]['backdrop_path'];
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });

    var result = this.apiService.getMovies('top_rated');
    this.movieSub = result.subscribe({
      next: (response: any) => {
        this.topRatedList = response['results'];
        this.movieID = response['results'][1]['id'];
        this.backdrop_path = response['results'][1]['backdrop_path'];

        this.poster_path = response['results'][1]['poster_path'];
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });

    var result = this.apiService.getMovies('upcoming');
    this.movieSub = result.subscribe({
      next: (response: any) => {
        this.upComingList = response['results'];
        this.movieID = response['results'][1]['id'];
        this.backdrop_path = response['results'][1]['backdrop_path'];

        this.poster_path = response['results'][1]['poster_path'];
        //loading
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  goToDetail(movieID: number) {
    var id = movieID;
    this.router.navigateByUrl(`detail/${id}`);

  }

  ngOnDestroy() {
    
    if (this.movieSub) {
      this.movieSub.unsubscribe();
    }
  }

  // getMovie() {
  //   return new Promise((resolve) => {
  //     var result = this.apiService.getMovies('popular');
  //     this.movieSub = result.subscribe({
  //       next: (response: any) => {
  //         this.popularMovieList = response['results'];
  //         console.log(this.popularMovieList[1]['id'])
  //         this.movieID = response['results'][1]['id'];
  //         this.backdrop_path = response['results'][1]['backdrop_path'];

  //         this.poster_path = response['results'][1]['poster_path'];
  //         resolve(true);
  //       },

  //       error: (err: HttpErrorResponse) => {
  //         console.log(err);
  //         resolve(false);
  //       },
  //     });
  //   });
  // }

  // toDetails(movieID: number) {
  //   const navigationExtras: NavigationExtras = {
  //     state: {
  //       'overview': 'hello'
  //     }
  //   };
  //   this.router.navigate([`details/${movieID}`], {state: {example: 'bar'}})
  // }

  // calling via button click
  // getPopularMovie() {
  //   var result = this.apiService.getMovies('popular');
  //   this.movieSub = result.subscribe({
  //     next: (response: any) => {
  //       this.popularMovieList = response['results'];
  //       this.movieID = response['results'][1]['id'];
  //       this.backdrop_path = response['results'][1]['backdrop_path'];

  //       this.poster_path = response['results'][1]['poster_path'];
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       console.log(err);
  //     },
  //   });
  // }

  // getNowPlayingMovie() {
  //   var result = this.apiService.getMovies('now_playing');
  //   this.movieSub = result.subscribe({
  //     next: (response: any) => {
  //       this.nowPlayingList = response['results'];
  //       this.movieID = response['results'][1]['id'];
  //       this.backdrop_path = response['results'][1]['backdrop_path'];

  //       this.poster_path = response['results'][1]['poster_path'];
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       console.log(err);
  //     },
  //   });
  // }

  // getTopRatedMovie() {
  //   var result = this.apiService.getMovies('top_rated');
  //   this.movieSub = result.subscribe({
  //     next: (response: any) => {
  //       this.topRatedList = response['results'];
  //       this.movieID = response['results'][1]['id'];
  //       this.backdrop_path = response['results'][1]['backdrop_path'];

  //       this.poster_path = response['results'][1]['poster_path'];
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       console.log(err);
  //     },
  //   });
  // }

  // getUpcomingMovie() {
  //   var result = this.apiService.getMovies('upcoming');
  //   this.movieSub = result.subscribe({
  //     next: (response: any) => {
  //       this.upComingList = response['results'];
  //       this.movieID = response['results'][1]['id'];
  //       this.backdrop_path = response['results'][1]['backdrop_path'];

  //       this.poster_path = response['results'][1]['poster_path'];
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       console.log(err);
  //     },
  //   });
  // }

  // getDetails() {}

  // email: string = 'julioeleven3@gmail.com';
  // password: string = 'password';
}
