import { Component } from '@angular/core';

import { ChatsPage } from '../chats/chats';
import { ProfilePage } from '../profile/profile';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ChatsPage;
  tab2Root = ProfilePage;

  constructor( public NavParams: NavParams) {
  }
}
