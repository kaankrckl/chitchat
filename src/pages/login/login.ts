import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string =''; 

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public storage: Storage,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  //alert controller
  presentAlert(title:string, message:string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  login(){
    if(/^[a-zA-Z0-9]+$/.test(this.username)){
      //username is valid
      this.navCtrl.setRoot(TabsPage, {username: this.username});
      window.localStorage.setItem('username', this.username);
    }
    else{
      this.presentAlert('Error', 'Invalid username');
    }
    
  }

}

