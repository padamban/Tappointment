import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameSkinnyComponent } from './frame-skinny/frame-skinny.component';
import { FrameStandardComponent } from './frame-standard/frame-standard.component';

const components = [
  FrameSkinnyComponent,
  FrameStandardComponent
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FrameModule { }
