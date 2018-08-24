import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckdnUsersPage } from './checkdn-users';

@NgModule({
  declarations: [
    CheckdnUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckdnUsersPage),
  ],
})
export class CheckdnUsersPageModule {}
