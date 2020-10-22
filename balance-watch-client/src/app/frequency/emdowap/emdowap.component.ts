import { Component, Input, OnInit } from '@angular/core';
import { TTMeta } from 'src/app/tt-group-home/tt-meta';

@Component({
  selector: 'app-emdowap',
  templateUrl: './emdowap.component.html',
  styleUrls: ['./emdowap.component.css']
})
export class EmdowapComponent implements OnInit {

  @Input()
  activeTT: TTMeta;

  position: string;
  dow: string;

  constructor() { }

  ngOnInit() {
    let matchRes: any[] = this.activeTT.freqRef.regex.exec(this.activeTT.data.frequency);
    if (matchRes != null) {
      this.dow = matchRes[1];
      this.position = matchRes[4];
    }
  }

  inputChange() : void {
    this.activeTT.data.frequency = `dayOfWeek=${this.dow}|at|rank=${this.position}`;
  }

  dowChange(dow: string) : void {
    this.dow = dow;
    this.inputChange();
  }

}
