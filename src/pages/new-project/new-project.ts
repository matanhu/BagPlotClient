import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ContactProvider } from '../../providers/contact/contact';
import { ProjectProvider } from '../../providers/project/project';
import { Observable } from 'rxjs/Rx';
import { CustomerProvider } from '../../providers/customer/customer';
import { ItemProject } from '../../models/itemProject';
import { Contact } from '../../models/contacts';
import { Project } from '../../models/project';
import { ConstMessage } from '../../Consts/ConstMessage';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';



@IonicPage()
@Component({
  selector: 'page-new-project',
  templateUrl: 'new-project.html',
})
export class NewProjectPage implements OnInit, OnDestroy{
  public listMessages = new Array<any>();
  public project: Project;

  private stepNumber = 0;
  private lastAnswers = new Array<string>();
  private trueFalseLast: Boolean;
  public message: string;
  @ViewChild('textMessage', {read: ElementRef}) textMessageElm: ElementRef;

  private autoScroller: MutationObserver;
  private scrollOffset = 0;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private customerProvider: CustomerProvider,
    private projectProvider: ProjectProvider,
    private contactProvider: ContactProvider,
    private firebaseProvider: FirebaseProvider,
    private camera: Camera,
    private el: ElementRef) {
    this.insertMessageToList(ConstMessage['helloNewProject'], 'other');
    this.project = new Project(0, '','','',new Array<Contact>(), new Array<ItemProject>());
  }

  ngOnInit() {
    this.autoScroller = this.autoScroll();
  }

  ngOnDestroy() {
    this.autoScroller.disconnect();
  }

  insertMessageToList(message, ownership) {
    let messageTemp = {
      content: message,
      createdAt: new Date(),
      ownership: ownership === 'other' ? 'other' : 'mine'
    };
    this.listMessages.push(messageTemp);
  }

  checkIfCustomerExist(customer_name) {
    let customer = {
      customer_name: customer_name,
      id: 0
    }
    let resultArray = new Array<any>();
    return new Observable(observer => {
      this.customerProvider.getCustomersByName(customer).subscribe(
        (res) => {
          if(res.isSuccess) {
            let customerLength = res.customers.length;
            for(var i = 0 ; i < customerLength ; i ++) {
              if(res.customers[i].customer_name === customer_name) {
                resultArray.splice(0,resultArray.length);
                resultArray.push(res.customers[i]);
                observer.next(resultArray);
                observer.complete();
              }else if (res.customers[i].customer_name.indexOf(customer_name) > -1) {
                resultArray.push(res.customers[i]);
              };
            }
            observer.next(resultArray);
            observer.complete();
          } else {
            //Need to add Error Message
          }
        }
      );

    });
    // return this.observable;
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
    console.log('ionViewDidLoad NewProjectPage');
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
        this.selectNewOrExistCustomer();
        break
      case 1:
        this.createCustomerName();
        break
      case 2:
        this.createProjectName();
        break
      case 3:
        this.createProjectDescription();
        break
      case 4:
        this.isAddContact();
        break
      case 5:
        this.createContactFirstName();
        break
      case 6:
        this.createContactLastName();
        break
      case 7:
        this.addContactPosition();
        break
      case 8:
        this.createContactPhoneOffice();
        break
      case 9:
        this.createContactFax();
        break
      case 10:
        this.createContactCellular();
        break
      case 11:
        this.createContactEmail();
        break
      case 20:
        this.customerNotFound();
        break
      
    }
    this.lastAnswers.push(this.message);
    this.message = '';
    // document.getElementById('messageInputBox').childNodes[0].focus();
    this.textMessageElm.nativeElement.querySelector('textarea').focus();
  }

  selectNewOrExistCustomer() {
    if (this.message === 'כן') {
      this.trueFalseLast = true;
      // this.lastAnswer = this.message;
      this.insertMessageToList(ConstMessage.createCustomerName, 'other');
      this.stepNumber++;
    } else if(this.message === 'לא') {
      this.trueFalseLast = false;
      // this.lastAnswer = this.message;
      this.insertMessageToList(ConstMessage.findOldCustomerName, 'other');
      this.stepNumber++;
    } else {
      this.insertMessageToList(ConstMessage.helloNewProject, 'other');
    }
  }

  createCustomerName() {
    if(this.trueFalseLast) {
      let customer = {
        customer_name: this.message,
        id: 0
      }
      this.customerProvider.createCustomer(customer).subscribe(
        (res) => {
          if(res.isSuccess) {
            this.project.customer_id = res.id;
            this.insertMessageToList(ConstMessage.createProjectName, 'other');
            this.stepNumber++;
          }
          console.log(res);
        }
      )
    } else if(!this.trueFalseLast) {
      let tempMessage = this.message;
      this.checkIfCustomerExist(this.message).subscribe(
        (customerExists: Array<any>) => {
          if(customerExists.length === 1 && customerExists[0].customer_name === tempMessage) {
            this.project.customer_id = customerExists[0].id;
            this.insertMessageToList(ConstMessage.createProjectName, 'other');
            this.stepNumber++;
          } else if(customerExists.length > 0) {
            var answer = ConstMessage.foundMultiCustomersName;
            for(var i = 0 ; i < customerExists.length ; i++) {
              answer += `<div>` + customerExists[i].customer_name + `</div>`;
            }
            this.insertMessageToList(answer, 'other');
           } else {
            this.insertMessageToList(ConstMessage.notFoundCustomerName, 'other');
            this.stepNumber = 20;
          }
        } 
      )
    }
  }

  customerNotFound() {
    if(this.message == 'כן') {
      this.trueFalseLast = true;
      let customer = {
        customer_name: this.lastAnswers[this.lastAnswers.length-1],
        id: 0
      }
      this.customerProvider.createCustomer(customer).subscribe(
        (res) => {
          if(res.isSuccess) {
            this.project.customer_id = res.id;
            this.insertMessageToList(ConstMessage.createProjectName, 'other');
            this.stepNumber = 2;
          }
          console.log(res);
        }
      )
    } else if(this.message == 'לא') {
      this.trueFalseLast = false;      
      this.insertMessageToList(ConstMessage.findOldCustomerName, 'other');
      this.stepNumber = 1;
      // this.lastAnswer = 'לא';
    } else {
      this.insertMessageToList(ConstMessage.notFoundCustomerName, 'other');
      this.stepNumber = 20;
    }
  }

  createProjectName() {
    this.insertMessageToList(ConstMessage.createProjectDescription, 'other');
    this.stepNumber++;
    this.project.project_name = this.message;
  }

  createProjectDescription() {
    this.project.description = this.message;
    this.projectProvider.createProject(this.project).subscribe(
      (res) => {
        if(res.isSuccess) {
          this.project.id = res.id;
          this.insertMessageToList(ConstMessage.isAddContact, 'other');
          this.stepNumber++;
        } else {
          console.log(res.errorMessage);
        }
      }
    )
  }

  isAddContact() {
    if(this.message === 'כן') {
      this.trueFalseLast = true;
      let tempContact = new Contact();
      tempContact.project_id = this.project.id;
      this.project.contacts.push(tempContact);
      this.insertMessageToList(ConstMessage.addContactFirstName, 'other');
      this.stepNumber++;
    } else if(this.message === 'לא') {
      this.trueFalseLast = false;
      this.insertMessageToList(ConstMessage.thankYou, 'other');
      this.stepNumber = 50;
    } else {
      this.insertMessageToList(ConstMessage.isAddContact, 'other');
    }
  }

  createContactFirstName() {
    this.insertMessageToList(ConstMessage.addContactLastName, 'other');
    let contatLength = this.project.contacts.length;
    this.project.contacts[contatLength - 1].firstName = this.message;
    this.stepNumber++;
  }

  createContactLastName() {
    this.insertMessageToList(ConstMessage.addContactPosition, 'other');
    let contatLength = this.project.contacts.length;
    this.project.contacts[contatLength - 1].lastName = this.message;
    this.stepNumber++;
  }

  addContactPosition() {
    this.insertMessageToList(ConstMessage.addContactPhoneOffice, 'other');
    let contatLength = this.project.contacts.length;
    this.project.contacts[contatLength - 1].position = this.message;
    this.stepNumber++;
  }

  createContactPhoneOffice() {
    this.insertMessageToList(ConstMessage.addContactFaxNumber, 'other');
    let contatLength = this.project.contacts.length;
    this.project.contacts[contatLength - 1].phoneOffice = this.message;
    this.stepNumber++;
  }

  createContactFax() {
    this.insertMessageToList(ConstMessage.addContactCellular, 'other');
    let contatLength = this.project.contacts.length;
    this.project.contacts[contatLength - 1].faxNumber = this.message;
    this.stepNumber++;
  }

  createContactCellular() {
    this.insertMessageToList(ConstMessage.addContactEmail, 'other');
    let contatLength = this.project.contacts.length;
    this.project.contacts[contatLength - 1].cellular = this.message;
    this.stepNumber++;
  }

  createContactEmail() {
    let contatLength = this.project.contacts.length;
    this.project.contacts[contatLength - 1].email = this.message;

    let currentContact = this.project.contacts[contatLength - 1];
    this.contactProvider.createContact(currentContact).subscribe(
      (res) => {
        if(res.isSuccess) {
          this.insertMessageToList(ConstMessage.isAddAdditionalContact, 'other');
          this.stepNumber = 4;
        }
      }
    )
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
        return this.firebaseProvider.uploadImageProject(base64Image, this.project.id);
      })
      .then(data => {
        console.log(data.downloadURL);
        this.project.image = data.downloadURL;
        this.projectProvider.updateProject(this.project).subscribe(
          (projectRes) => {
            if(projectRes.isSuccess) {
              this.project.image = projectRes.image;
              let imageHtml = `<image src="` + base64Image + `">`;
              this.insertMessageToList(imageHtml, 'mine');
            } else {
              console.log(projectRes.errorMessage);
            }
          }
        );
      });
  }

  test(test) {
    console.log(test);
  }
}
