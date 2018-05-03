import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlacePage } from './place';
import {AgmCoreModule} from "@agm/core";

@NgModule({
  declarations: [
    PlacePage,
  ],
  imports: [
    IonicPageModule.forChild(PlacePage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCWVavh_tnQ4-jc732MS7w9j6BOYuhj_yE'
    })
  ],
})
export class PlacePageModule {}
