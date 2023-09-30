import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ApiService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginUserDetails } from '../interface/form-login-userdetails';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  @ViewChild('loginform') LoginForm?: NgForm;
  constructor(private apiService: ApiService, private router: Router, private cookieService: CookieService) {}

  // loginForm = new FormGroup(
  //   {
  //     email : new FormControl('', [Validators.required, Validators.email]),
  //     password : new FormControl('', [Validators.required, Validators.minLength(4)]),
  //   }
  // )
  date = Date.now();

  email: string = '';
  password: string = '';

  login() {
    // console.log(this.LoginForm?.value);
    var result = this.apiService.login(
      {
      'email': this.email,
      'password': this.password
      }
    );

    result.subscribe({
      next: (response: LoginUserDetails) => {
        if (response.status == 'success') {
          console.log(response);
          this.cookieService.set('token', response.token!);
          this.router.navigateByUrl('movies');
          // navigate to home
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        const { message } = err['error'];
        alert(message);
      },
    });
  }
}
