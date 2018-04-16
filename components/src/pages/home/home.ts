import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ListPage} from "../list/list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  listPage = ListPage;

  constructor(public navCtrl: NavController) {

  }

  onClick() {
    console.log('Clicked!')
  }

  onElementClick() {
    console.log('I was click or tocuhed');
  }

  onElementTap() {
    console.log('I was tapped');
  }

  onElementPress() {
    console.log('I was long pressed');
  }
}
