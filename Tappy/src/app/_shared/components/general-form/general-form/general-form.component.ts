import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { first, repeat, map } from 'rxjs/operators';
import { Subscription, Observable, fromEvent } from 'rxjs';
import { FormFrame, FormChangeEventData, FormInput, FormState } from '../general-form.schema';
import { Utility } from 'src/app/_shared/util/utility';
import { PropertyComponentType } from 'src/app/_shared/_schemas/all.schema';

@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styleUrls: ['./general-form.component.scss'],
})
export class GeneralFormComponent implements OnInit {

  // @ViewChild('imageInput') private imageInput: FileInputComponent;

  @Output() dataChange = new EventEmitter<FormChangeEventData>();

  @Input() disableSubmit = false;

  @Input() set messageState(clear: boolean) {
    if (clear) {
      this.errorMessage = '';
      this.successMessage = '';
    }
  }

  @Input() formFrame: FormFrame = {
    submit: {
      hide: false,
      action: (e) => { },
      label: 'Submit',
      successMsg: '',
      errorMsg: undefined
    },
    resetOnSubmit: {
      reset: true,
      clear: []
    },
    inputs: [
      // {
      //   id: 'label1',
      //   label: 'Just a label',
      //   type: '',
      //   component: FormComponentType.JUSTLABEL,
      //   messages: [],
      //   validators: ['']
      // },
      // {
      //   repeat: 0,
      //   id: 'texttest2',
      //   label: 'Text test',
      //   placeholder: 'testEn',
      //   type: 'text',
      //   required: true,
      //   hint: 'Hintsy hint',
      //   component: FormComponentType.INPUT,
      //   messages: [
      //     { type: 'required', message: 'Text is required.' },
      //   ],
      //   validators: ['', [Validators.required]]
      // },
      // {
      //   repeat: 0,
      //   id: 'picture1',
      //   placeholder: 'Picture',
      //   type: 'file',
      //   required: true,
      //   hint: 'Hintsy hint',
      //   component: FormComponentType.IMAGE,
      //   messages: [
      //     { type: 'required', message: 'Image is required.' },
      //     { type: 'maxContentSize', message: 'Image can have max 1 MB.' }
      //   ],
      //   validators: ['', [Validators.required, FileValidator.maxContentSize(1024 * 1024)]]
      // },
      // {
      //   responsiveRepeat: true,
      //   repeat: 0,
      //   id: 'price-amount',
      //   id2: 'price-unit',
      //   label: 'Unit',
      //   placeholder: 'Price',
      //   type: 'number',
      //   required: true,
      //   hint: 'Hintsy hint 1',
      //   hint2: 'Hintsy hint 2',
      //   component: FormComponentType.MONEYUNIT,
      //   messages: [
      //     { type: 'required', message: 'Set a price.' },
      //     { type: 'min', message: 'Invalid!' },

      //   ],
      //   validators: [0, [
      //     Validators.required,
      //     Validators.min(0)
      //   ]],
      //   messages2: [
      //     { type: 'required', message: 'Select one.' },
      //   ],
      //   validators2: ['', [Validators.required]],
      //   select: {
      //     options: [
      //       {
      //         value: 1,
      //         label: 'First'
      //       },
      //       {
      //         value: 2,
      //         label: 'second'
      //       }
      //     ]
      //   }
      // },

      // {
      //   id: 'emailtest',
      //   label: 'Email test',
      //   type: 'email',
      //   required: true,
      //   component: FormComponentType.INPUT,
      //   messages: [
      //     { type: 'required', message: 'Email is required.' },
      //     { type: 'pattern', message: 'Please enter a valid email.' }
      //   ],
      //   validators: ['', [Validators.required, Validators.email]]
      // },
      // {
      //   id: 'pwtest',
      //   label: 'PW test',
      //   type: 'password',
      //   component: FormComponentType.INPUT,
      //   messages: [
      //     { type: 'required', message: 'Password is required.' },
      //     { type: 'minlength', message: 'Password must be at least 6 characters long.' }
      //   ],
      //   validators: ['', [Validators.required, Validators.minLength(6)]]
      // },
      // {
      //   id: 'label2',
      //   label: 'Just a label',
      //   type: '',
      //   component: FormComponentType.JUSTLABEL,
      //   messages: [],
      //   validators: ['']
      // },
      // {
      //   responsiveRepeat: true,
      //   repeat: 1,
      //   id: 'tetogle',
      //   label: 'Toggle test 1',
      //   type: '',
      //   hint: 'Heklekr kerk',
      //   component: FormComponentType.TOGGLE,
      //   messages: [
      //     { type: 'required', message: 'True is required.' },
      //   ],
      //   validators: [false, [Validators.requiredTrue]],
      //   preFill: true
      // },
      // {
      //   id: 'tetogle2',
      //   label: 'Toggle test 2',
      //   type: '',
      //   component: FormComponentType.TOGGLE,
      //   messages: [
      //     { type: 'required', message: 'True is required.' },
      //   ],
      //   validators: [false],
      //   preFill: true
      // },
      // {
      //   id: 'tetogle2',
      //   label: 'Toggle test 2',
      //   type: '',
      //   component: FormComponentType.TOGGLE,
      //   messages: [
      //     { type: 'required', message: 'True is required.' },
      //   ],
      //   validators: ['', [Validators.requiredTrue]],
      //   preFill: true
      // },
      // {
      //   id: 'slider 1',
      //   label: 'slider test 1',
      //   type: '',
      //   component: FormComponentType.SLIDER,
      //   messages: [
      //     // { type: 'required', message: 'True is required.' },
      //   ],
      //   validators: ['', [
      //     // Validators.requiredTrue
      //   ]],
      //   slider: {
      //     max: 50,
      //     min: 10,
      //     step: 5,
      //     value: 20,
      //     thumbLabel: true
      //   }
      // },
      // {
      //   id: 'slider 2',
      //   label: 'slider test 2',
      //   type: '',
      //   component: FormComponentType.SLIDER,
      //   messages: [
      //     { type: 'min', message: 'Minimum 15.' },
      //   ],
      //   validators: ['', [
      //     Validators.min(15)
      //   ]],
      //   slider: {
      //     max: 50,
      //     min: 10,
      //     step: 5,
      //     value: 20,
      //     thumbLabel: true
      //   }
      // },
      // {
      //   id: 'radio23',
      //   label: 'Radio test ',
      //   type: '',
      //   component: FormComponentType.RADIO,
      //   messages: [
      //     // { type: 'required', message: 'True is required.' },
      //   ],
      //   validators: ['', [
      //     // Validators.requiredTrue
      //   ]],
      //   radio: {
      //     selected: 2,
      //     vertical: true,
      //     buttons: [
      //       {
      //         value: 1,
      //         label: 'opt1',
      //       },
      //       {
      //         value: 2,
      //         label: 'opt2',
      //       },
      //       {
      //         value: 3,
      //         label: 'optdfd3',
      //       },
      //       {
      //         value: 4,
      //         label: 'opdsdt4',
      //       },
      //       {
      //         value: 5,
      //         label: 'opt4',
      //       }
      //     ]
      //   }
      // },
      // {
      //   id: 'radio232',
      //   label: 'Radio test 2 ',
      //   type: '',
      //   component: FormComponentType.RADIO,
      //   messages: [
      //     // { type: 'required', message: 'Option is required.' },
      //   ],
      //   validators: ['', [
      //     // Validators.requiredTrue
      //   ]],
      //   radio: {
      //     selected: 2,
      //     vertical: false,
      //     buttons: [
      //       {
      //         value: 1,
      //         label: 'opt1',
      //       },
      //       {
      //         value: 2,
      //         label: 'opt2',
      //       },
      //       {
      //         value: 3,
      //         label: 'opt2',
      //       },
      //     ]
      //   }
      // },
      // {
      //   id: 'select-one',
      //   label: 'Select One test',
      //   component: FormComponentType.SELECTONE,
      //   messages: [
      //     { type: 'required', message: 'Reiuired' },
      //   ],
      //   validators: ['', [
      //     Validators.required
      //   ]],
      //   select: {
      //     options: [
      //       {
      //         value: 1,
      //         label: 'First'
      //       },
      //       {
      //         value: 2,
      //         label: 'second'
      //       }
      //     ]
      //   }
      // },
      // {
      //   id: 'select-more',
      //   label: 'Select More test',
      //   placeholder: 'Multi option',
      //   component: FormComponentType.SELECTMULTIPLE,
      //   messages: [
      //     { type: 'required', message: 'Reiuired' },
      //   ],
      //   validators: ['', [
      //     Validators.required
      //   ]],
      //   select: {
      //     options: [
      //       {
      //         value: 1,
      //         label: 'First'
      //       },
      //       {
      //         value: 2,
      //         label: 'second'
      //       },
      //       {
      //         value: 3,
      //         label: '233323'
      //       },
      //       {
      //         value: 4,
      //         label: '4444444'
      //       }
      //     ]
      //   }
      // },
    ]
  };


