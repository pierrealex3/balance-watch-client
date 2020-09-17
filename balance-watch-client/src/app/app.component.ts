import { Component, OnInit } from '@angular/core';
import { SessionDataService } from './session-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Balance Watch';

  constructor(public sessionDataService: SessionDataService){}
  
  ngOnInit(): void {
    console.log("app init");
    var d = new Date();
    this.sessionDataService.summaryYear = "" + d.getFullYear();
    this.sessionDataService.summaryMonth = "" + (d.getMonth()+1);

    this.sessionDataService.loggedUser = '1';
    
  }
}
