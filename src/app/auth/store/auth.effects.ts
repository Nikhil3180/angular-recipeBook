import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';



export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registeredIn?: boolean;
}

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
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
                const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000 );
               return new AuthActions.Login({email: resData.email,
                    userId: resData.localId, token: resData.idToken, expirationDate: expirationDate});
            }), catchError(error => {
               return of(new AuthActions.LoginFail('An error occurred'));
            }));
         }),
        );

        @Effect({dispatch: false})
        authSuccess = this.actions$.pipe(ofType(AuthActions.LOGIN), tap( () => {
                this.router.navigate(['/']);
        }));
}
