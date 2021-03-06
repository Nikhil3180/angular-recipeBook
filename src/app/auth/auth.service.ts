import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as AuthReducers from '../auth/store/auth.reducer';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registeredIn?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    // users = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;
    constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) {}

    // signup(email: string, password: string) {
    //   // tslint:disable-next-line: max-line-length
    //  .pipe(tap( response => {
    //          this.handleAuthentication(response.email, response.localId, response.idToken, response.expiresIn);
    //     }));
    // }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(tap( response => {
            this.handleAuthentication(response.email, response.localId, response.idToken, response.expiresIn);
       }));
    }

logout() {
    this.store.dispatch(new AuthActions.Logout());
    // this.users.next(null);
    // this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
}

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: string) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000 );
           const user = new User(email, userId, token, expirationDate);
           // this.users.next(user);
           this.store.dispatch(new AuthActions.Login({email: email,
            userId: userId,
            token: token,
            expirationDate: expirationDate}));
            this.autoLogout(+expiresIn * 1000);
            localStorage.setItem('userData', JSON.stringify(user));
    }

    autoLogin() {
       const userData: {
           email: string,
           id: string,
           _token: string,
           _tokenExpirationDate: string
       }
        = JSON.parse(localStorage.getItem('userData'));
       if (!userData) {
           return;
       }
       const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

       if (loadedUser.token) {
// this.users.next(loadedUser);
const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
this.store.dispatch(new AuthActions.Login({email: loadedUser.email,
userId: loadedUser.id, token: loadedUser.id, expirationDate: new Date(userData._tokenExpirationDate)}));
this.autoLogout(expirationDuration);
       }
    }

    autoLogout(expirationDuration: number) {
      this.tokenExpirationTimer =   setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }
}
