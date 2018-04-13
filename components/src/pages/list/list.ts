import { Component } from '@angular/core';
import {IonicPage, reorderArray} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  items = ['Apples', 'Bananas', 'Berries'];

  constructor() {}

  reorderItems(indexes){
    this.items = reorderArray(this.items, indexes);
  }

}
