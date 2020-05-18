import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from './user.model';
import { tap } from 'rxjs/operators';

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
    user = new Subject<User>();
    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
      // tslint:disable-next-line: max-line-length
      return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBW6yODwLVEIytc4dWMeuQ7i25caIasS2M',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(tap( response => {
             this.handleAuthentication(response.email, response.localId, response.idToken, response.expiresIn);
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBW6yODwLVEIytc4dWMeuQ7i25caIasS2M',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(tap( response => {
            this.handleAuthentication(response.email, response.localId, response.idToken, response.expiresIn);
       }));
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: string) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000 );
            const user = new User(email, userId, token, expirationDate);
    }
}
