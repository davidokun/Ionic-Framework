import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {Geolocation} from '@ionic-native/geolocation';

import {SetLocationPage} from '../set-location/set-location';
import {LocationModel} from '../../models/location.model';

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
              private modalCtrl: ModalController,
              private geolocation: Geolocation,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your location...'
    });
    loader.present();

    this.geolocation.getCurrentPosition()
      .then(
        location => {
          loader.dismiss();
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
        }
      )
      .catch(
        error => {
          loader.dismiss();
          console.log(error);

          const toast = this.toastCtrl.create({
            message: 'Could not get location, please pick it manually',
            duration: 2500
          });

          toast.present();
        }
      )

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
