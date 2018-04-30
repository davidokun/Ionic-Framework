import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {AgmCoreModule} from '@agm/core'

import { SetLocationPage } from './set-location';

@NgModule({
  declarations: [
    SetLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(SetLocationPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCWVavh_tnQ4-jc732MS7w9j6BOYuhj_yE'
    })
  ],
})
export class SetLocationPageModule {}
