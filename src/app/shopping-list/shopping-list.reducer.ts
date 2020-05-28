import { Ingredient } from '../shared/ingredient.model';

const initialState = {
    ingredients : [
        new Ingredient('Onions', 5),
        new Ingredient('Capsicum', 1)
      ]
};

export function shoppingListReducer (state = initialState, action) {

}
