import {Component} from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  PopoverController
} from 'ionic-angular';
import {EditRecipePage} from '../edit-recipe/edit-recipe';
import {RecipeModel} from '../../models/recipe.model';
import {RecipesService} from '../../services/recipes.service';
import {RecipePage} from '../recipe/recipe';
import {DatabaseOptionsPage} from "../database-options/database-options";
import {AuthService} from "../../services/auth.service";

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes: RecipeModel[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private recipesService: RecipesService,
              private popoverCtrl: PopoverController,
              private loadingCtrl: LoadingController,
              private authService: AuthService,
              private alertCtrl: AlertController) {
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

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Loading items....'
    });

    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if (data.action === 'load') {
          loading.present();
          this.authService.getActiveUser().getToken()
            .then(
              (token: string) => {
                this.recipesService.fetchList(token)
                  .subscribe(
                    (list: RecipeModel[]) => {
                      loading.dismiss();
                      if (list) {
                        this.recipes = list;
                      } else {
                        this.recipes = [];
                      }
                    },
                    error => {
                      loading.dismiss();
                      this.handleError(error.error.error);
                    }
                  );
              }
            )
            .catch();

        } else if (data.action === 'save') {
          loading.present();
          this.authService.getActiveUser().getToken()
            .then(
              (token: string) => {
                this.recipesService.storeList(token)
                  .subscribe(
                    () => loading.dismiss(),
                    error => {
                      loading.dismiss();
                      this.handleError(error.error.error);
                    }
                  );
              }
            )
            .catch();
        }
      }
    );
  }

  handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error ocurred',
      message: errorMessage,
      buttons: ['Ok']
    });

    alert.present();
  }
}
