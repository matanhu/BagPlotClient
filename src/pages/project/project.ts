import { ContactPage } from '../contact/contact';
import { EditProjectPage } from '../edit-project/edit-project';
import { NewContactPage } from '../new-contact/new-contact';
import { NewProjectItemPage } from '../new-project-item/new-project-item';
import { ProjectItemPage } from '../project-item/project-item';
import { EditProjectItemPage } from '../edit-project-item/edit-project-item';
import { ProjectProvider } from '../../providers/project/project';
import { Project } from '../../models/project';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, 
  ModalController, AlertController, 
  LoadingController, ToastController } from 'ionic-angular';

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
    public toastCtrl: ToastController,
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
    console.log('ionViewDidLoad ProjectPage');
  }

  createDocx() {
    let prompt = this.alertCtrl.create({
      title: 'שליחת קובץ DOC',
      message: "אנא הזן את כתובת המייל אליו ישלח הקישור",
      cssClass: "custom-alert",
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
              const toast = this.toastCtrl.create({
                duration: 3000,
                position: 'bottom',
                cssClass: 'custom-toast-message'
              });
              if (res.isSuccess) {
                toast.setMessage('פרויקט נשלח בהצלחה');
              } else {
                toast.setMessage('זמנית לא ניתן לספק את השירות, אנא נסה מאוחר יותר');
              }
              toast.present();
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
    // this.navCtrl.push(NewProjectItemPage, {project: this.project});
    
    new Promise((resolve, reject) => {
      this.navCtrl.push(NewProjectItemPage, {project: this.project, resolve: resolve});
    }).then((data: any) => {
      switch(data.method) {
        case 'addNewProjectItem':
          this.addedNewProjectItem(data);
          break
      }
      console.log('return data: ');
      console.log(data);
    });
  }

  onAddContact() {
    // this.navCtrl.push(NewContactPage, {project: this.project});

    new Promise((resolve, reject) => {
      this.navCtrl.push(NewContactPage, {project: this.project, resolve: resolve});
    }).then((data: any) => {
      switch(data.method) {
        case 'addNewContact':
          this.addedNewContact(data);
          break
      }
      console.log('return data: ');
      console.log(data);
    });
  }

  onEditProjectItem(projectItem) {
    this.navCtrl.push(EditProjectItemPage, {projectItem: projectItem})
  }

  onEditProject() {
    this.navCtrl.push(EditProjectPage, {project: this.project});
  }

  onDeleteProject() {
    let confirm = this.alertCtrl.create({
      title: 'מחיקת פרויקט',
      message: 'האם אתה בטוח כי ברצונך למחוק פרויקט זה??',
      cssClass: "custom-alert",
      buttons: [
        {
          text: 'לא',
          handler: () => {
            console.log('Agree clicked');
          }
        },
        {
          text: 'כן',
          handler: () => {
            this.projecrProvider.deleteProjectById(this.project.id).subscribe(
              (res) => {
                if(res.isSuccess) {
                  let deleteProjectRes = {
                    method: 'deleteProject',
                    isSuccess: res.isSuccess,
                    project: this.project
                  }
                  this.navParams.get('resolve')(deleteProjectRes);
                  this.navCtrl.pop();
                }
              });
          }
        }
      ]
    });
    confirm.present();
  }

  addedNewProjectItem(data) {
    if(data.isSuccess) {
      this.project.itemsProject.push(data.itemProject);
    }    
  }

  addedNewContact(data) {
    if(data.isSuccess) {
      this.project.contacts.push(data.contact);
    }    
  }

  onProjectItemClick(projectItem) {
    this.navCtrl.push(ProjectItemPage, {projectItem: projectItem});
  }

  onContactClick(contact) {
    this.navCtrl.push(ContactPage, {contact: contact});
  }


}
