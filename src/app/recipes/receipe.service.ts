import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Injectable()
export class ReceipeService {
recipesChanged = new Subject<Recipe[]>();
    constructor(private shoppingService: ShoppingListService, private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) {

    }

private receipes: Recipe[] = [];
    // private receipes: Recipe[] = [
    //     new Recipe('A Pizza Receipe', 'Pizza',
    //     // tslint:disable-next-line: max-line-length
    // tslint:disable-next-line: max-line-length
    //     'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/8/6/0/WU2301_Four-Cheese-Pepperoni-Pizzadilla_s4x3.jpg.rend.hgtvcom.826.620.suffix/1565115622965.jpeg',
    //     [new Ingredient('Onion', 2),
    // new Ingredient('Bread', 1)])
    //     ,
    //     new Recipe('Another Pizza Receipe', 'Pizza Description',
    //     // tslint:disable-next-line: max-line-length
    // tslint:disable-next-line: max-line-length
    //     'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/8/6/0/WU2301_Four-Cheese-Pepperoni-Pizzadilla_s4x3.jpg.rend.hgtvcom.826.620.suffix/1565115622965.jpeg',
    //     [new Ingredient('Tomato', 2),
    // new Ingredient('Panner', 1)])
    //   ];

      getRecipes() {
          return this.receipes.slice();
      }

      addIngredientsToShoppingList(ingredient: Ingredient[]) {
          this.store.dispatch(new ShoppingListActions.AddIngredients(ingredient));
      }

      getRecipeById(id: number) {
          return this.receipes[id];
      }

      addRecipe(recipe: Recipe) {
        this.receipes.push(recipe);
        this.recipesChanged.next(this.receipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
            this.receipes[index] = newRecipe;
            this.recipesChanged.next(this.receipes.slice());
      }

      deleteRecipe(index: number) {
          this.receipes.splice(index, 1);
          this.recipesChanged.next(this.receipes.slice());
      }

      setReceipes(recipes: Recipe[]) {
          this.receipes = recipes;
          this.recipesChanged.next(this.receipes.slice());
      }
    }
