import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Deneme } from "../../models/deneme";
import { FunctionsProvider } from '../../providers/functions/functions';
/**
 * Generated class for the AddFriendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-friend',
  templateUrl: 'add-friend.html',
})
export class AddFriendPage {
  private dbRef= firebase.database().ref('requests');
  private dbRef2= firebase.database().ref('invites');
  currUserId: any;
  currUserName: any;
  username: string='';
  currUserPic: any;
  userid: Observable<any[]>;
  names: any[];
  deneme = {} as Deneme;
  constructor(public functions: FunctionsProvider, public db: AngularFireDatabase, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    this.currUserId=window.localStorage.getItem('userid');
    this.currUserName=window.localStorage.getItem('username');
    this.currUserPic = window.localStorage.getItem("userpic");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFriendPage');
  }

  sendRequest(){
    this.functions.presentToast("Friend request successfully sent!");
    var currUserName=this.currUserName
    var currUserId=this.currUserId
    var currUserPic=this.currUserPic
    var dbRef2=this.dbRef2;
    var dbRef=this.dbRef;
    var username=this.username
    var db = this.db.database.ref();
    var query = this.db.database.ref("users").orderByKey();
    query.once("value")
      .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var pkey = childSnapshot.key; 
        var chval = childSnapshot.val();
        console.log(chval);
         if(childSnapshot.child("username").val()==username){
          dbRef2.child(currUserId).push({
            username: childSnapshot.child("username").val(),
            userid: childSnapshot.child("userid").val(),
            userpic: childSnapshot.child("pic").val()
        })
          dbRef.child(childSnapshot.child("userid").val()).push({
            username: currUserName,
            userpic: currUserPic,
            userid: currUserId
        })
         }
         
      });
    });
  }

}
