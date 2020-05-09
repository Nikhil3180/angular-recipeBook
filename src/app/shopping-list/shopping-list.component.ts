import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private isChanged: Subscription;
  constructor(private Shoppingservice: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.Shoppingservice.getIngredients();
   this.isChanged =  this.Shoppingservice.ingreditentsChange
    .subscribe((ingredient: Ingredient[]) => {this.ingredients = ingredient; }
    );
  }
  onEditItem(index: number){
      this.Shoppingservice.startedEditing.next(index);
  }
  ngOnDestroy()
  {
    this.isChanged.unsubscribe();
  }
 // onIngredentAdded(ingredient: Ingredient) {
   //   this.ingredients.push(ingredient);
  // }
}
