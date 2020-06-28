import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login start';
export const LOGIN = 'LOGIN';
export const LOGIN_FAIL = '[Auth] Login fail';
export const LOGOUT = 'LOGOUT';
export const SIGNUP_START = '[Auth] Signup Start';
export const CLEAR_ERROR = '[Auth] Clear Error';

export class Login implements Action {
    readonly type = LOGIN;
    constructor(public payload: {email: string;
        userId: string; token: string; expirationDate: Date; }) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: {email: string, password: string}) {}
}

export class SignupStart implements Action  {
    readonly type = SIGNUP_START;
    constructor(public payload: {email: string, password: string}) {}
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;
    constructor (public payload: string) {}
}

export type AuthActions = Login | Logout | LoginStart | LoginFail | SignupStart | ClearError;
