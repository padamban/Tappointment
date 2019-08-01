import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DatabaseService } from '../_shared/data/database.service';
import { ToastService } from '../_shared/services/toast.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
    private db: DatabaseService,
    private toast: ToastService
  ) { }

  ngOnInit() {
  }


  updateMenu() {

    const toastMsg = (msg: string) => {
      this.toast.presentToast({
        duration: 8000,
        message: msg,
        close: true,
        buttons: []
      }, 'update_firebase_menu');
    };

    const promises = [];
    this.db.getLocalMenuData().forEach( item => {
      promises.push(this.db.menuManager.uploadItem(item.id, item));
    });
    Promise.all(promises).then(
      ok => {
        toastMsg('Menu uploaded to firebase.');
      },
      nah => {
        toastMsg('Failed to upload menu to firebase.');
      },
    );
  }

}
