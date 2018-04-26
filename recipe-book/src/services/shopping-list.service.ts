import {Injectable} from '@angular/core';
import {IngredientModel} from '../models/ingredient.model';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import 'rxjs/add/operator/do';
import "rxjs/add/operator/map";

@Injectable()
export class ShoppingListService {

  private ingredients: IngredientModel[] = [];

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {}

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

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.httpClient.put('https://ionic-recipe-book-9998e.firebaseio.com/'
      + userId + '/shopping-list.json?auth=' + token, this.ingredients);
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.httpClient.get<IngredientModel[]>('https://ionic-recipe-book-9998e.firebaseio.com/'
      + userId + '/shopping-list.json?auth=' + token)
      .do((data) => {
        this.ingredients = data;
      });
  }

}
