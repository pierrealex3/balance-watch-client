import { Component, Input, OnInit } from '@angular/core';
import { TTMeta } from 'src/app/tt-group-home/tt-meta';

@Component({
  selector: 'app-emdomwr',
  templateUrl: './emdomwr.component.html',
  styleUrls: ['./emdomwr.component.css']
})
export class EmdomwrComponent implements OnInit {

  @Input() activeTT: TTMeta;
  dayOfMonth: string;
  fromDow1: string;
  toDow1: string;
  fromDow2: string;
  toDow2: string;
  fromDow3: string;
  toDow3: string;
  
  constructor() { }

  ngOnInit() {
    let matchRes: any = this.activeTT.freqRef.regex.exec(this.activeTT.data.frequency);
    if (matchRes != null) {
      this.dayOfMonth = matchRes[1];
      this.fromDow1 = matchRes[4];
      this.toDow1 = matchRes[5];
      this.fromDow2 = matchRes[6];
      this.toDow2 = matchRes[7];
      this.fromDow3 = matchRes[8];
      this.toDow3 = matchRes[9];
    }
  }

  inputChange() : void {
    let freqStr = `dayOfMonth=${this.dayOfMonth}|report|`;

    if (this.fromDow1 != undefined || this.toDow1 != undefined) {
      freqStr += `from1=${this.fromDow1};to1=${this.toDow1}`;
      if (this.fromDow2 != undefined || this.toDow2 != undefined) {
        freqStr += `;from2=${this.fromDow2};to2=${this.toDow2}`;
        if (this.fromDow3 != undefined || this.toDow3 != undefined) {
          freqStr += `;from3=${this.fromDow3};to3=${this.toDow3}`;
        }
      }
    }
    this.activeTT.data.frequency = freqStr;

  }

  fromDow1Change(dowSel: string) {
    this.fromDow1 = dowSel;
    this.inputChange();
  }

  toDow1Change(dowSel: string) {
    this.toDow1 = dowSel;
    this.inputChange();
  }

  fromDow2Change(dowSel: string) {
    this.fromDow2 = dowSel;
    this.inputChange();
  }

  toDow2Change(dowSel: string) {
    this.toDow2 = dowSel;
    this.inputChange();
  }

  fromDow3Change(dowSel: string) {
    this.fromDow3 = dowSel;
    this.inputChange();
  }

  toDow3Change(dowSel: string) {
    this.toDow3 = dowSel;
    this.inputChange();
  }

}
