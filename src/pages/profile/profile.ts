import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams,App, LoadingController, AlertController} from 'ionic-angular';
import { Storage } from '../../../node_modules/@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { LoadingProvider } from '../../providers/loading/loading';
import * as firebase from 'firebase';
import 'firebase/firestore';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {


  constructor(
    private loading: LoadingProvider,
    private fs: FirestoreProvider,
    private alert: AlertController,
    private auth: AuthProvider,
    private ls: Storage,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    ) {
  }

  async ionViewDidLoad() {
      await this.getUser();
  }

  user;
  async getUser(){
      this.user = await this.ls.get('user');
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
              this.fs.updateDocument("users", this.user.uid, {online: false});
              this.navCtrl.setRoot("WelcomePage");
              
            }
            
          })
        }
      }]
    }).present();
  
  }

  changeGender(){
 
     this.alert.create({
       title: "What is your gender",
       inputs:[
         {
           type: 'radio',
           label: "Female",
           value: "Female"
         }, {
          type: 'radio',
          label: "Male",
          value: "Male"
        }
       ],
       buttons: [{
         text: "Cancel",
       },{
         text: "Save",
         handler: data =>{
            this.user.gender = data;
            this.ls.set('user', this.user);
            this.fs.updateDocument("/users/", this.user.uid, this.user)
         }
       }]
     }).present()
    
  
  }
  changeAge(){
    this.alert.create({
      message: 'Change day of birth',
       inputs: [
         {
           name: 'dob',
           placeholder: '05/31/91'
         },
       ],
       buttons: [
         {
           text: 'Cancel',
           handler: data => {
             console.log('Cancel clicked');
           }
         },
         {
           text: 'Save',
           handler: data => {
             this.user.age = data.dob;
             this.ls.set('user', this.user);
             this.fs.updateDocument("/users/", this.user.uid, this.user)
           }
         }
       ]
     }).present()
   
   }

   ProfileEditPage(){
     this.navCtrl.push("ProfileEditPage")
   }
}
