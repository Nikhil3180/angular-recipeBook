import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
    ingredients : [
        new Ingredient('Onions', 5),
        new Ingredient('Capsicum', 1)
      ]
};

export function shoppingListReducer (state = initialState, action: ShoppingListActions.ShoppingListActions) {
        switch (action.type) {
            case ShoppingListActions.ADD_INGREDIENT :
            return {
                ...state,   // Copy the old state through spread operator
                ingredients :  [...state.ingredients, action.payload]
            };
            case ShoppingListActions.ADD_INGREDIENTS:
                return {
                    ...state,
                    ingredients : [...state.ingredients, ...action.payload]
                };
                case ShoppingListActions.UPDATE_INGREDIENT:
                    const ingredient = state.ingredients[action.payload.index];
                    const updateIngredient = {
                        ...ingredient,
                        ...action.payload.ingredent
                    };
                    const updateIngredients = [...state.ingredients];
                    updateIngredients[action.payload.index] = updateIngredient;
                    return {
                        ...state,
                        ingredients : updateIngredients
                    };
                    case ShoppingListActions.DELETE_INGREDIENT:
                        return {
                            ...state,
                            ingredients : state.ingredients.filter((ig, igIndex) => {
                                return igIndex !== action.payload;
                            })
                        }
            default :
            return state;
        }
}


