import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { SignupModel } from '../../models/signupModel';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public signupModel = new SignupModel();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private authenticationProvider: AuthenticationProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSignup() {
    const loading = this.loadingCtrl.create({
      content: 'טוען',
      spinner: 'bubbles'
    });
    loading.present();
    this.authenticationProvider.signup(this.signupModel).subscribe(
      (res) => {
        this.navCtrl.setRoot(HomePage);
        console.log(res);
        loading.dismiss();
      }, (err) => {
        console.log(err);
        loading.dismiss();
      });
  }

}
