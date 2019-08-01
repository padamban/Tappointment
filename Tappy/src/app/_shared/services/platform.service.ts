import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


export interface PlatformState {
  isReady: boolean;

  isMobile: boolean;
  isTablet: boolean;
  isPhablet: boolean;
  isDesktop: boolean;

  isPortrait: boolean;
  isLandscape: boolean;

  screenWidth: number;
  screenHeight: number;

  isDrawerTakesScreen: boolean;
  isDrinkFilterScrollable: boolean;

}

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  private state: PlatformState = {
    isReady: false,
    isDesktop: false, isMobile: false, isPhablet: false, isTablet: false,
    isLandscape: false, isPortrait: false,
    screenHeight: 0, screenWidth: 0,
    isDrawerTakesScreen: false,
    isDrinkFilterScrollable: false
  };

  get platformState() {
    return this.state;
  }


  private resizeSubject = new Subject<PlatformState>();
  getResizeSubject(): Subject<PlatformState> {
    return this.resizeSubject;
  }

  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      this.state.isReady = true;
      this.onResize();
    });
    this.platform.resize.pipe(
      debounceTime(100)
    ).subscribe(() => {
      this.onResize();
    }, err => console.error('BTK-$-onResize', err));
  }

  onResize() {
    if (this.check()) {
      this.resizeSubject.next(this.state);
    }
  }

  check(): boolean {
    if (this.state.isReady) {
      this.state.isMobile = this.platform.is('mobile');
      this.state.isTablet = this.platform.is('tablet');
      this.state.isPhablet = this.platform.is('phablet');
      this.state.isDesktop = this.platform.is('desktop');
      this.state.isLandscape = this.platform.isLandscape();
      this.state.isPortrait = this.platform.isPortrait();
      this.state.screenHeight = this.platform.height();
      this.state.screenWidth = this.platform.width();
      this.state.isDrawerTakesScreen = this.state.screenWidth < 500;
      this.state.isDrinkFilterScrollable = this.state.screenWidth < 450;
    }
    return this.state.isReady;
  }

}
