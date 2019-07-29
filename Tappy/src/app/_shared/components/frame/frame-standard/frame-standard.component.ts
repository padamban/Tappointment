import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-frame-standard',
  templateUrl: './frame-standard.component.html',
  styleUrls: ['./frame-standard.component.scss'],
})
export class FrameStandardComponent implements OnInit {
  @Input() textCenter = true;
  constructor() { }

  ngOnInit() {}

}
