import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectItemPage } from './project-item';

@NgModule({
  declarations: [
    ProjectItemPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectItemPage),
  ],
})
export class ProjectItemPageModule {}
