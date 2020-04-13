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
  //deneme
  userid: any;
  private dbRef= firebase.database().ref('messages');
  private mesages=[];
  melakes: Observable<any[]>;
  //deneme

  username:any;
  subscription: any;
  messages: object[]=[];
  message: string='';
  items: Observable<any[]>;
  allCountries: any;
  countries: any[];
  labels:any;
  @ViewChild(Content) content: Content;

  constructor(private afAuth: AngularFireAuth, public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    if (window.localStorage.getItem("username") !== undefined || window.localStorage.getItem("username") !== null)
      {
        this.username = window.localStorage.getItem("username");
      }  
      console.log("USERNAME" + this.username);


    this.labels=this.db.list('/chat');

    this.items = db.list('chat').valueChanges();
    console.log(this.items);

    this.afAuth.authState.subscribe(auth => {
      this.userid=auth.uid;
    })
    //deneme
/*    
    this.dbRef.child('OlEKKspVxVPuwvsJ1tZv2vDT4kE2').child('PaawgbUvOMZXnV4OsI6Z9GiIk3O2').on('child_added', snap =>{
      let messsage=snap.val();
      this.mesages.push(messsage);
    }) */
  
  //deneme
      //deneme2
      this.melakes = db.list('messages/OlEKKspVxVPuwvsJ1tZv2vDT4kE2/PaawgbUvOMZXnV4OsI6Z9GiIk3O2').valueChanges();
    
    //deneme2
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  sendMessage(){

    //denene
    this.dbRef.child(this.userid).child('PaawgbUvOMZXnV4OsI6Z9GiIk3O2').push({
    username: this.username,
    message: this.message,
    from: 'PaawgbUvOMZXnV4OsI6Z9GiIk3O2',
    createdAt: new Date().getTime()}).key;

    this.dbRef.child('PaawgbUvOMZXnV4OsI6Z9GiIk3O2').child(this.userid).push({
      username: this.username,
      message: this.message,
      from: 'PaawgbUvOMZXnV4OsI6Z9GiIk3O2',
      createdAt: new Date().getTime()}).key;
    //deneme

    this.db.list('/friends').push({
      username: "canerkrckl",
      userid: "PaawgbUvOMZXnV4OsI6Z9GiIk3O2",
    })

/* 
    this.db.list('/chat').push({
      username: this.username,
      message: this.message,
      createdAt: new Date().getTime()
    }) */
    this.message='';
    //to add a little delay before scroll
    setTimeout(()=>{
      this.content.scrollToBottom(200);
    })

  }
  

}
