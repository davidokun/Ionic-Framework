import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {SetLocationPage} from "../set-location/set-location";
import {LocationModel} from "../../models/location.model";

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  location: LocationModel = {
    lat: 40.7624324,
    lng: -73.9759827
  };

  locationIsSet = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private modalCtrl: ModalController) {
  }

  onLocate() {

  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, {location: this.location, isSet: this.locationIsSet});
    modal.present();

    modal.onDidDismiss(
      data => {
        this.location = data.location;
        this.locationIsSet = true;
      }
    );
  }

  onTakePhoto() {

  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
