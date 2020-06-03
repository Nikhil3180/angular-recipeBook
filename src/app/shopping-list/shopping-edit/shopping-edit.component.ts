import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListAction from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
 // editedIndex: number;
  editedItem: Ingredient;
  // @ViewChild('nameInput', { static: false}) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false}) amountInputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private slService: ShoppingListService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
  this.subscription =  this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
    // this.subscription = this.slService.startedEditing.subscribe((index: number) => {
    //     this.editMode = true;
    //     this.editedIndex = index;
    //     this.editedItem = this.slService.getIngredient(index);
    //     this.slForm.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount
    //     });
    // });
  }

  onAddItem(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.store.dispatch( new ShoppingListAction.UpdateIngredient(newIngredient));
    //  this.slService.updateIngredient(this.editedIndex, newIngredient);
    } else {
     // this.slService.addIngredient(newIngredient);
     this.store.dispatch(new ShoppingListAction.AddIngredient(newIngredient));
    }
    this.editMode = false;
        form.reset();
    // this.ingredientAdded.emit(newIngredient);
  }
  onClear() {
    this.store.dispatch(new ShoppingListAction.StopEdit());
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete() {
    this.store.dispatch( new ShoppingListAction.DeleteIngredient());
    // this.slService.deleteIngredient(this.editedIndex);
          this.onClear();
  }
ngOnDestroy() {
  this.store.dispatch(new ShoppingListAction.StopEdit());
  this.subscription.unsubscribe();
}
}
