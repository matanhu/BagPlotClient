import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProjectItemPage } from './edit-project-item';

@NgModule({
  declarations: [
    EditProjectItemPage,
  ],
  imports: [
    IonicPageModule.forChild(EditProjectItemPage),
  ],
})
export class EditProjectItemPageModule { }
