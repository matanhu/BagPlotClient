import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewProjectItemPage } from './new-project-item';

@NgModule({
  declarations: [
    NewProjectItemPage,
  ],
  imports: [
    IonicPageModule.forChild(NewProjectItemPage),
  ],
})
export class NewProjectItemPageModule {}
