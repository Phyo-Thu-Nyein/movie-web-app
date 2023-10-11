import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Movie, Result } from '../interface/movie-result';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as Flickity from 'flickity';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

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

  //loading
  loading: boolean = true;

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
        
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
    
    setTimeout(() => {
      this.loading = false;
    }, 100);
  }

  @ViewChild('carousel') carousel!: ElementRef;
  ngAfterViewInit(): void {
    setTimeout(() => {
      const flkty = new Flickity(this.carousel.nativeElement, {
        wrapAround: true,
        autoPlay: 2500,
        lazyLoad: true,
      });
    }, 600);
      
    
  }

  // reloadPage() {
  //   window.location.reload();
  //   console.log("it works, the reloading");
  // }

  goToDetail(movieID: number) {
    var id = movieID;
    this.router.navigateByUrl(`detail/${id}`);
  }

  ngOnDestroy() {
    if (this.movieSub) {
      this.movieSub.unsubscribe();
    }
    // if (this.mySubscription) {
    //   this.mySubscription.unsubscribe();
    // }
  }
}
