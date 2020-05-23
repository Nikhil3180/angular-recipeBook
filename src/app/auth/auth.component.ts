import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver : ComponentFactoryResolver) { }

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
  let authObs: Observable<AuthResponseData>;
  this.isLoading = true;
  if (this.isLoginMode) {
    authObs = this.authService.login(email, password);
  } else {
    authObs = this.authService.signup(email, password);
  }
authObs.subscribe(data => {
  console.log(data);
  this.isLoading = false;
  this.router.navigate(['/recipes']);
}, error  => {
  console.log(error);
  this.error = 'An error occurred! ';
  this.showErrorAlert(error);
  this.isLoading = false;
});
  console.log(form);
  form.reset();
}
onHandleError() {
  this.error = null;
}

private showErrorAlert(message: string) {
  // const alertCmp = new AlertComponent();
   const alertCmpfactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        
}

}
