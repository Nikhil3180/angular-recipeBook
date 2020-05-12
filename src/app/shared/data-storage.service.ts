import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReceipeService } from '../recipes/receipe.service';

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
}