import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/Rx';
import { Content } from 'ionic-angular';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FunctionsProvider } from '../../providers/functions/functions';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  isim:any;
  userid: any;
  messages: Observable<any[]>;
  userKey: any;
  friendKey: any;
  friendName:any;
  friendId:any;
  username:any;
  userpic:any;
  subscription: any;
  message: string='';
  items: Observable<any[]>;
  labels:any;
  @ViewChild(Content) content: Content;

  constructor(public functions: FunctionsProvider, public http: Http, private afAuth: AngularFireAuth, public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    if (window.localStorage.getItem("username") !== undefined || window.localStorage.getItem("username") !== null)
      {
        this.username = window.localStorage.getItem("username");
        this.userpic = window.localStorage.getItem("userpic");
      }  
      this.userid=window.localStorage.getItem('userid');

    this.labels=this.db.list('/chat');

    this.items = db.list('chat').valueChanges();
    this.afAuth.authState.subscribe(auth => {
    //  this.userid=auth.uid;
    })
    this.isim=`messages/${this.friendId}/${this.userid}`;
    this.friendName=  this.navParams.get('username');
    this.friendId=  this.navParams.get('userid');

          this.messages = db.list(`messages/${this.friendId}/${this.userid}`).valueChanges();

        var friendId=this.friendId
        var curUserId= this.userid;

        var query = this.db.database.ref("friends").orderByKey();
        query.once("value")
          .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            childSnapshot.forEach(function(ohSnap){
             if(ohSnap.child("userid").val()==friendId){
              window.localStorage.setItem("friendKey", ohSnap.key);
             }
             if(ohSnap.child("userid").val()==curUserId){
              window.localStorage.setItem("userKey", ohSnap.key);
             }
            })

          });
        });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');

  }
ionViewDidEnter(){
  this.friendKey=window.localStorage.getItem("friendKey");
  this.userKey=window.localStorage.getItem("userKey");
    this.content.scrollToBottom();

}
   sendMessage(){
    this.functions.sendMessage(this.friendId, this.friendKey, this.message, this.userKey);
    this.message='';
     //to add a little delay before scroll
    setTimeout(()=>{
      this.content.scrollToBottom(200);
    })
    this.functions.pushNotification(this.username, this.message, this.friendName)
  } 

}
