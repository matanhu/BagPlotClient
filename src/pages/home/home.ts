import { NewProjectPage } from '../new-project/new-project';
import { ProjectlistPage } from '../projectlist/projectlist';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  onAllProjects() {
    this.navCtrl.push(ProjectlistPage);
  }

  onNewProject() {
    this.navCtrl.push(NewProjectPage);
  }
}
