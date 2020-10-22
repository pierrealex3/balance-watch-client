import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {TTMeta} from '../tt-group-home/tt-meta';
import { globalFrequencyList } from '../frequency/frequency-repo';
import { TTFrequency } from '../frequency/tt-frequency';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-tt-group-summary',
  templateUrl: './tt-group-summary.component.html',
  styleUrls: ['./tt-group-summary.component.css']
})
export class TtGroupSummaryComponent implements OnInit {

  @Input() allTT: TTMeta[];
  @Output() ttSelected = new EventEmitter<TTMeta>();
  selTT:TTMeta;

  frequencyList:TTFrequency[] = [];

  // this stuff could be in a ts core lib
  monthLiterals: string[];

  constructor() {
    this.frequencyList = globalFrequencyList;
    this.monthLiterals = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   }

  ngOnInit() {
  }

  ttSelect(tt: TTMeta) {
    this.selTT = tt;
    this.ttSelected.emit(this.selTT);
  }

  getDescriptor(ttMeta: TTMeta) : string {
    let targetFreq: TTFrequency = globalFrequencyList.find( freq => { return freq.code == ttMeta.freqRef.code });

    let tgtRegex = targetFreq.regex;  // forced to do this!  Cannot chain the call for a reason I don't understand yet.
    if (targetFreq.code === 'em-dom') {
      let matchRes = tgtRegex.exec(ttMeta.data.frequency);
      let dayOfMonth:any = matchRes[1];
      return `Once a month: on day ${dayOfMonth}`;
    } else if (targetFreq.code === 'ew-dow') {
      let matchRes = tgtRegex.exec(ttMeta.data.frequency);
      let dayOfWeek:any = matchRes[1];
      return `Once a week on ${dayOfWeek}`;
    } else if (targetFreq.code === 'exw-dow') {
      let matchRes = tgtRegex.exec(ttMeta.data.frequency);
      let dayOfWeek:any = matchRes[1];
      let x:any = matchRes[2];
      return `Once every ${x} weeks on ${dayOfWeek}`;
    } else if (targetFreq.code === 'em-domwr') {
      let matchRes = tgtRegex.exec(ttMeta.data.frequency);
      let dayOfMonth:any = matchRes[1];
      return `Once a month on day: ${dayOfMonth} - under some conditions`;
    } else if (targetFreq.code === 'em-dowadom') {
      let matchRes = tgtRegex.exec(ttMeta.data.frequency);
      let dayOfWeek:any = matchRes[1];
      let dayOfMonth:any = matchRes[2];
      return `Once a month on ${dayOfWeek} after the ${dayOfMonth}`;
    } else if (targetFreq.code === 'ey-doy') {
      let matchRes = tgtRegex.exec(ttMeta.data.frequency);
      let month:number = matchRes[1];
      let day:any = matchRes[2];
      return `Once a year on ${this.monthLiterals[month-1]} ${day}`;
    } else if (targetFreq.code === 'em-dowap') {
      let matchRes: any[] = tgtRegex.exec(ttMeta.data.frequency);

        let dow:any = matchRes[1];
        let pos:string = matchRes[4];

        let posDesc:string = "";
        if (pos === "1") {
          posDesc = "1st";
        } else if (pos === "2") {
          posDesc = "2nd";
        } else if (pos === "3") {
          posDesc = "3rd";
        } else if (pos === "4") {
          posDesc = "4th";
        } else if (pos === "5") {
          posDesc = "5th";
        } else if (pos === "LAST") {
          posDesc = "Last";
        } 
        
        return `${posDesc} ${new TitleCasePipe().transform(dow)} of the month`;
    } else {
      return 'description unavailable';
    }


  }



}
