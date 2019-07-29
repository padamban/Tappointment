import { Component, RendererFactory2 } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AccessZone } from './_shared/_schemas/all.schema';
import { DrawerContent } from './_shared/_schemas/drawer.schema';
import { Router } from '@angular/router';
import { PM } from './_shared/variables/routes';
import { ToolbarContent } from './_shared/components/toolbar/toolbar.schema';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {


  toolbar: ToolbarContent = {
    centered: true,
    title: {
      show: true,
      content: ['Tappy']
    },
    logo: {
      content: [],
      show: false
    },
    buttons: [ ]
  };

  topDrawerContent: DrawerContent = {
    size: 'small',
    buttons: [
      {
        show: true,
        zone: AccessZone.All,
        line: 'none',
        button: {
          name: 'Menü',
          icon: 'pizza',
          action: () => {
            this.onMenu();
          }
        }
      },
      {
        show: true,
        zone: AccessZone.Private,
        line: 'none',
        button: {
          name: 'Kosár',
          icon: 'cart',
          action: () => {
            this.onCart();
          }
        }
      },
    ]
  };

  bottomDrawerContent: DrawerContent = {
    size: 'small',
    buttons: [
      {
        show: true,
        zone: AccessZone.Private,
        line: 'none',
        button: {
          name: 'Adataim',
          icon: 'person',
          action: () => {
            this.onAccount();
          }
        }
      },
      {
        show: true,
        zone: AccessZone.Private,
        line: 'none',
        button: {
          name: 'Kijelentkezés',
          icon: 'log-out',
          action: () => {
            this.onLogout();
          }
        }
      },
      {
        show: true,
        zone: AccessZone.Public,
        line: 'none',
        button: {
          name: 'Bejelentkezés',
          icon: 'log-in',
          action: () => {
            this.onAuth();
          }
        }
      },
    ]
  };


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private rendererFactory: RendererFactory2,
    public auth: AuthService
  ) {
    this.initializeApp();
    const renderer = rendererFactory.createRenderer(null, null);
    renderer.addClass(document.body, 'tappy-theme');

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onAuth() {
    this.router.navigateByUrl(PM.nav(PM.R.AUTH));
  }

  onLogout() {
    this.auth.doLogout();
  }

  onMenu() {
    this.router.navigateByUrl(PM.nav(PM.R.MENU));
  }

  onCart() {
    this.router.navigateByUrl(PM.nav(PM.R.CART));
  }

  onAccount() {
    this.router.navigateByUrl(PM.nav(PM.R.ACCOUNT));
  }
}
