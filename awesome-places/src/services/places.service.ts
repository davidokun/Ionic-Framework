import {Storage} from "@ionic/storage";
import {Injectable} from "@angular/core";

import {PlaceModel} from '../models/place.model';
import {LocationModel} from '../models/location.model';
import {ToastController} from "ionic-angular";


@Injectable()
export class PlacesService {

  private places: PlaceModel[] = [];

  constructor(private storage: Storage,
              private toastCtrl: ToastController) {}

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
    this.places.splice(index, 1);
  }

  fetchPlaces() {
    this.storage.get('places')
      .then((places: PlaceModel[]) => {
        this.places = places != null ? places : []
      })
      .catch(error => {
        const toast = this.toastCtrl.create({
          message: 'Could not get Places information. Please try again',
          duration: 2500
        });
        toast.present();
      })
  }
}
