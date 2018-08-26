import { LocationProvider } from './../../providers/location/location';
import { DatabaseProvider } from './../../providers/database/database';
import { FirestoreProvider } from './../../providers/firestore/firestore';
import { AuthProvider } from './../../providers/auth/auth';
import { ToastProvider } from './../../providers/toast/toast';
import { LoadingProvider } from './../../providers/loading/loading';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(
    private ls: Storage,
    private db: DatabaseProvider,
    private location: LocationProvider,
    private fs: FirestoreProvider,
    private loading: LoadingProvider,
    private toast: ToastProvider,
    private auth: AuthProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }


  allPlaces;
  checkdnPlaces;
  user;

  async ionViewDidLoad() {
    this.loading.show();
    this.allPlaces = await this.fs.getCollection("checkPlaces");
    this.checkdnPlaces = await this.getCheckdnPlaces();
    this.loading.hide();
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.getFbRedirectResults();
      }
    })
    


  }
 

  async getCheckdnPlaces(){
    return new Promise(async(resolve)=>{
    let checkdnPlaces = await this.location.getDistanceMatrix(this.allPlaces);
    return resolve(checkdnPlaces);
    })
  }

  async signinAnonymously(){
    this.loading.show();
    // show loading while creating user
    let uid = await this.fs.createNewDocId("/users/");
    

    //get location
    let location = await this.location.getCurrentLocation();

    // create a new user object
    let user = {
      displayName: "Anonymous User",
      photoURL: "../../assets/imgs/photo_anonymous.png",
      uid: uid,
      location: location,
      checkdnPlaces: this.checkdnPlaces,
      checkdn: this.checkdnPlaces[0],
      online: true
    }


    // save to local storage
    this.ls.set("user", user);

    // save new user to fs
    this.fs.setDocument("/users/", uid, user);

    // run the service to delete user after log off
    this.db.deleteAnonymousUser(uid)

    // hide loading and navigate to tabs page
    this.loading.hide();
    this.navCtrl.setRoot("HomePage")
  }

  facebookLogin(){
    this.auth.loginWithFB()
  }
  getFbRedirectResults(){
    this.loading.show();
    this.auth.getFbRedirectResults().then(async (user_firebase:any)=>{

      //get location
    let location = await this.location.getCurrentLocation();
    
      if(user_firebase){
        


        let userExits = await this.fs.checkDocExists("/users/", user_firebase.uid);

        if(userExits){
          this.user = {
            displayName: user_firebase.displayName,
            photoURL: user_firebase.photoURL,
            uid: user_firebase.uid,
            location: location,
            checkdnPlaces: this.checkdnPlaces,
            checkdn: this.checkdnPlaces[0],
            online: true
          }

          
          this.fs.updateDocument("/users/", this.user.uid, this.user);
          this.user = await this.fs.getDocument("users", user_firebase.uid);
        } else {
          this.user = {
          displayName: user_firebase.displayName,
          photoURL: user_firebase.photoURL,
          uid: user_firebase.uid,
          pics: [
            "../../assets/imgs/noimage.png", 
            "../../assets/imgs/noimage.png", 
            "../../assets/imgs/noimage.png", 
            "../../assets/imgs/noimage.png",
            "../../assets/imgs/noimage.png",
            "../../assets/imgs/noimage.png"],
            gender: "",
            relationship: "",
            job: "", 
            occupation: "",
            location: location,
            checkdnPlaces: this.checkdnPlaces,
            checkdn: this.checkdnPlaces[0],
            online: true,
          }
            // set in firestore
        this.fs.setDocument("/users/", this.user.uid, this.user);

       
        }

        // run the service to delete user after log off
        this.db.removeCheckdnOnLogOff(this.user.uid);

        // set in local storage
        this.ls.set("user", this.user);

        
        
        this.loading.hide();

        
        this.navCtrl.setRoot("HomePage");
       
        
      } else {
        this.loading.hide();
      }
    })
  }

}
