import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {PlaceModel} from "../../models/place.model";
import {PlacesService} from "../../services/places.service";

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {
  place: PlaceModel;
  index: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private viewCtrl: ViewController,
              private placesService: PlacesService) {

    this.place = this.navParams.get('place');
    this.index = this.navParams.get('index');
  }

  onLeave() {
    this.viewCtrl.dismiss();
  }


  onDelete() {
    this.placesService.deletePlace(this.index);
    this.onLeave();
  }
}
