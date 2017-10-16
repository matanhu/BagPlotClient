import { ProjectItemProvider } from '../../providers/project-item/project-item';
import { ItemProject } from '../../models/itemProject';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    private projectItemProvider: ProjectItemProvider) {
      this.projectItem = this.navParams.get('projectItem');
      this.projectItemProvider.getProjectItemById(this.projectItem).subscribe(
        (projectItemRes) => {
          this.projectItem = projectItemRes;
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectItemPage');
  }

}
