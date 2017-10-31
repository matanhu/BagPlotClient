import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ProjectItemProvider } from '../../providers/project-item/project-item';
import { ItemProject } from '../../models/itemProject';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ConstNewItemMessages } from '../../Consts/ConstMessage';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-new-project-item',
  templateUrl: 'new-project-item.html',
})
export class NewProjectItemPage implements OnInit, OnDestroy {
  private itemProject = new ItemProject();
  public listMessages = new Array<any>();
  
  private stepNumber = 0;
  private lastAnswers = new Array<string>();
  private trueFalseLast: Boolean;
  public message: string;
  private isAddSuccess = false;
  @ViewChild('textMessage', {read: ElementRef}) textMessageElm: ElementRef;

  private autoScroller: MutationObserver;
  private scrollOffset = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private el: ElementRef,
    private camera: Camera,
    private firebaseProvider: FirebaseProvider,
    private projectItemProvider: ProjectItemProvider) {
      this.itemProject.project_id = this.navParams.get('project').id;
      this.insertMessageToList(ConstNewItemMessages['helloNewItem'], 'other');
  }

  ngOnInit() {
    this.autoScroller = this.autoScroll();
  }

  ngOnDestroy() {
    this.autoScroller.disconnect();

    let newProjectItem = {
      method: 'addNewProjectItem',
      isSuccess: this.isAddSuccess,
      itemProject: this.itemProject
    }
    this.navParams.get('resolve')(newProjectItem);
  }

  insertMessageToList(message, ownership) {
    let messageTemp = {
      content: message,
      createdAt: new Date(),
      ownership: ownership === 'other' ? 'other' : 'mine'
    };
    this.listMessages.push(messageTemp);
  }

  autoScroll(): MutationObserver {
    const autoScroller = new MutationObserver(this.scrollDown.bind(this));
 
    autoScroller.observe(this.messagesList, {
      childList: true,
      subtree: true
    });
 
    return autoScroller;
  }

  scrollDown(): void {
    // Scroll down and apply specified offset
    this.scroller.scrollTop = this.scroller.scrollHeight - this.scrollOffset;
    // Zero offset for next invocation
    this.scrollOffset = 0;
  }

  private get scroller(): Element {
    return this.messagesList.querySelector('.scroll-content');
  }

  private get messagesList(): Element {
    return this.messagesPageContent.querySelector('.messages');
  }

  private get messagesPageContent(): Element {
    return this.el.nativeElement.querySelector('.messages-page-content');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewProjectItemPage');
  }

  onInputKeypress(keyCode: KeyboardEvent): void {
    // if (keyCode.charCode === 13) {
    //   this.sendTextMessage();
    // }
  }

  changeTextMessage() {
    // get elements
    var element   = document.getElementById('messageInputBox');
    var textarea  = element.getElementsByTagName('textarea')[0];

    // set default style for textarea
    textarea.style.minHeight  = '0';
    textarea.style.height     = '0';

    // limit size to 96 pixels (6 lines of text)
    var scroll_height = textarea.scrollHeight;
    if(scroll_height > 64)
      scroll_height = 64;

    // apply new style
    element.style.height      = scroll_height + "px";
    textarea.style.minHeight  = scroll_height + "px";
    textarea.style.height     = scroll_height + "px";
  }

  sendTextMessage(): void {
    // If message was yet to be typed, abort
    if (!this.message) {
      return;
    }
    this.message = this.message.trim();
    this.insertMessageToList(this.message, 'mine');

    switch(this.stepNumber) {
      case 0:
        this.addItemName();
        break
      case 1:
        this.addDescription();
        break
    }

    this.lastAnswers.push(this.message);
    this.message = '';
    // document.getElementById('messageInputBox').childNodes[0].focus();
    this.textMessageElm.nativeElement.querySelector('textarea').focus();
  }

  addItemName() {
    this.itemProject.setName(this.message);
    this.projectItemProvider.createProjecrItem(this.itemProject).subscribe(
      (res) => {
        if(res.isSuccess) {
          this.itemProject.id = res.id;
          this.itemProject.date_created = res.date_created;
          this.insertMessageToList(ConstNewItemMessages.insertDescription, 'other');
          this.stepNumber++;
          this.isAddSuccess = true;
        }
      }
    );
  }

  addDescription() {
    this.itemProject.setDescription(this.message);
    this.projectItemProvider.updateProjectItem(this.itemProject).subscribe(
      (res) => {
        if(res.isSuccess) {
          this.insertMessageToList(ConstNewItemMessages.addImage, 'other');
          this.stepNumber++;
        }
      }
    );
  }

  takePhoto() {
    var base64Image;
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options)
      .then(data => {
        base64Image = 'data:image/jpeg;base64,' + data;
        return this.firebaseProvider.uploadImageItemProject(base64Image, this.itemProject.project_id, this.itemProject.id);
      })
      .then(data => {
        console.log(data.downloadURL);
        this.itemProject.image = data.downloadURL;
        this.projectItemProvider.updateProjectItem(this.itemProject).subscribe(
          (projectRes) => {
            if(projectRes.isSuccess) {
              this.itemProject.image = projectRes.image;
              let imageHtml = `<image src="` + base64Image + `">`;
              this.insertMessageToList(imageHtml, 'mine');
            } else {
              console.log(projectRes.errorMessage);
            }
          }
        );
      });
  }

}
