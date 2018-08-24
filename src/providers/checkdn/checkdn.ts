import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';

declare var google;
@Injectable()
export class CheckdnProvider {

  constructor() {
    console.log('Hello CheckdnProvider Provider');
  }



  user;
  location;
  checkdnPlaces;


// async checkAlreadyCheckdn(){
// let fsUser = await this.fs.getDocument("users", this.user.uid);
// return new Promise((resolve)=>{
// if(fsUser.checkdn.placeid == this.user.checkdn.placeid){
// console.log("Already Checkdn");
// resolve()
// } else {
// console.log("Not Already Checkdn");
// console.log(fsUser.checkdn.placeid, this.user.checkdn.placeid);
// resolve();
// }

// })
// }



// checkNoCheckdnPlaces(){
// return new Promise((resolve)=>{
// if(this.checkdnPlaces.length == 0){
//   this.checkdnPlaces = this.defaultCheckdn;
//   this.fs.updateDocument("users", this.user.uid, {checkdn: this.defaultCheckdn[0]});
//   this.updateCheckdnLocation();
//   return resolve(true)
// } else {
//   this.fs.updateDocument("users", this.user.uid, {checkdn: this.checkdnPlaces[0]});
//   return resolve(false)
// }
// })
// }

}
