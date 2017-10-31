import { ProjectProvider } from '../../providers/project/project';
import { NewProjectPage } from '../new-project/new-project';
import { ProjectlistPage } from '../projectlist/projectlist';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  public countProjects;

  constructor(
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private projectProvider: ProjectProvider) {
  }

  ionViewWillEnter() {
    const loading = this.loadingCtrl.create({
      content: 'טוען',
      spinner: 'bubbles'
    });
    loading.present();
    this.projectProvider.getCountOfProjects().subscribe(
      (res) => {
        if(res.isSuccess) {
          this.countProjects = res.countProjects;
        }
        loading.dismiss();
      });
  }

  onAllProjects() {
    this.navCtrl.push(ProjectlistPage);
  }

  onNewProject() {
    this.navCtrl.push(NewProjectPage);
  }
}
