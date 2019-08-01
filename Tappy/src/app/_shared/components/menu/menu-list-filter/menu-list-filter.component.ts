import { Component, OnInit, Input } from '@angular/core';
import { Button } from 'src/app/_shared/components/button/button.schema';
import { Utility } from 'src/app/_shared/util/utility';
import { WindowWidth } from 'src/app/_shared/_schemas/all.schema';
import { PlatformService } from 'src/app/_shared/services/platform.service';


export interface MenuFilter {
  default: any;
  buttons: Button[];
}


@Component({
  selector: 'app-menu-list-filter',
  templateUrl: './menu-list-filter.component.html',
  styleUrls: ['./menu-list-filter.component.scss'],
})
export class MenuListFilterComponent implements OnInit {

  @Input() set breakpoints(bps: number[]) {
    this.bps = bps;
    this.resize();
  }

  @Input() filter: MenuFilter = {
    default: 1,
    buttons: [ ]
  };


  private bps: number[] = [330, 350, 500];
  private screenWidthValue = null;
  public windowWidth = WindowWidth.LARGE;


  constructor(
    private platform: PlatformService
  ) {
    platform.getResizeSubject().subscribe(p => {
      this.screenWidthValue = p.screenWidth;
      this.resize();
    });

  }

  ngOnInit() {
    this.screenWidthValue = this.platform.platformState.screenWidth;
    this.resize();
    this.toggleFilter(this.filter.default);
  }



  toggleFilter(value: any) {
    this.filter.buttons.forEach((b, i) => {
      b.fill = (b.value === value) ? 'solid' : 'clear';
      b.color = (b.value === value) ? 'primary' : 'medium';
      if (b.value === value) {
        b.action();
      }
    });
  }

  resize() {
    if (Utility._canUse(this.screenWidthValue) && Utility._canUse(this.bps)) {
      this.windowWidth = this.getWidthCategory(this.screenWidthValue, this.bps);
    }
  }


  getWidthCategory(w: number, breakpoints: number[]): WindowWidth {
    let sizeMode = WindowWidth.SMALL;
    if (Utility._canUse(w) && Utility._canUse(breakpoints)) {
      breakpoints.forEach((bp, i) => {
        if (w > bp) {
          sizeMode = i as WindowWidth;
        }
      });
    }
    return sizeMode;
  }

}