  public errorMessage = '';
  public successMessage = '';

  public form: FormGroup;
  public formMessages = {};
  public formValidators = {};

  private lastFormValues: any = {};
  private diffFormValues: any = {};

  private lastState: any;
  public imgSrc: object = {};

  public onFormIsBuilt = new EventEmitter<boolean>();

  private subscritions: Subscription[] = [];


  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.extractFormFrameData();
    this.form = this.formBuilder.group(this.formValidators);
    this.subscribe();
    this.triggerFormExistCheck();
  }



  triggerFormExistCheck() {
    setTimeout(() => {
      this.onFormIsBuilt.emit(Utility._canUse(this.form));
    }, 0);
  }

  compareWithForSelect(a, b) {
    return a.value === b.value;
  }

  extractFormFrameData() {
    this.formMessages = {};
    this.formValidators = {};

    this.formFrame.inputs
      .filter(input => input.component != PropertyComponentType.JUST_LABEL)
      .forEach(input => {

        input.repeat = Utility._canUse(input.repeat) && input.repeat > 0 ? input.repeat : 1;
        const tempRep = [];
        for (let i = 1; i <= input.repeat; i++) {
          tempRep.push(i == 1 ? '' : '-' + i);
        }
        input.repeat = tempRep;
        input.repeat.forEach(repID => {
          if (input.component == PropertyComponentType.MONEY_UNIT) {
            const unitKey = input.id2 + repID;
            this.formMessages[unitKey] = input.messages2;
            this.formValidators[unitKey] = input.validators2;
          }
          const key = input.id + repID;
          this.formMessages[key] = input.messages;
          this.formValidators[key] = input.validators;
        });
      });
  }


  clearImage(id: string) {
    // if (Utility._canUse(this.imageInput)) {
    //   this.imageInput.clear();
    // }
    // if (Utility._canUse(this.imgSrc)) {
    //   this.imgSrc[id] = null;
    // }
  }

  processFormValues(vals) {
    const values = [...vals];
    Object.entries(values).forEach(v => {
      const input = this.formFrame.inputs.find(inp => inp.id == v[0]);
      if (Utility._canUse(input)) {
        if (values[v[0]] == '') {
          if (input.component == PropertyComponentType.JUST_LABEL) {
            delete values[v[0]];
          }
        }
      }
    });
    return values;
  }

  onSubmit() {

    const values = this.form.value;

    // values = this.processFormValues(values);
    const onSuccess = (v) => {
      this.successMessage = this.formFrame.submit.successMsg;
      this.errorMessage = '';
    };

    const onError = (v) => {
      this.successMessage = '';
      this.errorMessage = v.message;
    };

    this.formFrame.submit.action(values, onSuccess, onError);

    if (this.formFrame.resetOnSubmit.reset) {
      this.errorMessage = '';
      this.form.reset();
      this.form.markAsPristine();
      this.form.markAsUntouched();
      this.form.updateValueAndValidity();
      Object.entries(this.form.controls).forEach(control => {
        const input = this.form.get(control[0]);
        input.reset();
        input.markAsPristine({ onlySelf: true });
        input.markAsUntouched({ onlySelf: true });
        input.disable();
        input.enable();
      });
    }


  }


  assignInputFields(newValues: object) {
    if (Utility._canUse(this.form)) {
      const valuesInForm = this.form.value;
      Utility._assignOnlyExisting(valuesInForm, newValues);
      this.form.setValue(valuesInForm);
    }
  }


  defaultInputById(value: any, inputId: string) {
    const input = this.formFrame.inputs.find(inp => inp.id == inputId);
    input.default = value;
  }

  defaultToggleInputById(value: any, inputId: string) {
    const input = this.formFrame.inputs.find(inp => inp.id == inputId);
    input.default = value;
    if (Utility._canUse(input.validators) && Utility._canUse(input.validators[0])) {
      input.validators[0] = value;
    }
  }


  responsiveRepeatById(repetition: number, inputId: string) {
    const input = this.formFrame.inputs.find(inp => inp.id == inputId);
    const reps = typeof input.repeat == 'number' ? input.repeat : (input.repeat as string[]).length;
    const diff = repetition - reps;
    if (!isNaN(diff) && diff != 0) {
      this.responsiveRepeat(diff, input);
    }
  }

  responsiveRepeat(diff: number, input: FormInput) {
    if (!Utility._canUse(input.repeat)) {
      input.repeat = 1;
    }
    const length = (input.repeat as string[]).length;
    input.repeat = (0 < length + diff) ? length + diff : 1;
    this.extractFormFrameData();

    const oldVals = this.form.value;
    this.form = this.formBuilder.group(this.formValidators);
    const newVals = this.form.value;

    Object.entries(newVals).forEach(entry => {
      if (Utility._canUse(oldVals[entry[0]])) {
        newVals[entry[0]] = oldVals[entry[0]];
      }
    });

    this.unsubscribe();
    this.form.reset(newVals);
    this.subscribe();
    this.form.setValue(this.form.value);
  }


  subscribeTrigger() {
  }

  isArray(v: any) {
    return Array.isArray(v);
  }

  hinter(e) {

  }

  unsubscribe() {
    this.subscritions.forEach(s => {
      s.unsubscribe();
    });
  }

  subscribe() {
    this.subscritions.push(this.form.valueChanges.subscribe(vals => {
      const diffValues = {};
      Object.entries(vals).forEach(val => {
        if (this.lastFormValues[val[0]] != val[1]) {
          diffValues[val[0]] = val[1];
        }
      });
      this.lastFormValues = vals;
      this.diffFormValues = diffValues;
    }, err => console.error('tappy-$-form.valueChanges', err)));

    this.subscritions.push(this.form.statusChanges.subscribe(val => {
      this.lastState = val;
      this.dataChange.emit({
        formId: this.formFrame.id,
        state: val == 'VALID' ? FormState.VALID : FormState.INVALID,
        data: this.lastFormValues,
        changed: this.diffFormValues
      });
    }, err => console.error('tappy-$-form.statusChanges', err)));
  }

  onFileChange(form: FormGroup, tag: string) {
    this.imgSrc[tag] = null;
    if (Utility._canUse(form[tag])) {
      Utility.readFile(form[tag].files[0] as File).subscribe(res => {
        this.imgSrc[tag] = res;
      }, err => console.error('tappy-$-onFileChange.readFile', err));
    }
  }



}
