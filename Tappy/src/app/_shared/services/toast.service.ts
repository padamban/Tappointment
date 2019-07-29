import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastButton } from '@ionic/core';
import { Utility } from '../util/utility';


export interface ToastContent {
  message: string;
  duration?: number;
  buttons?: ToastButton[];
  close?: boolean;
}



@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private currentId: string;
  private currentToast: HTMLIonToastElement;

  constructor(
    private toastController: ToastController,
  ) { }

  async presentToast(data: ToastContent, id: string = null) {

    let canToast = false;



    if (id === null) {
      canToast = true;
      this.currentId = null;
    } else if (this.currentId === id) {
      canToast = false;
    } else if (this.currentId !== id) {
      canToast = true;
      this.currentId = id;
      if (Utility._canUse(this.currentToast)) {
        this.currentToast.dismiss();
      }
    }

    const setId = (i: string) => {
      if (i === this.currentId) {
        this.currentId = null;
      }
    };


    if (canToast) {

      const b = [];
      const toast: HTMLIonToastElement = await this.toastController.create({
        message: data.message,
        duration: data.duration ? data.duration : 3000,
      });
      this.currentToast = toast;

      if (data.buttons) {
        b.push(...data.buttons);
      }

      if (data.close) {
        b.push({
          text: '',
          icon: 'close',
          role: 'cancel',
          handler: () => { }
        });
      }
      toast.buttons = b;
      toast.onDidDismiss().then(
        ok => {
          setId(id);

        },
        nah => {
          setId(id);
        }
      );

      toast.present();
    }

  }

}
