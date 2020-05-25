import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase/app';
import { Deneme } from "../../models/deneme";
import { AddFriendPage } from '../add-friend/add-friend';
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
  userid: any;
  items: Observable<any[]>;

  username: Observable<any[]>;
  names: any[];
  deneme = {} as Deneme;

  constructor(public db: AngularFireDatabase, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    this.userid=window.localStorage.getItem('userid');
    this.items = db.list(`friends/${this.userid}`, ref=> ref.orderByChild('timeStamp')).valueChanges();
    console.log(this.items);


    this.userid=window.localStorage.getItem('userid');
    console.log(this.userid);
    this.username = db.list(`users`).valueChanges();
    this.username.subscribe(elem=>{
      this.names=elem;
      console.log(elem);
      console.log(typeof(this.names))
      this.names = this.names.filter((item: Deneme) => {
        return (item.userid==this.userid);
      })
      window.localStorage.setItem('username', this.names[0].username);
      window.localStorage.setItem('userpic', this.names[0].pic);
      console.log(this.names[0].username)
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatsPage');
    this.afAuth.authState.subscribe(data => console.log(data));
  }

  openChat(item){
    console.log(item.username);
    this.navCtrl.push(ChatPage, {username: item.username, userid: item.userid});
  }

  addFriend(){
    this.navCtrl.push('AddFriendPage');
  }



}
