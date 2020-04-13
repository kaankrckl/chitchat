import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from '@angular/fire/auth';
import { Profile }  from '../../models/profile'
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/Rx';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;
  profile = {} as Profile;
  constructor(public db: AngularFireDatabase, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async register(user: User){
   try{
     const result =await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
     console.log(result);
     if(result){
       this.afAuth.authState.subscribe(auth => {
         this.profile.userid=auth.uid;
         this.db.object(`users/${auth.uid} ` ).set(this.profile);
       })
     }
   }
   catch(e){
     console.log(e);
   }
  }

}
