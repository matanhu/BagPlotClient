import { ProjectItemProvider } from '../../providers/project-item/project-item';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { ItemProject } from '../../models/itemProject';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-edit-project-item',
  templateUrl: 'edit-project-item.html',
})
export class EditProjectItemPage {

  public projectItem = new ItemProject();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private projectItemProvider: ProjectItemProvider,
    public camera: Camera,
    public firebaseProvider: FirebaseProvider) {
      this.projectItem = this.navParams.get('projectItem');
      this.projectItemProvider.getProjectItemById(this.projectItem).subscribe(
        (res) => {
          if(res.isSuccess) {
            this.projectItem = res;
          }
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProjectItemPage');
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
        return this.firebaseProvider.uploadImageItemProject(base64Image, this.projectItem.project_id, this.projectItem.id);
      })
      .then(data => {
        console.log(data.downloadURL);
        this.projectItem.image = data.downloadURL;
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
    this.projectItemProvider.updateProjectItem(this.projectItem).subscribe(
      (res) => {
        if(res.isSuccess) {
          // this.navCtrl.pop();
          this.projectItem = res;
              this.viewCtrl.dismiss();
        }
      }
    );
  }

  

}
