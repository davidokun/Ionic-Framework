import {Component, OnInit} from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list.service";
import {IngredientModel} from "../../models/ingredient.model";

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage implements OnInit {

  ingredients: IngredientModel[];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  onAddItem(f: NgForm) {
    this.shoppingListService.addIngredient(f.value.iname, f.value.amount);
    this.loadItems();
    f.reset();
  }

  private loadItems() {
    this.ingredients = this.shoppingListService.getIngredients();
  }
}
