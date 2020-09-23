import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SessionDataService } from '../session-data.service';

@Component({
  selector: 'app-month-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.css']
})
export class MonthSelectorComponent implements OnInit {

  @Output() monthSelected = new EventEmitter<string>();
  monthSel: number;

  constructor(public sessionDataService: SessionDataService) { }

  ngOnInit() {
  }

  onChange() : void {    
    this.monthSelected.emit(this.sessionDataService.summaryMonth);
  }

}
