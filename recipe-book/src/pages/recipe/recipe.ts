import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RecipeModel} from '../../models/recipe.model';
import {EditRecipePage} from "../edit-recipe/edit-recipe";

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {

  recipe: RecipeModel;
  index: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(): void {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }


  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'Edit', recipe: this.recipe, index: this.index})
  }
}
