import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterUserDetails } from '../interface/form-register-userdetails';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  @ViewChild('registerform') RegisterForm?: NgForm;
  constructor (private router:Router, private apiService:ApiService) { }

  username: string = '';
  email: string = '';
  password: string = '';
  conpassword: string = '';
  loading: boolean = false;

  register() {
    this.loading = true;
    var result = this.apiService.register(
      {
        'name': this.username,
        'email': this.email,
        'password': this.password,
        // 'passwordConfirm': this.conpassword
      }
    );

    result.subscribe({
      next: (response: RegisterUserDetails) => {
        if (response.status == 'success') {
          alert(response.status);
          this.router.navigateByUrl('signin');
          // navigate to Signin component 
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        const { message } = err['error'];
        alert(message);
        this.loading = false;
      },
    });
  }


}
