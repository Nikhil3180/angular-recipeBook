import { Ingredient } from '../../shared/ingredient.model';
import {Action} from '@ngrx/store';
import {ADD_INGREDIENT} from './shopping-list.actions';

const initialState = {
    ingredients : [
        new Ingredient('Onions', 5),
        new Ingredient('Capsicum', 1)
      ]
};

export function shoppingListReducer (state = initialState, action: Action) {
        switch (action.type) {
            case ADD_INGREDIENT :
            return {
                ...state,   // Copy the old state through spread operator
                ingredients :  [...state.ingredients, action]
            };
        }
}
