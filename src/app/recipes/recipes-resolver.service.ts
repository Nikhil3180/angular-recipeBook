import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { ReceipeService } from './receipe.service';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor (private dataStorageService: DataStorageService, private recipeService: ReceipeService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            const recipe = this.recipeService.getRecipes();
            if (recipe.length === 0 ) {
        return this.dataStorageService.fetchRecipes();
            } else {
                return recipe;
            }
    }
}
