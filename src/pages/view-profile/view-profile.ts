import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirestoreProvider } from '../../providers/firestore/firestore';

/**
 * Generated class for the ViewProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-profile',
  templateUrl: 'view-profile.html',
})
export class ViewProfilePage {

  constructor(
    private fs: FirestoreProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

 
  async ionViewDidLoad() {
    await this.getUser();
}

user;
pics;
async getUser(){
    this.user = await this.navParams.get('user');
    this.user = await this.fs.getDocument("/users/", this.user.uid);
    this.pics = await this.user.pics;
    console.log(this.user)
    
}
  sendMessagePage(){
    this.navCtrl.push("MessagePage", {recipient: this.user})
  }
}
