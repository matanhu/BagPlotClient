import { ProjectProvider } from '../../providers/project/project';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { Project } from '../../models/project';
import { ProjectPage } from '../project/project';


@IonicPage()
@Component({
  selector: 'page-projectlist',
  templateUrl: 'projectlist.html',
})
export class ProjectlistPage {
  
  public projectList: Array<Project>;
  public searchText = '';
  public isSeachShow = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
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
        }, (err) => {
          loading.dismiss();
          const toast = this.toastCtrl.create({
          duration: 3000,
          position: 'bottom',
          cssClass: 'custom-toast-message',
          message: 'אנא בדוק את חיבור האינטרנט'
        });
        toast.present();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectlistPage');
  }  

  onProjectClick(project) {
    new Promise((resolve, reject) => {
      this.navCtrl.push(ProjectPage, {project: project, resolve: resolve});
    }).then((data: any) => {
      switch(data.method) {
        case 'deleteProject':
          this.deletedProjectRes(data);
          break
      }
      console.log('return data: ');
      console.log(data);
    });
  }

  private deletedProjectRes(data) {
    if(data.isSuccess) {
      let index = this.projectList.findIndex(proj => proj.id === data.project.id);
      if (index > -1) {
        this.projectList.splice(index, 1);
        const toast = this.toastCtrl.create({
          message: 'הפרויקט נמחק בהצלחה',
          duration: 3000,
          position: 'bottom',
          cssClass: 'custom-toast-message'
        });
        toast.present();
      }  
    }
  }

  changeSeachShow(value: boolean) {
    this.isSeachShow = value;
  }

  onSearchInput(event) {
    console.log(event.srcElement.value);
    this.projectProvider.searchProject(this.searchText).subscribe(
      (res: any) => {
        if(res.isSuccess) {
          this.projectList = res.projects;
        }
      });
  }

}
