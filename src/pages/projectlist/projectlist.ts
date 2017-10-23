import { ProjectProvider } from '../../providers/project/project';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

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
    private loadingCtrl: LoadingController,
    private projectProvider: ProjectProvider) {
      const loading = this.loadingCtrl.create({
        content: 'טוען',
        spinner: 'bubbles'
      });
      loading.present();
      this.projectProvider.getAllProjects().subscribe(
        (res: any) => {
          if(res.isSuccess) {
            this.projectList = res.projects;
          }
          loading.dismiss();
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
