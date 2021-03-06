import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListAction from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}> ;
  private isChanged: Subscription;
  constructor(private Shoppingservice: ShoppingListService, private loggingService: LoggingService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
   this.ingredients = this.store.select('shoppingList');
   // this.ingredients = this.Shoppingservice.getIngredients();
    // this.isChanged =  this.Shoppingservice.ingreditentsChange
    // .subscribe((ingredient: Ingredient[]) => {this.ingredients = ingredient; }
    // );
    this.loggingService.printLog('Shopping-list');
  }
  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListAction.StartEdit(index));
      // this.Shoppingservice.startedEditing.next(index);
  }
  ngOnDestroy() {
    // this.isChanged.unsubscribe();
  }
 // onIngredentAdded(ingredient: Ingredient) {
   //   this.ingredients.push(ingredient);
  // }
}
