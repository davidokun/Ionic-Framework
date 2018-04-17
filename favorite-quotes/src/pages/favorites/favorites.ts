import { Component } from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import {Quote} from "../../data/quote.interface";
import {QuotesService} from "../../services/quotes.service";
import {QuotePage} from "../quote/quote";
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  quotes: Quote[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private quotesService: QuotesService, private modalCtrl: ModalController,
              private settingsService: SettingsService) {
  }

  ionViewWillEnter() {
    this.quotes = this.quotesService.getFavoritesQuotes();
  }


  onViewQuote(quote: Quote) {
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((remove: boolean) => {
      if (remove) {
        this.onRemoveFromFavorites(quote);
      }
    });

  }

  onRemoveFromFavorites(quote: Quote) {
    this.quotesService.removeQuoteFromFavorites(quote);
    this.quotes = this.quotesService.getFavoritesQuotes();
  }

  getBackground() {
    return this.settingsService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground';
  }

  isAltBackground() {
    return this.settingsService.isAltBackground();
  }
}
