import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ReceipeService } from '../receipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit,OnDestroy {
  receipes: Recipe[];
  subscription: Subscription;
  constructor(private RecipeService: ReceipeService, private router: Router, private route: ActivatedRoute) { }

@Output() receipeWasSelected = new EventEmitter<Recipe>();

  ngOnInit(): void {
   this.subscription = this.RecipeService.recipesChanged.subscribe(
      (recipe: Recipe[]) => {
        this.receipes = recipe;
      }
    );
    this.receipes = this.RecipeService.getRecipes();
  }
  onNewRecipe() {
      this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
 // onReceipeSelected(recipe: Recipe) {
  //    this.receipeWasSelected.emit(recipe);
 // }

}
