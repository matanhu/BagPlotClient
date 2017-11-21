import { ProjectItemProvider } from '../../providers/project-item/project-item';
import { ItemProject } from '../../models/itemProject';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-project-item',
  templateUrl: 'project-item.html',
})
export class ProjectItemPage {
  public projectItem = new ItemProject();
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private projectItemProvider: ProjectItemProvider) {
      this.projectItem = this.navParams.get('projectItem');
      const loading = this.loadingCtrl.create({
        content: 'טוען',
        spinner: 'bubbles'
      });
      loading.present();
      this.projectItemProvider.getProjectItemById(this.projectItem).subscribe(
        (projectItemRes) => {
          this.projectItem = projectItemRes;
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
    console.log('ionViewDidLoad ProjectItemPage');
  }

}
