import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastService } from '../_shared/services/toast.service';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { Utility } from '../_shared/util/utility';
import { Subject } from 'rxjs';
import { PM } from '../_shared/variables/routes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserAuth: boolean;
  private onUserIsAuthenticated: Subject<boolean>;


  get isUserAuthenticated() {
    return this.isUserAuth;
  }

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toast: ToastService,
    private alertController: AlertController

  ) {
    this.onUserIsAuthenticated = new Subject<boolean>();

  }




  async onResendVerificationEmailAlert(email: string) {
    const alert = await this.alertController.create({
      header: 'Verify',
      message: `This account is not verified yet. Resend verification email to <strong>${email}</strong>?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'btk-alert-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Resend',
          cssClass: 'btk-alert-button-highlight',
          handler: () => {
            console.log('Confirm Okay', email, this.afAuth.auth.currentUser);
            this.afAuth.auth.currentUser.sendEmailVerification().then(
              ok => {
                this.toast.presentToast({
                  duration: 8000,
                  message: `Verification email to <strong>${email}</strong>.`,
                  close: true,
                  buttons: []
                }, 'verification_resend');
              },
              nah => {
                this.toast.presentToast({
                  duration: 8000,
                  message: `Failed to resend verification email.`,
                  close: true,
                  buttons: []
                }, 'verification_resend_fail');
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  onLogout() {
    this.isUserAuth = false;
    this.onUserIsAuthenticated.next(this.isUserAuth);
    this.router.navigateByUrl(PM.nav(PM.A.AFTER_LOGOUT));
  }

  doDeleteMyself() {
    return Promise.all([
      // this.db.userManager.deleteItem(this.currentUser.db.id),
      firebase.auth().currentUser.delete()
    ]).finally(() => this.onLogout());
  }

  doEmailLogin(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => resolve(res), err => reject(err));
    });
  }

  doRegister(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => resolve(res), err => reject(err));
    });
  }

  doSendPasswordResetEmail(email: string) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(res => resolve(res), err => reject(err));
    });
  }


  onLogin(newData) {

    const loginPromise = new Promise((resolve, reject) => {


      if (Utility._canUse(newData)) {
        if (Utility._canUse(newData.user)) {
          if (newData.user.emailVerified) {
            this.isUserAuth = true;
            this.onUserIsAuthenticated.next(this.isUserAuth);
            resolve('Verified');
          } else {
            // this.onLogout();
            reject(newData.user.email);
          }

        }
      }

    });

    return loginPromise;


  }

}
