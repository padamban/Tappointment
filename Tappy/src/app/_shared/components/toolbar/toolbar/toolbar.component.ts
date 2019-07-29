import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToolbarContent } from '../toolbar.schema';
import { Subject, Subscription } from 'rxjs';
import { Utility } from 'src/app/_shared/util/utility';
import { ProgressBarManager } from 'src/app/_shared/_schemas/progress-bar.schema';
import { AccessZone } from 'src/app/_shared/_schemas/all.schema';




@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {

  @Input() set toolbar(t: ToolbarContent) {
    this.t = {};
    Object.assign(this.t, t);
  }

  get toolbar() {
    return this.t;
  }



  private t: ToolbarContent;

  public PB = new ProgressBarManager();

  @Input() set progressBar(PB: ProgressBarManager) {
    this.PB = PB;
  }


  private onThemeChanged$: Subscription;



  constructor(
    private nav: NavController,
  ) {


  }


  ngOnInit() {

    this.toolbar = this.toolbar ? this.toolbar : {
      centered: true,
      title: {
        show: true,
        content: ['Tappy']
      },
      logo: {
        content: [],
        show: false
      },
      buttons: [
        {
          slot: 'start',
          isMenu: true,
          color: 'dark',
          animate: false,
        },
      ]
    };

  }

  ngOnDestroy() {
    if (this.onThemeChanged$) {
      this.onThemeChanged$.unsubscribe();
    }
  }



  public updateAuthVisibility(isAuth: boolean) {
    Promise.resolve(null).then(() =>
      this.toolbar.buttons.forEach(btnSet => {
        if (!btnSet.isMenu) {
          btnSet.buttons.forEach(b => {
            if (b.zone === AccessZone.Private) {
              b.show = isAuth;
            } else if (b.zone === AccessZone.Public) {
              b.show = !isAuth;
            } else if (b.zone === AccessZone.All) {
              b.show = true;
            }
          });
        }
      })
    );
  }

}
