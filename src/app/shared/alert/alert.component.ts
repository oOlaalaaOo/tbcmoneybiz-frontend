import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input('title') title: string = '';
  @Input('message') message: string = '';

  constructor() {}

  ngOnInit() {}
}
