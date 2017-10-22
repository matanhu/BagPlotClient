import { NewProjectItemPage } from '../new-project-item/new-project-item';
import { ProjectItemPage } from '../project-item/project-item';
import { EditProjectItemPage } from '../edit-project-item/edit-project-item';
import { ProjectProvider } from '../../providers/project/project';
import { Project } from '../../models/project';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

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
    public modalCtrl: ModalController,
    private projecrProvider: ProjectProvider) {
    this.project = this.navParams.get('project');
    this.projecrProvider.getProjectByIdClient(this.project.id).subscribe(
      (res) => {
        if(res.isSuccess) {
          this.project = res;
        }
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectPage');
  }

  createDocx() {
    this.projecrProvider.createDocx(this.project).subscribe
      ((res) => {
        console.log(res);
      });
  }

  onAddProjectItem() {
    this.navCtrl.push(NewProjectItemPage, {project: this.project});
    // this.navCtrl.push(EditProjectItemPage, {project: this.project});
    // this.navCtrl.push(EditProjectItemPage, {project: this.project, callback: this.onNewProjectItemDismiss.bind(this)});
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
