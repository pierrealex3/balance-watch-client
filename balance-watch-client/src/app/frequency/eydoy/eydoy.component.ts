import { Component, Input, OnInit } from '@angular/core';
import { TTMeta } from 'src/app/tt-group-home/tt-meta';

@Component({
  selector: 'app-eydoy',
  templateUrl: './eydoy.component.html',
  styleUrls: ['./eydoy.component.css']
})
export class EydoyComponent implements OnInit {

  @Input() activeTT: TTMeta;
  month: string;
  day: number;
  // all that stuff should be static or even somewhere in a core ts lib?
  thirtyDayMonth: number[];
  twentyNineDayMonth: number[];
  thirtyOneDayMonth: number[];

  constructor() {
    this.twentyNineDayMonth = Array(29).fill(0).map((x, i) => ++i);
    this.thirtyDayMonth = Array(30).fill(0).map( (x, i) => ++i);
    this.thirtyOneDayMonth = Array(31).fill(0).map( (x, i) => ++i);
   }

  ngOnInit() {
    let matchRes:any[] = this.activeTT.freqRef.regex.exec(this.activeTT.data.frequency);
    if (matchRes != null) {
      this.month = matchRes[1];
      this.day = matchRes[2];
    }
  }

  inputChanged(): void {
    this.activeTT.data.frequency = `dayOfYear=${this.month}-${this.day}`;
  }

  monthChange(): void {
    this.day = undefined;
    this.inputChanged();
  }

  dayChange(): void {
    this.inputChanged();
  }

  isThirtyDayMonth() : boolean {
    return +this.month == 4 || +this.month == 6 || +this.month == 9 || +this.month == 11;
  }

  isThirtyOneDayMonth() : boolean {
    return +this.month == 1 || +this.month == 3 || +this.month == 5 || +this.month == 7 || +this.month == 8 || +this.month == 10 || +this.month == 12;
  }

  isTwentyNineDayMonth() : boolean {
    return +this.month == 2;
  }

}
