import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Result, SearchResults } from '../interface/search-results';
import { ApiService } from '../services/api.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
})
export class SearchresultsComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute, 
    private apiService: ApiService, 
    private router: Router
  ) { }

  //spin loader
  loading: boolean = true;

  searchSub: Subscription = new Subscription();

  movieName: string = '';
  searchResults: Result[] = [];
  foundMovies!: number;

  ngOnInit(): void {
    this.movieName = this.activatedRoute.snapshot.params['moviename'];
    console.log(this.movieName);
    this.search();
  }

  search() {
    var result = this.apiService.searchMovies(this.movieName)
    this.searchSub = result.subscribe({
      next: (response: SearchResults) => {
        this.searchResults = response.results!;
        this.foundMovies = response.total_results!;
        this.loading = false;
      }, 
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }

  ngOnDestroy() {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
  }

  goToDetail(movieID: number) {
    var id = movieID;
    this.router.navigateByUrl(`detail/${id}`);
  }


}
