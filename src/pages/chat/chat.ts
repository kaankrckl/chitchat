import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/Rx';
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
  username:any;
  subscription: any;
  messages: object[]=[];
  message: string='';
  items: Observable<any[]>;
  allCountries: any;
  countries: any[];
  labels:any;

  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
/*     if (window.localStorage.getItem("username") !== undefined || window.localStorage.getItem("username") !== null)
      {
        this.username = window.localStorage.getItem("username");
      }  */
    this.labels=this.db.list('/chat');

    this.items = db.list('chat').valueChanges();
    console.log(this.items);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  sendMessage(){
    this.db.list('/chat').push({
      username: "kaan",
      message: this.message
    })
  }

}
