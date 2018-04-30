import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, PopoverController} from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {ShoppingListService} from '../../services/shopping-list.service';
import {IngredientModel} from '../../models/ingredient.model';
import {DatabaseOptionsPage} from '../database-options/database-options';
import {AuthService} from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {

  ingredients: IngredientModel[];

  constructor(private shoppingListService: ShoppingListService,
              private popoverCtrl: PopoverController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {}

  ionViewWillEnter() {
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

  onRemoveItem(index: number) {
    this.shoppingListService.removeIngredient(index);
    this.loadItems();
  }

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Loading items....'
    });

    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if (!data) {
          return;
        }
        if (data.action === 'load') {
          loading.present();
          this.authService.getActiveUser().getToken()
            .then(
              (token: string) => {
                this.shoppingListService.fetchList(token)
                  .subscribe(
                    (list: IngredientModel[]) => {
                      loading.dismiss();
                      if (list) {
                        this.ingredients = list;
                      } else {
                        this.ingredients = [];
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
                this.shoppingListService.storeList(token)
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
