import { ProjectItemPage } from '../project-item/project-item';
import { ProjectProvider } from '../../providers/project/project';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Project } from '../../models/project';
import { ProjectPage } from '../project/project';


@IonicPage()
@Component({
  selector: 'page-projectlist',
  templateUrl: 'projectlist.html',
})
export class ProjectlistPage {
  
  public projectList: Array<Project>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private projectProvider: ProjectProvider) {
      this.projectProvider.getAllProjects().subscribe(
        (res: any) => {
          if(res.isSuccess) {
            this.projectList = res.projects;
          }
        }
      )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectlistPage');
  }  

  onProjectClick(project) {
    this.navCtrl.push(ProjectPage, {project: project});
  }

}
