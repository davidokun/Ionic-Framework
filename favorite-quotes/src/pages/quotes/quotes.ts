import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Quote} from "../../data/quote.interface";

@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit{

  quotes: { category: string, quotes: Quote[], icon: string };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(): void {
    this.quotes = this.navParams.data;
  }

  // ionViewDidLoad() {
  //   this.quote = this.navParams.data;
  // Add elvis operator (?) in template to use this approach
  // }



}
