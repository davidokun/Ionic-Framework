import {RecipeModel} from '../models/recipe.model';
import {IngredientModel} from '../models/ingredient.model';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import 'rxjs/add/operator/do';
import {Injectable} from "@angular/core";

@Injectable()
export class RecipesService {

  private recipes: RecipeModel[] = [];

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {}

  addRecipe(title: string, description: string,
            difficulty: string, ingredients: IngredientModel[]) {

    this.recipes.push(new RecipeModel(title, description, difficulty, ingredients));
    console.log(this.recipes);
  }

  getRecipes(): RecipeModel[] {
    return this.recipes.slice();
  }

  updateRecipe(index: number, title: string, description: string,
               difficulty: string, ingredients: IngredientModel[]) {

    this.recipes[index] = new RecipeModel(title, description, difficulty, ingredients);
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.httpClient.put('https://ionic-recipe-book-9998e.firebaseio.com/'
      + userId + '/recipes.json?auth=' + token, this.recipes);
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.httpClient.get<RecipeModel[]>('https://ionic-recipe-book-9998e.firebaseio.com/'
      + userId + '/recipes.json?auth=' + token)
      .do(data => {
        this.recipes = data;
      });
  }
}
