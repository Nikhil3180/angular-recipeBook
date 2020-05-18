import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { ReceipeService } from './receipe.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.users.subscribe(data => {
      console.log('receipe component');
      console.log(data);
    }, error => {
      console.log(error);
    });

}
}
