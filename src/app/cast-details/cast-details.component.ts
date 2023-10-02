import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, subscribeOn } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Cast, MoviesOfCast } from '../interface/movies-of-cast';
import { SingleCastDetails } from '../interface/single-cast-details';


@Component({
  selector: 'app-cast-details',
  templateUrl: './cast-details.component.html',
  styleUrls: ['./cast-details.component.css']
})
export class CastDetailsComponent implements OnInit {
  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router) { }
  
  castMovieSub: Subscription = new Subscription();
  castSub: Subscription = new Subscription();

  //loading
  loading: boolean = true;

  //Single Cast Details
  castID!: number;
  profile: string = '';
  knownfor: string = '';
  gender: string = '';
  birthday!: Date;
  birthplace: string = '';
  name: string = '';
  bio: string = '';


  //Movies Of The Cast
  castMovieList: Cast[] = [];

  ngOnInit(): void {
    this.castID = this.activatedRoute.snapshot.params['castid'];
    // console.log(this.castID);
    this.getMoviesOfCast();
    this.getSingleCastDetails();
  }

  getSingleCastDetails() {
    var result = this.apiService.getCastDetails(this.castID);
    this.castSub = result.subscribe({
      next: (response: SingleCastDetails) => {
        this.profile = response.profile_path!;
        this.name = response.name!;
        this.knownfor = response.known_for_department!;
        this.birthday = response.birthday!;
        this.birthplace = response.place_of_birth!;
        this.bio = response.biography!;
      }
    })
  }

  getMoviesOfCast() {
    var result = this.apiService.getMoviesOfCast(this.castID);
      this.castMovieSub = result.subscribe({
        next: (response: MoviesOfCast) => {
          this.castMovieList = response['cast']!;
          //loading
          this.loading = false;
        }, 
        error: (error: HttpErrorResponse) => {
          alert(error);
        }
      })
  }

  goToDetail(movieID: number) {
    var id = movieID;
    this.router.navigateByUrl(`detail/${id}`);
  }

  ngOnDestroy() {
    if (this.castSub) {
      this.castSub.unsubscribe();
    }
    if (this.castMovieSub) {
      this.castMovieSub.unsubscribe();
    }
  }

}
