import { ProjectProvider } from '../../providers/project/project';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Project } from '../../models/project';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-edit-project',
  templateUrl: 'edit-project.html',
})
export class EditProjectPage {

  public project: Project;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public camera: Camera,
    public projectProvider: ProjectProvider,
    public firebaseProvider: FirebaseProvider) {
    this.project = this.navParams.get('project');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProjectPage');
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options)
      .then(data => {
        let base64Image = 'data:image/jpeg;base64,' + data;
        return this.firebaseProvider.uploadImageProject(base64Image, this.project.id);
      })
      .then(data => {
        console.log(data.downloadURL);
        this.project.image = data.downloadURL;
      });
  }

  onChangeDescription() {
    // get elements
    var element   = document.getElementById('descriptionInputBox');
    var textarea  = element.getElementsByTagName('textarea')[0];

    // set default style for textarea
    textarea.style.minHeight  = '0';
    textarea.style.height     = '0';

    // limit size to 96 pixels (6 lines of text)
    var scroll_height = textarea.scrollHeight + 10;
    if(scroll_height > 96)
      scroll_height = 96;

    // apply new style
    element.style.height      = scroll_height + "px";
    textarea.style.minHeight  = scroll_height + "px";
    textarea.style.height     = scroll_height + "px";
  }

  onSave() {
    this.projectProvider.updateProject(this.project).subscribe(
      (res) => {
        if(res.isSuccess) {
          // this.navCtrl.pop();
          this.project = res;
              this.viewCtrl.dismiss();
        }
      }
    );
  }

}
