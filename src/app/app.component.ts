import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { Platform } from '../../node_modules/ionic-angular/platform/platform';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = "WelcomePage";
  constructor(public platform: Platform) {
    this.initializeApp();
    this.pages = [
      { title: 'Home', component: "HomePage" },
      { title: 'Messages', component: "MessageListPage", },
      { title: 'Profile', component: "ProfilePage" }
    ];
    
  }

  pages: Array<{title: string, component: any}>;

  

  initializeApp() {
    this.platform.ready().then(() => {
   
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

