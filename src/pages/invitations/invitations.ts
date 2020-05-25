import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase/app';
import { Http, Headers, RequestOptions } from '@angular/http';

/**
 * Generated class for the InvitationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invitations',
  templateUrl: 'invitations.html',
})
export class InvitationsPage {
  private dbRef= firebase.database().ref('invites');
  userid: any;
  items: Observable<any[]>;

  constructor(public http: Http, public db: AngularFireDatabase, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    this.userid=window.localStorage.getItem('userid');
    this.items = db.list(`invites/${this.userid}`).valueChanges();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitationsPage');
  }

}
