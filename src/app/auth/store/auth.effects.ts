import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { of } from 'rxjs';



export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registeredIn?: boolean;
}

export class AuthEffects {
    constructor(private actions$: Actions, private http: HttpClient) {}
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
            environment.firebaseAPIKey,
            {
                email: authData.payload.email,
                password: authData.payload.password,
                returnSecureToken: true
            }
            ).pipe(catchError(error => {
                of();
            }), map( resData => {
                of();
            }));
         }),
        );
}
