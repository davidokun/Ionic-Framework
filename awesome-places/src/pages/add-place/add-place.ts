import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {Geolocation} from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';

import {SetLocationPage} from '../set-location/set-location';
import {LocationModel} from '../../models/location.model';
import {PlacesService} from "../../services/places.service";

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
  providers: [Camera]
})
export class AddPlacePage {

  location: LocationModel = {
    lat: 40.7624324,
    lng: -73.9759827
  };

  locationIsSet = false;

  options: CameraOptions = {
    correctOrientation: true,
    encodingType: this.camera.EncodingType.JPEG,
  };
  imageUrl = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private modalCtrl: ModalController,
              private geolocation: Geolocation,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private camera: Camera,
              private placesService: PlacesService,
              private file: File) {
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
    this.camera.getPicture(this.options)
      .then(
        imageData => {
          const currentName = imageData.replace(/^.*[\\\/]/, '');
          const path = imageData.replace(/[^\/]*$/, '');
          this.file.moveFile(path, currentName, cordova.file.dataDirectory, currentName)
            .then(data => {
              this.imageUrl = data.nativeURL;
              this.camera.cleanup();
            })
            .catch(error => {
              this.imageUrl = '';
              const toast = this.toastCtrl.create({
                message: 'Could not save the image. Please try again',
                duration: 2500
              });
              toast.present();
              this.camera.cleanup();
            });
          this.imageUrl = imageData
        }
      )
      .catch(
        error => {
          const toast = this.toastCtrl.create({
            message: 'Could not take the image. Please try again',
            duration: 2500
          });
          toast.present();
        }
      )
  }

  onSubmit(form: NgForm) {
    this.placesService.addPlace(form.value.title, form.value.description, this.location, this.imageUrl);
    form.reset();
    this.location = {
      lat: 40.7624324,
      lng: -73.9759827
    };
    this.imageUrl = '';
    this.locationIsSet = false;
  }
}
