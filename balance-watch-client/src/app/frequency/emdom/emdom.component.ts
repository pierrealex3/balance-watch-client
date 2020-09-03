import { Component, OnInit, Input } from '@angular/core';
import { TTMeta } from 'src/app/transaction-template-group/tt-meta';

@Component({
  selector: 'app-emdom',
  templateUrl: './emdom.component.html',
  styleUrls: ['./emdom.component.css']
})
export class EmdomComponent implements OnInit {

  @Input() activeTT: TTMeta;
  dayOfMonth: string;

  constructor() { }

  ngOnInit() {
    if (this.activeTT.data.frequency) {
      this.dayOfMonth = this.activeTT.data.frequency.split("=")[1];
    }
  }

  focusOut() : void {
    // validation : is a number
    this.activeTT.data.frequency = 'dayOfMonth=' + this.dayOfMonth;
    this.activeTT.freqDesc = "Every month, on this specific day: " + this.dayOfMonth;
  }

}
