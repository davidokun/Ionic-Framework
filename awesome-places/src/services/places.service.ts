import {Storage} from "@ionic/storage";
import {Injectable} from "@angular/core";
import {File} from '@ionic-native/file';

import {PlaceModel} from '../models/place.model';
import {LocationModel} from '../models/location.model';
import {ToastController} from "ionic-angular";

declare var cordova: any;

@Injectable()
export class PlacesService {

  private places: PlaceModel[] = [];

  constructor(private storage: Storage,
              private toastCtrl: ToastController,
              private file: File) {}

  addPlace(title: string, description: string, location: LocationModel, imageUrl: string) {

    const place = new PlaceModel(title, description, location, imageUrl);
    this.places.push(place);
    this.storage.set('places', this.places)
      .then(data => {
        // TODO: Do something
      })
      .catch(error => {
        this.places.splice(this.places.indexOf(place), 1);
      });
  }

  loadPlaces() {
    return this.places.slice();
  }

  deletePlace(index: number) {
    const place = this.places[index];
    this.places.splice(index, 1);
    this.storage.set('places', this.places)
      .then(() => {
        this.removeFile(place);
      })
      .catch(error => {

      })
  }

  fetchPlaces() {
    return this.storage.get('places')
      .then((places: PlaceModel[]) => {
        this.places = places != null ? places : [];
        return this.places.slice();
      })
      .catch(error => {
        const toast = this.toastCtrl.create({
          message: 'Could not get Places information. Please try again',
          duration: 2500
        });
        toast.present();
      })
  }

  private removeFile(place: PlaceModel) {
    const currentName = place.imageUrl.replace(/^.*[\\\/]/, '');
    this.file.removeFile(cordova.file.dataDirectory, currentName)
      .then(() => console.log('Removed File Ok'))
      .catch(() => {
        console.log('Error while removing File');
        this.addPlace(place.title, place.description, place.location, place.imageUrl);
      })
  }
}
