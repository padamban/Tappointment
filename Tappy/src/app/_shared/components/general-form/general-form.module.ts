import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormHintComponent } from './form-hint/form-hint.component';
import { GeneralFormComponent } from './general-form/general-form.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MaterialFileInputModule } from 'ngx-material-file-input';

const components = [
  FormHintComponent,
  GeneralFormComponent
];

const material = [
  MatInputModule,
  MatSlideToggleModule,
  MatSliderModule,
  MatRadioModule,
  MatSelectModule,
  MatButtonModule,
  MaterialFileInputModule
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ...material
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GeneralFormModule { }
