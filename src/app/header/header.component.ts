import { Component , EventEmitter, Output, OnInit, OnDestroy} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent  implements OnInit, OnDestroy {

    userData: Subscription;
    isAuthenticate = false;
    constructor(private dataService: DataStorageService, private authService: AuthService) {}

ngOnInit() {
   this.userData =  this.authService.users.subscribe( data => {
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

    onLogout(){
        this.authService.logout();
    }
}
