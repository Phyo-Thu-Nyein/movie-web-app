import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MoviesComponent } from './movies/movies.component';
import { DetailComponent } from './detail/detail.component';
import { MovielistComponent } from './movielist/movielist.component';
import { FooterComponent } from './footer/footer.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { CookieService } from 'ngx-cookie-service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CarouselComponent } from './carousel/carousel.component';
import { SkeloaderComponent } from './skeloader/skeloader.component';
import { MovieskeleComponent } from './movieskele/movieskele.component';
import { PowerPipe } from './services/power.pipe';
import { HighlightDirective } from './services/highlight.directive';
import { SpinloaderComponent } from './spinloader/spinloader.component';
import { CastDetailsComponent } from './cast-details/cast-details.component';
import { CastdetailskeleComponent } from './castdetailskele/castdetailskele.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingComponent,
    NavbarComponent,
    SigninComponent,
    SignupComponent,
    NotfoundComponent,
    MoviesComponent,
    DetailComponent,
    MovielistComponent,
    FooterComponent,
    RecommendationsComponent,
    CarouselComponent,
    SkeloaderComponent,
    PowerPipe,
    HighlightDirective,
    SpinloaderComponent,
    MovieskeleComponent,
    CastDetailsComponent,
    CastdetailskeleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
