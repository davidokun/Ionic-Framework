import {PlaceModel} from '../models/place.model';
import {LocationModel} from '../models/location.model';

export class PlacesService {

  private places: PlaceModel[] = [];

  addPlace(title: string, description: string, location: LocationModel, imageUrl: string) {

    const place = new PlaceModel(title, description, location, imageUrl);
    this.places.push(place);
  }

  loadPlaces() {
    return this.places.slice();
  }

  deletePlace(index: number) {
    this.places.splice(index, 1);
  }
}
