import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert/alert.component';
import { PlaceholderDirective } from '../shared/placehorder/placeholder.directive';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  private closeSub: Subscription;
  private storeSub: Subscription;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  constructor(private authService: AuthService, private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
   this.storeSub = this.store.select('auth').subscribe(authState => {
              this.isLoading = authState.loading;
              this.error = authState.authError;
              if (this.error) {
                this.showErrorAlert(this.error);
              }
    });
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
  this.isLoading = true;
  if (this.isLoginMode) {
   // authObs = this.authService.login(email, password);
   this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));
  } else {
    this.store.dispatch(new AuthActions.SignupStart({email: email, password: password}));
  }


// authObs.subscribe(data => {
//   console.log(data);
//   this.isLoading = false;
//   this.router.navigate(['/recipes']);
// }, error  => {
//   console.log(error);
//   this.error = 'An error occurred! ';
//   this.showErrorAlert(this.error);
//   this.isLoading = false;
// });
  console.log(form);
  form.reset();
}
onHandleError() {
   this.store.dispatch(new AuthActions.ClearError());
}

private showErrorAlert(message: string) {
  // const alertCmp = new AlertComponent();
   const alertCmpfactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
      const componetRef =  hostViewContainerRef.createComponent(alertCmpfactory);
      componetRef.instance.message = message;
    this.closeSub =   componetRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
      });
}
ngOnDestroy() {
  if (this.closeSub) {
    this.closeSub.unsubscribe();
  }
  if (this.storeSub) {
    this.storeSub.unsubscribe();
  }
}

}
