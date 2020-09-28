import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-simple-dow',
  templateUrl: './simple-dow.component.html',
  styleUrls: ['./simple-dow.component.css']
})
export class SimpleDowComponent implements OnInit {

  @Output() dowChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() selDow: string;

  constructor() { }

  ngOnInit() {
  }

  onChange() : void {
    this.dowChange.emit(this.selDow);
  }

}
