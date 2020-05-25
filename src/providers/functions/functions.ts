import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/Rx';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the FunctionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FunctionsProvider {

  private dbRef= firebase.database().ref('messages');
  private dbRef2= firebase.database().ref('friends');
  username:any;
  userpic:any;
  userid: any;
  

  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController, public http: Http, private afAuth: AngularFireAuth, public db: AngularFireDatabase) {
  }
  private initGetUserInfo() {
    this.username = window.localStorage.getItem("username");
    this.userpic = window.localStorage.getItem("userpic");
    this.userid=window.localStorage.getItem('userid');
  }

  sendMessage(friendId, friendKey, message, userKey){
    this.initGetUserInfo();

    this.dbRef.child(this.userid).child(friendId).push({
    username: this.username,
    userpic: this.userpic, 
    message: message,
    from: friendId,
    createdAt: new Date().getHours()+":"+ new Date().getMinutes()}).key;

    this.dbRef.child(friendId).child(this.userid).push({
      username: this.username,
      userpic: this.userpic,
      message: message,
      from: friendId,
      createdAt: new Date().getHours()+":"+ new Date().getMinutes()}).key;

      this.dbRef2.child(this.userid).child(friendKey).update({lastMessage: message, timeStamp: new Date().getTime()});
      this.dbRef2.child(friendId).child(userKey).update({lastMessage: message, timeStamp: new Date().getTime()});
     
  }

  pushNotification(title, body, friendName){
    let headers = new Headers({ 'Authorization': 'key=AAAAiMA0-4s:APA91bHjMQERtytXRsPInsoyWQRzL0CMfOcB7ZFgY8zARYdJ3LCieu72iJ1uk9_2Eogi7m4PbTC772HhTtWGlXGXNJ8Iknmn9YGemjMwulDAT6PKnC-AZHQTkJQ8jbjrR0UBnTBqu3-M', 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let notification = {
      "notification": {
        "title":title,
        "body": body,
        "click_action": "FCM_PLUGIN_ACTIVITY",
        "sound": "on"
      }, "data": {
        //OPTIONAL PARAMS
      },
      //"to": "",
      "condition": `('${friendName}' in topics)`,
      "priority": "high"
    }
    let url = 'https://fcm.googleapis.com/fcm/send';
    this.http.post(url, notification, options).subscribe(resp => {
      console.log(resp);
      });
  }

  addFriend(friend){
    this.initGetUserInfo();

    this.dbRef2.child(this.userid).push({
    userid: friend.userid,
    userpic: friend.userpic,
    username: friend.username,}).key;
  
    this.dbRef2.child(friend.userid).push({
      userid: this.userid,
      userpic: this.userpic,
      username: this.username}).key;  

      var username=this.username;

      var db = this.db.database.ref();
      var query = this.db.database.ref("requests").orderByKey();
      query.once("value")
        .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var pkey = childSnapshot.key; 
          var chval = childSnapshot.val();
          console.log(chval);
          childSnapshot.forEach(function(ohSnap){
           if(ohSnap.child("username").val()==friend.username){
            db.child("requests").child(pkey).child(ohSnap.key).remove();
           }
            console.log(ohSnap.child("username").val())
  
          })
  
        });
      });
  var query2 = this.db.database.ref("invites").orderByKey();
  query2.once("value")
    .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var pkey = childSnapshot.key; 
      var chval = childSnapshot.val();
      console.log(chval);
      childSnapshot.forEach(function(ohSnap){
       if(ohSnap.child("username").val()==username){
        db.child("invites").child(pkey).child(ohSnap.key).remove();
       }
        console.log(ohSnap.child("username").val())

      })

    });
  });

    
}

delete(stranger){
  this.initGetUserInfo();
  console.log(this.username)
  var username=this.username;

  var db = this.db.database.ref();
  var query = this.db.database.ref("requests").orderByKey();
  query.once("value")
    .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var pkey = childSnapshot.key; 
      var chval = childSnapshot.val();
      console.log(chval);
      childSnapshot.forEach(function(ohSnap){
       if(ohSnap.child("username").val()==stranger.username){
        db.child("requests").child(pkey).child(ohSnap.key).remove();
       }
        console.log(ohSnap.child("username").val())

      })

    });
  });

  var query2 = this.db.database.ref("invites").orderByKey();
  query2.once("value")
    .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var pkey = childSnapshot.key; 
      var chval = childSnapshot.val();
      console.log(chval);
      childSnapshot.forEach(function(ohSnap){
       if(ohSnap.child("username").val()==username){
        db.child("invites").child(pkey).child(ohSnap.key).remove();
       }
        console.log(ohSnap.child("username").val())

      })

    });
  });
  
  
}

deleteUser(){
  this.initGetUserInfo();
  var db = this.db.database.ref();
  db.child("users").child(this.userid).remove();
}

presentAlert(title, message) {
  let alert = this.alertCtrl.create({
    title: title,
    subTitle: message,
    buttons: ['Dismiss']
  });
  alert.present();
}
presentToast(message) {
  let toast = this.toastCtrl.create({
    message: message,
    duration: 3000,
    position: 'bottom'
  });
  
  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

 setTimeout( ()=>{toast.present();}, 2000)

}
}