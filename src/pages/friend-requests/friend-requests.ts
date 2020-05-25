import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Subject } from 'rxjs/Subject';
import firebase from 'firebase/app';
import { Deneme } from "../../models/deneme";
import { FunctionsProvider } from '../../providers/functions/functions';
/**
 * Generated class for the FriendRequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friend-requests',
  templateUrl: 'friend-requests.html',
})
export class FriendRequestsPage {
  private dbRef= firebase.database().ref('friends');
  private dbRef2= firebase.database().ref('requests');
  public userid: any;
  username: any;
  userpic: any;
  names: any[];
  items: Observable<any[]>;
  deneme = {} as Deneme;
  
  constructor(public functions: FunctionsProvider, public db: AngularFireDatabase, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    this.userid=window.localStorage.getItem('userid');
    this.username=window.localStorage.getItem('username')
    this.userpic=window.localStorage.getItem('userpic')
    this.items = db.list(`requests/${this.userid}`).valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendRequestsPage');
  }

  addFriend(friend){
      this.functions.addFriend(friend);
  }
  delete(stranger){
    this.functions.delete(stranger);
  }

}
