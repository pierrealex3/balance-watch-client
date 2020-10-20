import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {TTMeta} from '../tt-group-home/tt-meta';
import { globalFrequencyList } from '../frequency/frequency-repo';
import { TTFrequency } from '../frequency/tt-frequency';

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

  constructor() {
    this.frequencyList = globalFrequencyList;
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
      return `Every month - on day: ${dayOfMonth}`;
    } else if (targetFreq.code === 'ew-dow') {
      let matchRes = tgtRegex.exec(ttMeta.data.frequency);
      let dayOfWeek:any = matchRes[1];
      return `Every week on ${dayOfWeek}`;
    } else if (targetFreq.code === 'exw-dow') {
      let matchRes = tgtRegex.exec(ttMeta.data.frequency);
      let dayOfWeek:any = matchRes[1];
      let x:any = matchRes[2];
      return `Every ${x} weeks on ${dayOfWeek}`;
    } else if (targetFreq.code === 'em-domwr') {
      let matchRes = tgtRegex.exec(ttMeta.data.frequency);
      let dayOfMonth:any = matchRes[1];
      return `Every month - on day: ${dayOfMonth} - may be postponed`;
    } else {
      return 'description unavailable';
    }


  }



}
