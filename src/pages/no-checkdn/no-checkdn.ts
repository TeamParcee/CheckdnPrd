import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Storage } from '../../../node_modules/@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-no-checkdn',
  templateUrl: 'no-checkdn.html',
})
export class NoCheckdnPage {

  constructor(
    private ls: Storage,
    private alert: AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoCheckdnPage');
  }
  signout(){
    this.alert.create({
      title:"Sign Out",
      message: "Are you sure you want to sign out?",
      buttons: [{
        text: "Cancel"
      },{
        text: "Sign Out",
        handler: data =>{
          firebase.auth().signOut();
          firebase.auth().onAuthStateChanged((user)=>{
            if(!user && user == null){
              this.ls.remove('user');
              this.navCtrl.setRoot("WelcomePage");
              
            }
            
          })
        }
      }]
    }).present();
  
  }

  home(){
    this.navCtrl.setRoot("HomePage", {places: "none"})
  }
}
