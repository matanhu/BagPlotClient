import { ProjectProvider } from '../../providers/project/project';
import { NewProjectPage } from '../new-project/new-project';
import { ProjectlistPage } from '../projectlist/projectlist';
import { Component } from '@angular/core';
import { LoadingController, NavController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  public countProjects;

  constructor(
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
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

  onAllProjects() {
    this.navCtrl.push(ProjectlistPage);
  }

  onNewProject() {
    this.navCtrl.push(NewProjectPage);
  }
}
