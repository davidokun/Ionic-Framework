import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LocationModel} from "../../models/location.model";

@IonicPage()
@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {

  location: LocationModel;
  marker: LocationModel;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.location = this.navParams.get('location');
  }

  onSetMarker(event: any) {
    this.marker = new LocationModel(event.coords.lat, event.coords.lng);
  }
}
