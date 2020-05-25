import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { Camera, MediaType } from '@ionic-native/camera';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertController } from 'ionic-angular';
import { FunctionsProvider } from '../../providers/functions/functions';
import 'rxjs/Rx';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  public username: any;
  public userid: any;
  private dbRef= firebase.database().ref('users');
  private dbRef2= firebase.database().ref('friends');
  private dbRef3= firebase.database().ref('messages');
  user: any;
  imgsrc: string = null;
  userpic: any;
  imgUr: any;
  constructor(public functions: FunctionsProvider, private alertCtrl: AlertController,  public db: AngularFireDatabase, public navCtrl: NavController,  private camera: Camera, public actionSheetCtrl: ActionSheetController) {
    this.username=window.localStorage.getItem("username");
    this.userpic = window.localStorage.getItem("userpic");
    this.userid=window.localStorage.getItem('userid');
    this.user = firebase.auth().currentUser;
  }

  requests(){
    this.navCtrl.push('FriendRequestsPage');
  }

  account(){
    this.navCtrl.push('AccountPage');
  }

  invites(){
    this.navCtrl.push('InvitationsPage');
  }


  editPhoto()
  {

 
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Action',
      buttons: [
        {
          text: "Take a Photo",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA, this.camera.MediaType.PICTURE);
          }
        },
        {
          text: "Choose From Gallery",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY, this.camera.MediaType.PICTURE);
          }
        },
       {
         text: "Cancel",
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
      ]
    });
    actionSheet.present(); 
  }
  public updateMessagePhoto(imgUrl){
                  var dbref2=this.dbRef3;
                  var username=this.username;
                  var query = this.db.database.ref("messages").orderByKey();
                  query.once("value")
                    .then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                      var pkey = childSnapshot.key; 
                      var chval = childSnapshot.val();
                      console.log("CHVAL "+chval);
                      childSnapshot.forEach(function(ohSnap){
                        var ohSnapkey = childSnapshot.key;
                        ohSnap.forEach(function(getSnap){
                          if(getSnap.child("username").val()==username){
                            
                            dbref2.child(childSnapshot.key).child(ohSnap.key).child(getSnap.key).update({userpic: imgUrl});
                            
                          }
                        })

                  
                      })
            
                    });
                  });
  }

  public updateFriendPhoto(imgUrl){
              var dbref2=this.dbRef2;
              var userid=this.userid;
              var query = this.db.database.ref("friends").orderByKey();
              query.once("value")
                .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                  var pkey = childSnapshot.key; 
                  var chval = childSnapshot.val();
                  console.log("CHVAL "+chval);
                  childSnapshot.forEach(function(ohSnap){
                    var ohSnapkey = childSnapshot.key;
                    console.log("SECOND "+ childSnapshot.key)
                    console.log("THIRD "+ ohSnap.key)
                    if(ohSnap.child("userid").val()==userid){
                    
                    dbref2.child(childSnapshot.key).child(ohSnap.key).update({userpic: imgUrl});
                     }
              
                  })
        
                });
              });
  }


  public takePicture(sourceType, mediatype) {
     var options = {
      allowEdit:true,
      targetWidth:720,
      targetHeight:720,
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediatype: mediatype,
      sourceType: sourceType
    };

    this.camera.getPicture(options).then((imageData) => {
      this.imgsrc = 'data:image/jpeg;base64,' + imageData;
      this.dbRef.child(this.userid).update({pic: this.imgsrc});
      this.userpic = this.imgsrc;
      this.updateFriendPhoto(this.userpic)
      this.updateMessagePhoto(this.userpic);
      window.localStorage.setItem('userpic', this.userpic);
      //location.reload()
    }); 
  }
  presentAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [		{
        text: 'Yes',
        handler: () => {
          this.functions.deleteUser();
          this.user.delete().then(() => {
            console.log("User is deleted");
            window.localStorage.clear();
            this.navCtrl.push(LoginPage);
            
          }, (error)=>{
            console.log("Error: "+error);
          })
        }
      },
      {
        text: 'No',
        handler: () => {
          
        }
      }]
    });
    alert.present();
  }

  deleteAccount(){
    
    this.presentAlert("Are you sure?", "");
    
    
  }

  logout(){
    window.localStorage.clear();
    this.navCtrl.push(LoginPage);
  }
  resetPassword(){
    firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email);
    this.functions.presentToast("An email sent to your email to reset your password!");
  }
}
