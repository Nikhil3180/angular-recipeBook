import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}> ;
  private isChanged: Subscription;
  constructor(private Shoppingservice: ShoppingListService, private loggingService: LoggingService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit(): void {
   this.ingredients = this.store.select('shoppingList');
   // this.ingredients = this.Shoppingservice.getIngredients();
    // this.isChanged =  this.Shoppingservice.ingreditentsChange
    // .subscribe((ingredient: Ingredient[]) => {this.ingredients = ingredient; }
    // );
    this.loggingService.printLog('Shopping-list');
  }
  onEditItem(index: number) {
      this.Shoppingservice.startedEditing.next(index);
  }
  ngOnDestroy() {
    // this.isChanged.unsubscribe();
  }
 // onIngredentAdded(ingredient: Ingredient) {
   //   this.ingredients.push(ingredient);
  // }
}
