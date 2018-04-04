import { Component } from '@angular/core';
import {UsersPage} from "../users/users";
import {NavController} from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userPage = UsersPage;

  constructor(private navCtrl: NavController) {}

  onGoToUsers() {
    this.navCtrl.push(this.userPage)
      .catch(error => {
        console.log('Access denied: ' + error);
      })
  }
}
