import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ChatsPage } from '../pages/chats/chats';
import { ProfilePage } from '../pages/profile/profile';
import { ChatPage } from '../pages/chat/chat';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

var firebaseConfig = {
  apiKey: "AIzaSyDqXYqbCccF1N50jjqZF9R9z-jaVDqElzs",
  authDomain: "smalltalk-c0692.firebaseapp.com",
  databaseURL: "https://smalltalk-c0692.firebaseio.com",
  projectId: "smalltalk-c0692",
  storageBucket: "smalltalk-c0692.appspot.com",
  messagingSenderId: "587340249995",
  appId: "1:587340249995:web:74f1647dcf57ed58458d8e",
  measurementId: "G-7FFH8JFQ31"
};

@NgModule({
  declarations: [
    MyApp,
    ChatsPage,
    ProfilePage,
    TabsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatsPage,
    ProfilePage,
    TabsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
