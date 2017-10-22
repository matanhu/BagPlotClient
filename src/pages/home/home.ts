import { ProjectProvider } from '../../providers/project/project';
import { NewProjectPage } from '../new-project/new-project';
import { ProjectlistPage } from '../projectlist/projectlist';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  public countProjects;

  constructor(
    public navCtrl: NavController,
    private projectProvider: ProjectProvider) {
      this.projectProvider.getCountOfProjects().subscribe(
        (res) => {
          if(res.isSuccess) {
            this.countProjects = res.countProjects;
          }
        });
  }

  onAllProjects() {
    this.navCtrl.push(ProjectlistPage);
  }

  onNewProject() {
    this.navCtrl.push(NewProjectPage);
  }
}
