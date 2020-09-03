import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {TTMeta} from '../transaction-template-group/tt-meta';

@Component({
  selector: 'app-tt-group-summary',
  templateUrl: './tt-group-summary.component.html',
  styleUrls: ['./tt-group-summary.component.css']
})
export class TtGroupSummaryComponent implements OnInit {

  @Input() allTT: TTMeta[];
  @Output() ttSelected = new EventEmitter<TTMeta>();
  selTT:TTMeta;


  constructor() { }

  ngOnInit() {
  }

  ttSelect(tt: TTMeta) {
    this.selTT = tt;
    this.ttSelected.emit(this.selTT);
  }

}
