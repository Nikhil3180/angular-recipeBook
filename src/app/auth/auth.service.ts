import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
      // tslint:disable-next-line: max-line-length
      return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBW6yODwLVEIytc4dWMeuQ7i25caIasS2M',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBW6yODwLVEIytc4dWMeuQ7i25caIasS2M',
        {
            email: email,
            password: password,
            returnSecureToken: true
        });
    }
}
