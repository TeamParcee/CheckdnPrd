import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Storage } from '../../../node_modules/@ionic/storage';



@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  constructor(
    private ls: Storage,
    private fs: FirestoreProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

  // check to see if user exist in firestore, if not delete uid from local storage and go to welcome page
  async checkUserExists(){
    
    // get uid from local storage to see if user exists
    let user = await this.ls.get('user');

    // if uid is null go to welcome page
    (user) ? null : this.navCtrl.setRoot("WelcomePage");

    // if uid does not exist in firestore go to welcomepage
    this.fs.checkDocExists("/users/", user.uid).then((result)=>{
      (result) ? null : this.navCtrl.setRoot("WelcomePage")
    })
  }



}
