import { Component, OnInit } from '@angular/core';
import { ToolbarContent } from 'src/app/_shared/components/toolbar/toolbar.schema';
import { ModalController, NavParams } from '@ionic/angular';
import { FormFrame } from 'src/app/_shared/components/general-form/general-form.schema';
import { PropertyComponentType } from 'src/app/_shared/_schemas/all.schema';
import { Validators } from '@angular/forms';
import { CartService } from '../cart.service';
import { ProgressBarManager } from 'src/app/_shared/_schemas/progress-bar.schema';

@Component({
  selector: 'app-cart-submit',
  templateUrl: './cart-submit.component.html',
  styleUrls: ['./cart-submit.component.scss'],
})
export class CartSubmitComponent implements OnInit {


  public toolbar: ToolbarContent = {
    centered: true,
    title: {
      show: true,
      content: ['Rendelés']
    },
    logo: {
      content: [],
      show: false
    },
    buttons: [
      {
        slot: 'primary',
        color: 'dark',
        animate: false,
        buttons: [
          {
            icon: 'close',
            action: () => {
              this.modal.dismiss();
            }
          }
        ]
      },
    ]
  };



  orderForm: FormFrame;

  progress = new ProgressBarManager();

  public modal: ModalController;

  private emailTag = 'email';
  private nameTag = 'name';
  private phoneTag = 'phone';

  constructor(
    private navParams: NavParams,
    private cart: CartService
  ) {
    this.modal = navParams.get('modal');
    const email = navParams.get('email');

    this.orderForm = this.createForm(email);

  }



  ngOnInit() { }



  createForm(email = '', name = '', phone = '') {
    return {
      submit: {
        action: (e, onSuccess, onError) => {
          const init: number = 0.1;
          this.progress.setProgressContent({
            value: init,
            color: init == 1 ? 'success' : 'secondary',
            type: 'indeterminate',
            hidden: false
          });

          console.log("e: ", e);
          

          this.cart.submitCart(e[this.nameTag], e[this.emailTag], e[this.phoneTag]).then(
            ok => {
              this.progress.end(1000);
            },
            nah => {
              console.log('submitCart nah', nah);
              
              this.progress.setProgressContent({
                value: init,
                color: 'danger',
                type: 'indeterminate',
                reversed: true,
                hidden: false
              });
              this.progress.end(2000);

            }
          );
        },
        label: 'Mehet',
        successMsg: '',
        errorMsg: undefined,
        hide: false
      },
      resetOnSubmit: {
        reset: true,
        clear: []
      },
      inputs: [
        {
          id: this.nameTag,
          label: 'Név',
          type: 'text',
          component: PropertyComponentType.INPUT,
          messages: [
            { type: 'required', message: 'Kérem adja meg.' },
          ],
          validators: [name, [Validators.required]]
        },
        {
          id: this.phoneTag,
          label: 'Telefon',
          type: 'text',
          component: PropertyComponentType.INPUT,
          messages: [
            { type: 'required', message: 'Kérem adja meg.' },
          ],
          validators: [phone, [Validators.required]]
        },
        {
          id: this.emailTag,
          label: 'E-mail cím',
          type: 'email',
          component: PropertyComponentType.INPUT,
          messages: [
            { type: 'required', message: 'Kérem adja meg.' },
            { type: 'pattern', message: 'Sajnos a formátum nem felel meg.' }
          ],
          validators: [email, [Validators.required, Validators.email]]
        },
      ]
    };
  }

}
