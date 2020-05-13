import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReceipeService } from '../recipes/receipe.service';
import { Recipe } from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: ReceipeService) {}


    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-recipe-book-b9aee.firebaseio.com/recipes.json', recipes)
        .subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes() {
       return this.http.get<Recipe[]>('https://ng-course-recipe-book-b9aee.firebaseio.com/recipes.json')
        .pipe(map(recipe => {
            // tslint:disable-next-line: no-shadowed-variable
            return recipe.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            });
        }),
        tap(recipes => {
            this.recipeService.setReceipes(recipes);
        })
        );
    }
}
