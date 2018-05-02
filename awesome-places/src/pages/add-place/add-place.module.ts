import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPlacePage } from './add-place';
import {AgmCoreModule} from "@agm/core";

@NgModule({
  declarations: [
    AddPlacePage,
  ],
  imports: [
    IonicPageModule.forChild(AddPlacePage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCWVavh_tnQ4-jc732MS7w9j6BOYuhj_yE'
    })
  ],
})
export class AddPlacePageModule {}
