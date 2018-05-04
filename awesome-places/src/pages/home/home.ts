import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {AddPlacePage} from '../add-place/add-place';
import {PlaceModel} from "../../models/place.model";
import {PlacesService} from "../../services/places.service";
import {PlacePage} from "../place/place";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  addPlacePage = AddPlacePage;
  places: PlaceModel[] = [];

  constructor(public navCtrl: NavController,
              private placesService: PlacesService,
              private modalCtrl: ModalController) {

  }

  ngOnInit(): void {
    this.placesService.fetchPlaces()
      .then((places: PlaceModel[]) => this.places = places);
  }

  ionViewWillEnter() {
    this.places = this.placesService.loadPlaces();
  }

  onOpenPlace(place: PlaceModel, index: number) {
    const modal = this.modalCtrl.create(PlacePage, {place: place, index: index});
    modal.present();
  }
}
