import {Component, OnInit} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage implements OnInit{
  name: string;

  constructor(private navParams: NavParams,
              private navCtrl: NavController) {}

  ngOnInit(): void {
    this.name = this.navParams.get('userName');
  }

  onGoBack() {
    this.navCtrl.pop();
    //this.navCtrl.popToRoot(); // Got Root page. Removes All pages from the stack
  }
}
