import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  movieSub: Subscription = new Subscription();

  popularMovieList = [];
  nowPlayingList = [];
  topRatedList = [];
  upComingList = [];

  movieID?: number;
  backdrop_path: string = 'http://image.tmdb.org/t/p/w500/';
  poster_path: string = '';

  ngOnInit(): void {
    var result = this.apiService.getMovies('popular');
    this.movieSub = result.subscribe({
      next: (response: any) => {
        this.popularMovieList = response['results'];
        this.movieID = response['results'][1]['id'];
        this.backdrop_path = response['results'][1]['backdrop_path'];

        this.poster_path = response['resutls'][1]['poster_path'];
      },

      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });

    var result = this.apiService.getMovies('now_playing');
    this.movieSub = result.subscribe({
      next: (response: any) => {
        this.nowPlayingList = response['results'];
        this.movieID = response['results'][1]['id'];
        this.backdrop_path = response['results'][1]['backdrop_path'];

        this.poster_path = response['resutls'][1]['poster_path'];
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

        this.poster_path = response['resutls'][1]['poster_path'];
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

        this.poster_path = response['resutls'][1]['poster_path'];
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  // calling via button click 
  // getPopularMovie() {
  //   var result = this.apiService.getMovies('popular');
  //   this.movieSub = result.subscribe({
  //     next: (response: any) => {
  //       this.popularMovieList = response['results'];
  //       this.movieID = response['results'][1]['id'];
  //       this.backdrop_path = response['results'][1]['backdrop_path'];

  //       this.poster_path = response['resutls'][1]['poster_path'];
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

  //       this.poster_path = response['resutls'][1]['poster_path'];
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

  //       this.poster_path = response['resutls'][1]['poster_path'];
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

  //       this.poster_path = response['resutls'][1]['poster_path'];
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       console.log(err);
  //     },
  //   });
  // }

  // getDetails() {}

  // email: string = 'julioeleven3@gmail.com';
  // password: string = 'password';

  login() {
    // console.log(this.LoginForm?.value);
    var result = this.apiService.login();

    result.subscribe({
      next: (response: any) => {
        console.log(response.data);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}
