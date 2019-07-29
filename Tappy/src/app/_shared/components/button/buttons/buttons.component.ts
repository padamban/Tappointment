import { Component, OnInit, Input } from '@angular/core';
import { Button } from '../button.schema';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent implements OnInit {

  @Input() buttons: Button[] = [];
  @Input() disabled = false;

  constructor() { }

  ngOnInit() { }

}
