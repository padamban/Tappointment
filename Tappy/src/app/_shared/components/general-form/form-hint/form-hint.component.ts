import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-hint',
  templateUrl: './form-hint.component.html',
  styleUrls: ['./form-hint.component.scss'],
})
export class FormHintComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() inputID: any = null;
  @Input() messages: [] = [];
  @Input() danger = false;
  @Output() isOn = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() { }

}
