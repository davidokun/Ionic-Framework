import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private authService: AuthService, private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  onSignIn(form: NgForm) {

    const loading = this.loadingCtrl.create({
      content: 'Signing you in ...'
    });
    loading.present();

    this.authService.signIn(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
      })
      .catch(error => {
        const alert = this.alertCtrl.create({
          title: 'SignIn Failed!',
          message: 'Email or Password are incorrect',
          buttons: ['Ok']
        });
        loading.dismiss();
        alert.present();
      })
  }
}
