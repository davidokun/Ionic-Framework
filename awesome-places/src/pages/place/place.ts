import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {PlaceModel} from "../../models/place.model";

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {
  place: PlaceModel;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private viewCtrl: ViewController) {
    this.place = this.navParams.get('place');
  }

  onLeave() {
    this.viewCtrl.dismiss();
  }


  onDelete() {

  }
}
