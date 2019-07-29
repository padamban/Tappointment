import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ToolbarContent } from '../_shared/components/toolbar/toolbar.schema';
import { PropertyComponentType } from '../_shared/_schemas/all.schema';
import { Validators } from '@angular/forms';
import { FormFrame } from '../_shared/components/general-form/general-form.schema';
import { IonSlides } from '@ionic/angular';
import { Utility } from '../_shared/util/utility';
import { AuthService } from './auth.service';
import { Button } from '../_shared/components/button/button.schema';
import { Router } from '@angular/router';
import { PM } from '../_shared/variables/routes';
import { environment } from 'src/environments/environment';



interface SlideContent {
  title: string;
  subtitle: string;
  form: FormFrame;
  loading?: boolean;
  color?: string;
  clear?: boolean;
  buttons?: Button[];
}

enum LoginMode {
  EMAIL
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit, AfterViewInit {

  @ViewChild('slides', { static: true }) slides: IonSlides;


  toolbar: ToolbarContent = {
    centered: true,
    title: {
      content: ['Tappy'],
      show: true
    },
    logo: {},
    buttons: [
      {
        slot: 'start',
        isMenu: true,
        color: 'dark'
      }
    ]
  };

  slideOptions = {
    initialSlide: 0,
    speed: 400,
    autoHeight: true
  };

  private emailTag = 'emailReg';
  private passwordTag = 'passwordReg';


  loginForm: FormFrame = {
    submit: {
      action: (e, onSuccess, onError) => { this.tryLoginUser(LoginMode.EMAIL, e, onSuccess, onError); },
      label: 'Mehet',
      successMsg: '',
      errorMsg: undefined
    },
    resetOnSubmit: {
      reset: false,
      clear: []
    },
    inputs: [
      {
        id: this.emailTag,
        label: 'E-mail cím',
        type: 'email',
        component: PropertyComponentType.INPUT,
        autocomplete: true,
        messages: [
          { type: 'required', message: 'Kérem adja meg.' },
          { type: 'pattern', message: 'Sajnos a formátum nem felel meg.' }
        ],
        validators: ['', [Validators.required, Validators.email]]
      },
      {
        id: this.passwordTag,
        label: 'Jelszó',
        type: 'password',
        autocomplete: true,
        component: PropertyComponentType.INPUT,
        messages: [
          { type: 'required', message: 'Kérem adja meg.' },
          { type: 'minlength', message: 'Minimum 6 karakter.' }

        ],
        validators: ['', [Validators.required, Validators.minLength(6)]],
      },
    ]
  };

  registerForm: FormFrame = {
    submit: {
      action: (e, onSuccess, onError) => { this.tryRegisterUser(e, onSuccess, onError); },
      label: 'Mehet',
      successMsg: 'Sikeres regisztráció! Kapni fog egy emailt ahol validálhatja az e-mail címét.',
      errorMsg: undefined
    },
    resetOnSubmit: {
      reset: false,
      clear: []
    },
    inputs: [
      {
        id: this.emailTag,
        label: 'E-mail cím',
        type: 'email',
        component: PropertyComponentType.INPUT,
        messages: [
          { type: 'required', message: 'Kérem adja meg.' },
          { type: 'pattern', message: 'Sajnos a formátum nem felel meg.' }
        ],
        validators: ['', [Validators.required, Validators.email]]
      },
      {
        id: this.passwordTag,
        label: 'Jelszó',
        type: 'password',
        component: PropertyComponentType.INPUT,
        messages: [
          { type: 'required', message: 'Kérem adja meg.' },
          { type: 'minlength', message: 'Minimum 6 karakter.' }
        ],
        validators: ['', Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])],
      },
      {
        id: 'personelCode',
        label: 'Hozzáférési kód',
        type: 'password',
        component: PropertyComponentType.INPUT,
        hint: 'A repo README fájljában található.',
        messages: [
          { type: 'required', message: '<<Projekt>> → README.md → AccessCode' },
          { type: 'pattern', message: 'Rossz kód.' }
        ],
        validators: [environment.regAccessKeyPrefil, Validators.compose([
          Validators.required,
          Validators.pattern(environment.regAccessKey)
        ])],
      },
    ]
  };


  recoveryFrame: FormFrame = {
    submit: {
      action: (e, onSuccess, onError) => { this.tryResetPassword(e, onSuccess, onError); },
      label: 'E-mail kiküldése',
      successMsg: 'Az e-mail el lett küldve aminek segítségével készíthet egy új jelszót.',
      errorMsg: undefined
    },
    resetOnSubmit: {
      reset: true,
      clear: [this.emailTag]
    },
    inputs: [
      {
        id: this.emailTag,
        label: 'Kérjen egy új jelszót az email címére',
        type: 'email',
        component: PropertyComponentType.INPUT,
        messages: [
          { type: 'required', message: 'Kérem adja meg.' },
          { type: 'pattern', message: 'Sajnos a formátum nem felel meg.' }
        ],
        validators: ['', [Validators.required, Validators.email]]
      },
    ]
  };

  cards: SlideContent[] = [
    {
      title: 'Bejelentkezés',
      subtitle: '',
      form: this.loginForm,
      buttons: [
        {
          darkmodeSensitive: true,
          name: 'Regisztráció',
          fill: 'clear',
          action: () => {
            this.goSignUp();
          }
        },
        {
          darkmodeSensitive: true,
          name: 'Elfelejtett jelszó',
          fill: 'clear',
          action: () => {
            this.goPasswordRecovery();
          }
        }
      ]
    },
    {
      title: 'Regisztráció',
      subtitle: '',
      form: this.registerForm,
      buttons: [
        {
          darkmodeSensitive: true,
          name: 'Bejelentkezés',
          fill: 'clear',
          action: () => {
            this.goLogIn();
          }
        },
        {
          darkmodeSensitive: true,
          name: 'Elfelejtett jelszó',
          fill: 'clear',
          action: () => {
            this.goPasswordRecovery();
          }
        }
      ]
    },
    {
      title: 'Elfelejtette a jelszavát?',
      subtitle: '',
      form: this.recoveryFrame,
      buttons: [
        {
          darkmodeSensitive: true,
          name: 'Bejelentkezés',
          fill: 'clear',
          action: () => {
            this.goLogIn();
          }
        },
        {
          darkmodeSensitive: true,
          name: 'Regisztráció',
          fill: 'clear',
          action: () => {
            this.goSignUp();
          }
        }
      ]
    },
  ];

  slideIdx: number;




  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.goLogIn();
    this.slides.ionSlideTransitionEnd.subscribe(e => {
      this.slides.getActiveIndex().then(id => {
        this.slideIdx = id;
      });
    });
  }


  ionViewWillEnter() {
    this.goLogIn();
    this.slides.lockSwipes(true);
    this.cards.forEach((card, i) => {
      this.submitProgress(i, false, 'primary', true);
    });
  }

  goSlide(idx: number) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(idx).then(() => this.slideIdx = idx);
    this.slides.lockSwipes(true);
  }

  goLogIn() {
    this.goSlide(0);
  }
  goSignUp() {
    this.goSlide(1);
  }
  goPasswordRecovery() {
    this.goSlide(2);
  }




  tryLoginUser(mode: LoginMode, value, onSuccess: (v) => void, onError: (v) => void) {
    this.submitProgress(0, true);

    const onLogin = async (ok) => {
      this.auth.onLogin(ok).then(
        passed => {
          this.delayedProgressReset(0, 'success', true);
        },
        failed => {
          this.submitProgress(0, true);

          this.delayedProgressReset(0, 'danger', false, [0, 5000]);
          this.auth.onResendVerificationEmailAlert(failed);
        }
      );
      this.router.navigateByUrl(PM.nav(PM.A.AFTER_LOGIN));
    };

    let login = null;

    switch (mode) {
      case LoginMode.EMAIL:
        login = this.auth.doEmailLogin(value[this.emailTag], value[this.passwordTag]);
        break;
    }

    login.then(
      ok => {
        // this.delayedProgressReset(0, 'success', true);
        onLogin(ok);

        // onSuccess(null);
      },
      err => {
        this.delayedProgressReset(0, 'danger', false);
        err.message = 'Hiba! Kérem próbálja újra.';
        onError(err);
      }
    );


  }





  tryRegisterUser(value, onSuccess: (v) => void, onError: (v) => void) {
    this.submitProgress(1, true);

    this.auth.doRegister(value[this.emailTag], value[this.passwordTag])
      .then(
        res => {
          this.delayedProgressReset(1, 'success', false);
          onSuccess(null);
        },
        err => {
          this.delayedProgressReset(1, 'danger', false);
          err.message = 'Hiba! Kérem próbálja újra.';
          onError(err);
        }
      );
  }

  tryResetPassword(value, onSuccess: (v) => void, onError: (v) => void) {
    this.submitProgress(2, true);

    this.auth.doSendPasswordResetEmail(value[this.emailTag])
      .then(
        () => {
          this.delayedProgressReset(2, 'success', false);
          onSuccess(null);
        },
        err => {
          this.delayedProgressReset(2, 'danger', false);
          err.message = 'Hiba! Kérem próbálja újra.';
          onError(err);
        }
      );
  }




  submitProgress(cardIdx: number, isLoading: boolean, color: 'primary' | 'danger' | 'success' = 'primary', clear = false) {
    if (Utility._canUse(this.cards[cardIdx])) {
      const card = this.cards[cardIdx];
      card.loading = isLoading;
      card.color = color;
      card.clear = clear;
    }
  }

  delayedProgressReset(cardIdx: number, color: 'primary' | 'danger' | 'success' = 'primary', clear = true, delay = [0, 3000]) {
    setTimeout(() => {
      this.submitProgress(cardIdx, true, color);
      setTimeout(() => {
        this.submitProgress(cardIdx, false, 'primary', clear);
      }, delay[1]);
    }, delay[0]);
  }
}
