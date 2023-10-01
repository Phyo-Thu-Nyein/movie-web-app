import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetailsService } from '../interface/userdetails-service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = '?api_key=e5b98fbae855f763ab386ead4da9c365';

  // YT EMBED BG VID 
  // https://www.youtube.com/embed/4wxyy8Rcz4k?controls=0&autoplay=1&mute=1&playsinline=1&playlist=Yj2iELI6OeI&loop=1
  ytUrlOne: string = 'https://www.youtube.com/embed/';
  ytUrlTwo: string = '?controls=0&autoplay=1&mute=1&playsinline=1&playlist=';
  ytUrlThree: string = '&loop=1';
  

  // myAPI key=e5b98fbae855f763ab386ead4da9c365
  //sirAPI key=050c28541f900007285c3020069bfd62

  // getting yt embed vid 
  getYtEmbed(movieID: number) {
    return this.http.get(`${this.ytUrlOne}${movieID}${this.ytUrlTwo}${movieID}${this.ytUrlThree}`)
  }

  getMovies(category: string) {
    return this.http.get(
      `${this.baseUrl}/movie/${category}${this.apiKey}&language=en-US`
    );
  }

  // getting recommended movies
  // https://api.themoviedb.org/3/movie/565770/recommendations?api_key=e5b98fbae855f763ab386ead4da9c365&language=en-US
  getRcmdMovies(movieID: number) {
    return this.http.get(
      `${this.baseUrl}/movie/${movieID}/recommendations${this.apiKey}&language=en-US`
    );
  }

  getDetails(movieID: number) {
    return this.http.get(
      `${this.baseUrl}/movie/${movieID}${this.apiKey}&language=en-US`
    );
  }

  getCasts(movieID: number) {
    return this.http.get(
      `${this.baseUrl}/movie/${movieID}/credits${this.apiKey}&language=en-US`
    );
  }

  getTrailer(movieID: number) {
    return this.http.get(
      `${this.baseUrl}/movie/${movieID}/videos${this.apiKey}&language=en-US`
    );
  }

  getCastDetails(castID: number) {
    return this.http.get( 
      `${this.baseUrl}/person/${castID}${this.apiKey}&language=en-US`
    )
  }

  getMoviesOfCast(castID: number) {
    return this.http.get( 
      `${this.baseUrl}/person/${castID}/combined_credits${this.apiKey}&language=en-US`
    )
  }

  loginUrl: string = 'https://msi.htoowaiyan.com/api/v1/users/signin';
  registerUrl: string = 'https://msi.htoowaiyan.com/api/v1/users/signup';
 
  
  options = {
    headers: new HttpHeaders({
      Accept: 'text/html,application/json',
      'Content-Type': 'application/json',
    }),
  };

  login(userdata: UserDetailsService) {
    return this.http.post(this.loginUrl, userdata, this.options);
  }

  register(userdata: UserDetailsService) {
    return this.http.post(this.registerUrl, userdata, this.options);
  }
}
