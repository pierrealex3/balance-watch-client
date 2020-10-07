import { Component, Input, OnInit } from '@angular/core';
import { TTMeta } from 'src/app/tt-group-home/tt-meta';

@Component({
  selector: 'app-ewdow',
  templateUrl: './ewdow.component.html',
  styleUrls: ['./ewdow.component.css']
})
export class EwdowComponent implements OnInit {

  @Input() activeTT: TTMeta;

  dayOfWeek: string;

  constructor() { }

  ngOnInit() {
    let dow:any = this.activeTT.freqRef.regex.exec(this.activeTT.data.frequency);
    this.dayOfWeek = dow[1];
  }

  dowChange(selDow: string) : void {
    this.dayOfWeek = selDow;
    this.activeTT.data.frequency = "dayOfWeek=" + this.dayOfWeek + "|everyWeek";
  }

}
