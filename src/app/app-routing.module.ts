import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MoviesComponent } from './movies/movies.component';
import { DetailComponent } from './detail/detail.component';
import { AuthGuard } from './services/auth.guard';
import { CastDetailsComponent } from './cast-details/cast-details.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail/:movieid',
    component: DetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cast/:castid',
    component: CastDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'search/:moviename', 
    component: SearchresultsComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: "**", //wildcard
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
