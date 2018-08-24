import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-checkdn-users',
  templateUrl: 'checkdn-users.html',
})
export class CheckdnUsersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  users;
  async ionViewDidLoad() {
    console.log('ionViewDidLoad CheckdnUsersPage');
    this.users = await this.navParams.get('users');
  }
  viewProfilePage(user){
    this.navCtrl.push("ViewProfilePage", {user: user} )
  }
}
