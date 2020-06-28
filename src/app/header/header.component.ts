import { Component , EventEmitter, Output, OnInit, OnDestroy} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent  implements OnInit, OnDestroy {

    userData: Subscription;
    isAuthenticate = false;
    constructor(private dataService: DataStorageService, private authService: AuthService, private store: Store<fromApp.AppState>) {}

ngOnInit() {
   this.userData =  this.store.select('auth')
   .pipe(map(authState => authState.user))
   .subscribe( data => {
       this.isAuthenticate = !data ? false : true;
   });
}

ngOnDestroy() {
    this.userData.unsubscribe();
}

    saveData() {
            this.dataService.storeRecipes();
    }
    loadData() {
        this.dataService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
        // this.authService.logout();
    }
}
