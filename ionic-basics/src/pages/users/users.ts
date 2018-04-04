import { Component } from '@angular/core';
import {NavController} from "ionic-angular";
import {UserPage} from "./user/user";

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  constructor(private navCtrl: NavController) {}

  onLoadUser(name: string) {
    this.navCtrl.push(UserPage, {userName: name}, {
      animate: true,
      direction: 'forward',
      duration: 3000,
      easing: 'ease-out'
    });
  }

  ionViewCanEnter(): boolean | Promise<boolean> {
    console.log("CanEnter");
    const rnd = Math.random();
    return rnd > 0.5;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewCanLeave(): boolean | Promise<boolean> {
    console.log('ionViewCanLeave');

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 1000);
    });

    return promise;
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload');
  }



}
