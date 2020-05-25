import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from "../../models/user";
import { Profile }  from '../../models/profile'
import firebase from 'firebase/app';
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

  user = {} as User;
  profile = {} as Profile;
  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public storage: Storage) {
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

  async login(user: User){
    //   /^[a-zA-Z0-9]+$/.test(this.username)
    //
     if(this.afAuth.auth.currentUser.emailVerified){
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(auth=>{
        window.localStorage.setItem('useremail', user.email);
        window.localStorage.setItem('userpass', user.password);
        window.localStorage.setItem('userid', firebase.auth().currentUser.uid);
        this.navCtrl.setRoot(TabsPage);
        console.log(result);
      }).catch(error=>{
        this.presentAlert(error, '');
      })
     }

    
  }

  register(){
    this.navCtrl.push('RegisterPage');
  }

}

