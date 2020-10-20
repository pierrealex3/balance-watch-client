import { Component, Input, OnInit } from '@angular/core';
import { TTMeta } from 'src/app/tt-group-home/tt-meta';

@Component({
  selector: 'app-emdowadom',
  templateUrl: './emdowadom.component.html',
  styleUrls: ['./emdowadom.component.css']
})
export class EmdowadomComponent implements OnInit {

  @Input() activeTT: TTMeta;
  dow: string;
  dom: string;

  constructor() { }

  ngOnInit() {
    let matchRes:any = this.activeTT.freqRef.regex.exec(this.activeTT.data.frequency);
    if (matchRes != null) {
      this.dow = matchRes[1];
      this.dom = matchRes[2];
    }
  }

  inputChange() : void {
    this.activeTT.data.frequency = `dayOfWeek=${this.dow}|after|dayOfMonth=${this.dom}`;
  }

  focusOut() : void {
    this.inputChange();
  }

  dowChange(selDow: string) : void {
    this.dow = selDow;
    this.inputChange();
  }


}
