import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
/**
 * Generated class for the ChatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  items: Observable<any[]>;
  constructor(public db: AngularFireDatabase, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    this.items = db.list('friends').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatsPage');
    this.afAuth.authState.subscribe(data => console.log(data));
  }

  openChat(item){
    console.log("USER İSMİ: "+item.username);
    this.navCtrl.push(ChatPage, {username: item.username});
  }

}
