import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations : [AuthComponent],
    imports : [
        RouterModule.forChild([{path: 'auth', component: AuthComponent}]),
        FormsModule,
        SharedModule,
        HttpClientModule
    ]
})
export class AuthModule {}
