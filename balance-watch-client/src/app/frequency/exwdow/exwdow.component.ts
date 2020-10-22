import { Component, Input, OnInit } from '@angular/core';
import { TTMeta } from 'src/app/tt-group-home/tt-meta';

@Component({
  selector: 'app-exwdow',
  templateUrl: './exwdow.component.html',
  styleUrls: ['./exwdow.component.css']
})
export class ExwdowComponent implements OnInit {
  
  @Input() activeTT: TTMeta;

  selDow: string;
  selX: number;

  constructor() { }

  ngOnInit() {
    let matchRes: any = this.activeTT.freqRef.regex.exec(this.activeTT.data.frequency);
    if (matchRes != null) {
      this.selDow = matchRes[1];
      this.selX = matchRes[2];
    }
  }

  inputChange() : void {
    this.activeTT.data.frequency = `dayOfWeek=${this.selDow}|everyXWeeks=${this.selX}`;
  }

  dowChange(dowSel: string) {
    this.selDow = dowSel;
    this.inputChange();
  }

}
