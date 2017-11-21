import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  public signinModel = {
    email: '',
    password: ''
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private authenticationProvider: AuthenticationProvider,
    private loadingCtrl: LoadingController) {
    this.signinModel = {
      email: '',
      password: ''
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  onSignin() {
    const loading = this.loadingCtrl.create({
      content: 'טוען',
      spinner: 'bubbles'
    });
    loading.present();
    this.authenticationProvider.signin(this.signinModel).subscribe(
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
