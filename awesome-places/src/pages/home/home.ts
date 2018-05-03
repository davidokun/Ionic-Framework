import { Component } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {AddPlacePage} from '../add-place/add-place';
import {PlaceModel} from "../../models/place.model";
import {PlacesService} from "../../services/places.service";
import {PlacePage} from "../place/place";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  addPlacePage = AddPlacePage;
  places: PlaceModel[] = [];

  constructor(public navCtrl: NavController,
              private placesService: PlacesService,
              private modalCtrl: ModalController) {

  }

  ionViewWillEnter() {
    this.places = this.placesService.loadPlaces();
  }

  onOpenPlace(place: PlaceModel) {
    const modal = this.modalCtrl.create(PlacePage, {place: place});
    modal.present();
  }
}
