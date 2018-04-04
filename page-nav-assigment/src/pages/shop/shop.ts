import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BuyoutPage} from "../buyout/buyout";

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onGoToBuyout(product: string, price: string) {
    this.navCtrl.push(BuyoutPage, {product: product, price: price});
  }
}
