import { Contact } from '../../models/contacts';
import { ConstNewContactMessages } from '../../Consts/ConstMessage';
import { ContactProvider } from '../../providers/contact/contact';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-new-contact',
  templateUrl: 'new-contact.html',
})
export class NewContactPage {
  private contant = new Contact();
  public listMessages = new Array<any>();
  
  private stepNumber = 0;
  private lastAnswers = new Array<string>();
  private trueFalseLast: Boolean;
  public message: string;
  @ViewChild('textMessage', {read: ElementRef}) textMessageElm: ElementRef;

  private autoScroller: MutationObserver;
  private scrollOffset = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private el: ElementRef,
    private contactProvider: ContactProvider) {
      this.contant.project_id = this.navParams.get('project').id;
      this.insertMessageToList(ConstNewContactMessages['helloNewContact'], 'other');
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
        this.addFirstName();
        break
      case 1:
        this.addLastName();
        break
      case 2:
        this.addPhoneOffice();
        break
      case 3:
        this.addFax();
        break
      case 4:
        this.addCellular();
        break
      case 5:
        this.addEmail();
        break
    }

    this.lastAnswers.push(this.message);
    this.message = '';
    // document.getElementById('messageInputBox').childNodes[0].focus();
    this.textMessageElm.nativeElement.querySelector('textarea').focus();
  }

  addFirstName() {
    this.contant.setFirstName( this.message);
    this.stepNumber++;
    this.insertMessageToList(ConstNewContactMessages.addContactLastName, 'other');
  }

  addLastName() {
    this.contant.setLastName(this.message);
    this.stepNumber++;
    this.insertMessageToList(ConstNewContactMessages.insertPhoneOffice, 'other');
  }

  addPhoneOffice() {
    this.contant.setPhoneOffice(this.message);
    this.insertMessageToList(ConstNewContactMessages.insertFaxNumber, 'other');
    this.stepNumber++;
  }

  addFax() {
    this.contant.setFax(this.message);
    this.insertMessageToList(ConstNewContactMessages.insertCellular, 'other');
    this.stepNumber++;
  }

  addCellular() {
    this.contant.setCellular(this.message);
    this.insertMessageToList(ConstNewContactMessages.insertEmail, 'other');
    this.stepNumber++;
  }

  addEmail() {
    this.contant.setEmail(this.message);
    this.contactProvider.createContact(this.contant).subscribe(
      (res) => {
        if(res.isSuccess) {
          this.insertMessageToList(ConstNewContactMessages.thankYou, 'other');
          this.stepNumber++;
        }
      });
  }

}
