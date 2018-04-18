import {Injectable} from "@angular/core";
import {IngredientModel} from "../models/ingredient.model";

@Injectable()
export class ShoppingListService {

  private ingredients: IngredientModel[] = [];

  addIngredient(name: string, amount: number) {
    this.ingredients.push(new IngredientModel(name, amount));
    console.log(this.ingredients);
  }

  addIngredients(items: IngredientModel[]) {
    this.ingredients.push(...items);
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }

}
