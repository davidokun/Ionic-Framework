import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EditRecipePage} from '../edit-recipe/edit-recipe';
import {RecipeModel} from '../../models/recipe.model';
import {RecipesService} from '../../services/recipes.service';
import {RecipePage} from '../recipe/recipe';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes: RecipeModel[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private recipesService: RecipesService) {
  }

  ionViewWillEnter(): void {
    this.recipes = this.recipesService.getRecipes();
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  onLoadRecipe(recipe: RecipeModel, index: number) {
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index});
  }
}
