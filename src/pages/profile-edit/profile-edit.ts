import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { Storage } from '../../../node_modules/@ionic/storage';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {
 boxwd: any;

  constructor(
    private toast: ToastProvider,
    private loading: LoadingProvider,
    private fs: FirestoreProvider,
    private ls: Storage,
    private storage: StorageProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  pics = [];
  images = [];
  user;
  company;
  job;
  college;
  gender;
  relationship;

  async ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileeditPage');
    await this.setheight();
    await this.getUser();
    await this.getImages();
  }
  async getUser(){
    this.user = await this.ls.get('user');
    this.pics = this.user.pics;
    this.pics[0] = this.user.photoURL;
    this.company = this.user.company;
    this.job = this.user.job;
    this.college = this.user.college;
    this.gender = this.user.gender;
    this.relationship = this.user.relationship;
    console.log(this.user)
  }
  setheight() {
    var wd = document.getElementById("img_wrapper");
    this.boxwd = wd.offsetWidth;
    wd.style.height = this.boxwd+'px';

    var bottomwd = document.getElementById("bottom_img");
    this.boxwd = bottomwd.offsetWidth;
    bottomwd.style.height = this.boxwd+'px';
  }

  previewPic(number, event){
    let imageFile = event.target.files[0];
    
    let reader = new FileReader();
    let that = this;
    reader.addEventListener("load", function () {
      // that.pics[number] = reader.result;
    }, false);
      that.images[number] = imageFile;
    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
    firebase.storage().ref("/images/" + this.user.uid + "/proflie/pic" + number).put(imageFile).then((url)=>{
      url.ref.getDownloadURL().then((url)=>{
        this.pics[number] =  url.toString();
      })
    })
  }
  getImages(){
    for (let index = 0; index < this.pics.length; index++) {
      const element = this.pics[index];
      
    }
    this.pics.forEach((pic)=>{
      console.log(pic);
      if(!pic){
        pic = "../../assets/imgs/noimage.png";
      } else {
        console.log("x", pic)
      }
    })
  }

   async saveToStorage(id, imageFile, ){
     this.loading.show();
    if(imageFile){
      return await this.storage.uploadFileBlob('/images/' + this.user.uid + "/profilePic" + id + ".jpg", imageFile)
      .then((ref)=>{
        this.loading.hide();
        return ref;
      })
    } 
    
  }
async save(){
  this.loading.show();

  let user = {
    pics: this.pics,
    job: this.job,
    company: this.company,
    college: this.college,
    gender: this.gender,
    relationship: this.relationship,
  }

  
  this.fs.updateDocument("/users/", this.user.uid, user);
  let lsUser = await this.fs.getDocument("/users/", this.user.uid);
  this.ls.set("user", lsUser);
  this.loading.hide();
  this.toast.show("Your profile has been updated!");
  console.log(this.pics)
}
}
