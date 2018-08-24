import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewProfilePage } from './view-profile';
import { IonicImageViewerModule } from 'ionic-img-viewer';
@NgModule({
  declarations: [
    ViewProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewProfilePage),
    IonicImageViewerModule
  ],
})
export class ViewProfilePageModule {}
