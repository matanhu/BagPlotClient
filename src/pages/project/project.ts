import { NewContactPage } from '../new-contact/new-contact';
import { NewProjectItemPage } from '../new-project-item/new-project-item';
import { ProjectItemPage } from '../project-item/project-item';
import { EditProjectItemPage } from '../edit-project-item/edit-project-item';
import { ProjectProvider } from '../../providers/project/project';
import { Project } from '../../models/project';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-project',
  templateUrl: 'project.html',
})
export class ProjectPage {

  public project: Project;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private projecrProvider: ProjectProvider) {
    this.project = this.navParams.get('project');
    const loading = this.loadingCtrl.create({
      content: 'טוען',
      spinner: 'bubbles'
    });
    loading.present();
    this.projecrProvider.getProjectByIdClient(this.project.id).subscribe(
      (res) => {
        if(res.isSuccess) {
          this.project = res;
        }
        loading.dismiss();
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectPage');
  }

  createDocx() {
    let prompt = this.alertCtrl.create({
      title: 'שליחת קובץ DOC',
      message: "אנא הזן את כתובת המייל אליו ישלח הקישור",
      cssClass: "alertRtl",
      inputs: [
        {
          name: 'emailTo',
          placeholder: 'הכנס כתובת דוא"ל'
        },
      ],
      buttons: [
        {
          text: 'ביטול',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'שלח',
          handler: data => {
            this.projecrProvider.createDocx(this.project, data.emailTo).subscribe
            ((res) => {
              console.log(res);
            });
            console.log(data);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  onAddProjectItem() {
    this.navCtrl.push(NewProjectItemPage, {project: this.project});
    // this.navCtrl.push(EditProjectItemPage, {project: this.project});
    // this.navCtrl.push(EditProjectItemPage, {project: this.project, callback: this.onNewProjectItemDismiss.bind(this)});
  }

  onAddContact() {
    this.navCtrl.push(NewContactPage, {project: this.project});
  }

  onEditProjectItem(projectItem) {
    this.navCtrl.push(EditProjectItemPage, {projectItem: projectItem})
  }

  onNewProjectItemDismiss(newItem) {
    return new Promise((resolve, reject) => {
      this.project.itemsProject.push(newItem);
      resolve();
    });
    
  }

  onProjectItemClick(projectItem) {
    this.navCtrl.push(ProjectItemPage, {projectItem: projectItem});
  }


}
