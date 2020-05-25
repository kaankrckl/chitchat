import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { ChatsPage } from '../pages/chats/chats';
import { AngularFireAuth } from '@angular/fire/auth';
import {App} from 'ionic-angular';
import { root } from 'rxjs/internal/util/root';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  useremail: any;
  userpass: any;
  username: any;

  constructor( public app: App, private afAuth: AngularFireAuth, private alertCtrl: AlertController, private push: Push, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
      if(window.localStorage.getItem("userid")!=null || window.localStorage.getItem("userid")!=undefined ){
        this.rootPage=TabsPage;
        this.username=window.localStorage.getItem("username");
      this.useremail=window.localStorage.getItem('useremail');
      console.log( this.useremail);
      this.userpass=window.localStorage.getItem('userpass');
      this.pushSetup(this.username);
/*       const result = this.afAuth.auth.signInWithEmailAndPassword(this.useremail, this.userpass).then(auth=>{
        this.app.getActiveNav().setRoot(TabsPage); 
        console.log(result);
      }).catch(error=>{
        this.presentAlert(error, '');
      }) */
    }
    else
      this.rootPage=LoginPage;

      statusBar.styleDefault();
      splashScreen.hide();
      console.log("READY")
    });
  }
 
  presentAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  pushSetup(name){
    
const options: PushOptions = {
  android: {
    senderID: 'enteryoursenderID'
  },
  ios: {
      alert: 'true',
      badge: true,
      sound: 'false'
  }
}


const pushObject: PushObject = this.push.init(options);


pushObject.on('notification').subscribe((notification: any) =>  console.log('Received a notification', notification));

//pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
pushObject.on('registration').subscribe((data:any) => {
  console.log("device registered -> ", data);
  let topic = "topics/";
  pushObject.subscribe(name).then((res:any) => {
      console.log("subscribed to topic: ", res);
     // this.presentAlert("subscribes to" , res)
  });
});
pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

} 

   
}
