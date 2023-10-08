import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MovieDetails, Genre, ProductionCompany, ProductionCountry} from '../interface/movie-details';
import { Cast, CastDetails } from '../interface/cast-details';
import { TrailerDetails, trailerResult } from '../interface/trailer-details';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private router: Router  
  ) { 

    }

  movieSub: Subscription = new Subscription();
  castSub: Subscription = new Subscription();
  trailerSub: Subscription = new Subscription();

  safeSrc?: SafeResourceUrl;
  popVidSrc?: SafeResourceUrl;
  // ytUrl: string = '';

  //SKELETON LOADER 
  loading: boolean = true;

  //MOVIE DETAILS
  movieID!: number;
  bg_path: string = '';
  poster: string = '';
  movieTitle: string = '';
  rating!: number;
  imbd: string = '';
  runtime!: number;
  overview: string = '';
  release_date!: Date;
  genres: Genre[] = [];
  casts: Cast[] = [];
  countries: ProductionCountry[] = [];
  companies: ProductionCompany[] = [];
  trailer: trailerResult[] = [];
  trailerKey: string = '';
  // trailerSize!: number;
  // trailerIndex!: number;


  ngOnInit() {
    this.movieID = this.activatedRoute.snapshot.params['movieid'];
    // console.log(this.movieID);
    
    this.getCasts();
    this.getTrailerKey();
    this.trailerYT();
    this.getMovieDetails();
    
  }


  getMovieDetails() {
    var result = this.apiService.getDetails(this.movieID);
    this.movieSub = result.subscribe({
      next: (response: MovieDetails) => {
        this.bg_path = response.backdrop_path!;
        this.poster = response.poster_path!;
        this.movieTitle = response.title!;
        this.rating = response.vote_average!;
        this.imbd = this.rating.toFixed(1);
        this.runtime = response.runtime!;
        this.overview = response.overview!;
        this.release_date = response.release_date!;
        this.genres = response['genres']!;
        this.countries = response['production_countries']!;
        this.companies = response['production_companies']!;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  getCasts() {
    var result = this.apiService.getCasts(this.movieID);
    this.castSub = result.subscribe({
      next: (response: CastDetails) => {
        this.casts = response['cast']!;
        // for (let i = 0; i < this.casts.length; i++) {
        //   if (this.casts[i].profile_path == "null") {
        //     this.casts[i].profile_path == "../../assets/img/null-profile.jpg";
        //   }
        // }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
    
  }

  getTrailerKey() {
    var result =  this.apiService.getTrailer(this.movieID);
    this.trailerSub = result.subscribe({
      next: (response: TrailerDetails) => {
        this.trailer = response['results']!;
        // this.ytUrl = `https://www.youtube.com/embed/${this.trailerKey}?controls=0&autoplay=1&mute=1&playsinline=1&playlist=${this.trailerKey}&loop=1`;
 
        //getting a teaser or trailer (not promo, interview or anything else.)
         for (let i = 0; i < this.trailer.length; i++) {
          if (this.trailer[i].type == "Trailer" ) {
            this.trailerKey = this.trailer[i].key!;
            break;
          }
          for (let i = 0; i < this.trailer.length; i++) {
            if (this.trailer[i].type == "Teaser") {
              this.trailerKey = this.trailer[i].key!;
              break;
            }
          }
         }
        
         console.log("trailer key here")
         console.log(this.trailerKey);
 
        this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.trailerKey}?start=6&end=90&controls=0&autoplay=1&mute=1&playsinline=1&playlist=${this.trailerKey}&loop=1`);
        this.popVidSrc = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.trailerKey}`);

        // this.trailerKey = this.trailer[4].key!;
        // this.trailerSize = this.trailer[0].size!;
        // console.log(this.trailerKey);
        // console.log(this.trailerSize);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }

  trailerYT() {
    // alert("hihi button working");
    return this.http.get(`https://www.youtube.com/watch?v=${this.trailerKey}`);
    
  }
  
  goToSoloDetails(castID:number) {
    this.router.navigateByUrl(`cast/${castID}`)
  }

  ngOnDestroy() {
    if (this.movieSub) {
      this.movieSub.unsubscribe();
    }
    if (this.castSub) {
      this.castSub.unsubscribe();
    }
    if (this.trailerSub) {
      this.trailerSub.unsubscribe();
    }
  }


}
