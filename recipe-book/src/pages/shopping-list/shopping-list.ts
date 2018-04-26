import {Component} from '@angular/core';
import {IonicPage, PopoverController} from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {ShoppingListService} from '../../services/shopping-list.service';
import {IngredientModel} from '../../models/ingredient.model';
import {SlOptionsPage} from './sl-options/sl-options';
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
              private authService: AuthService) {}

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
    const popover = this.popoverCtrl.create(SlOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if (data.action === 'load') {
          this.authService.getActiveUser().getToken()
            .then(
              (token: string) => {
                this.shoppingListService.fetchList(token)
                  .subscribe(
                    (list: IngredientModel[]) => {
                      if (list) {
                        this.ingredients = list;
                      } else {
                        this.ingredients = [];
                      }
                    },
                    error => console.log(error)
                  );
              }
            )
            .catch();

        } else {
          this.authService.getActiveUser().getToken()
            .then(
              (token: string) => {
                this.shoppingListService.storeList(token)
                  .subscribe(
                    () => console.log('Success!'),
                    error => console.log(error)
                  );
              }
            )
            .catch();
        }
      }
    );
  }
}
