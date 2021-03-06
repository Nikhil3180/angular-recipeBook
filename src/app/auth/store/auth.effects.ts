import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';



export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registeredIn?: boolean;
}

const handleAuthentication = (
    expiresIn: number,
    email: string,
    userId: string,
    token: string
) => {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000 );
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.Login({email: email,
         userId: userId, token: token, expirationDate: expirationDate});
};

const handleError = () => {
    return of(new AuthActions.LoginFail('An error occurred'));
};

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return  this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
            {
                email: signupAction.payload.email,
                password: signupAction.payload.password,
                returnSecureToken: true
            }
            ).pipe(map( resData => {
               return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
            }), catchError(error => {
              return handleError();
            }));
        })
    );

@Effect()
autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return {type: 'DUMMY'};
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if (loadedUser.token) {
             // this.store.dispatch(
                        return  new AuthActions.Login({email: loadedUser.email,
                                    userId: loadedUser.id, token: loadedUser.id, expirationDate: new Date(userData._tokenExpirationDate)});
                        // this.users.next(loadedUser);
                        //  const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                        //  this.autoLogout(expirationDuration);
        }
        return {type: 'DUMMY'};
    })
);


    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
            environment.firebaseAPIKey,
            {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            }
            ).pipe(map( resData => {
                return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
            }), catchError(error => {
                return handleError();
            }));
         }),
        );

        @Effect({dispatch: false})
        authLogout = this.actions$.pipe(ofType(AuthActions.LOGOUT), tap (() => {
        localStorage.removeItem('userData');
        }));

        @Effect({dispatch: false})
        authRedirect = this.actions$.pipe(ofType(AuthActions.LOGIN, AuthActions.LOGOUT), tap( () => {
                this.router.navigate(['/']);
        }));
}
