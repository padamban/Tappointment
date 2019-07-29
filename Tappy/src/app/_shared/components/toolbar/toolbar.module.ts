import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FrameModule } from '../frame/frame.module';

const components = [
  ToolbarComponent
];

const external = [
  FrameModule,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    ...external
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ToolbarModule { }
