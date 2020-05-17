import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error : string = null;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
onSwitchMode() {
  this.isLoginMode = !this.isLoginMode;
}
onSubmit(form: NgForm) {
  if (!form.valid) {
    return;
  }
  const email = form.value.email;
  const password = form.value.password;

  if (this.isLoginMode) {} else {
    this.isLoading = true;
  this.authService.signup(email, password).subscribe(data => {
    console.log(data);
    this.isLoading = false;
  }, error  => {
    console.log(error);
    this.error = 'An error occurred! ' + error.error.error.message;
    this.isLoading = false;
  });
}
  console.log(form);
  form.reset();
}
}
