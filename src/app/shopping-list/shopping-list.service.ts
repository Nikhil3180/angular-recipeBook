import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {

    ingreditentsChange = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Onions', 5),
        new Ingredient('Capsicum', 1)
      ];

      getIngredients() {
          return this.ingredients.slice();
      }

      getIngredient(index: number) {
        return this.ingredients[index];
      }

      updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingreditentsChange.next(this.ingredients.slice());
      }

      deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingreditentsChange.next(this.ingredients.slice());
      }

      addIngredient(ingredient: Ingredient) {
          this.ingredients.push(ingredient);
          this.ingreditentsChange.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]) {
        // for (let ingredient of ingredients) {
          //      this.addIngredient(ingredient);
        // }
        this.ingredients.push(...ingredients);
        this.ingreditentsChange.next(this.ingredients.slice());
      }
}
