import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/shared/services/event-utility/utility-service.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  constructor(private utilityService: UtilityService, private http:HttpClient) { }

  eventList : any;

  ngOnInit(): void {
   this.eventListCall();
  }

  eventListCall()
  {
  //  this.utilityService.getPreviousEventsFast();
  //  this.utilityService.getPreviousEvents().subscribe( res=>
  //   {
  //     this.eventList = res;
  //     console.log(this.eventList);
  //   })

    this.utilityService.getPrevEvents().subscribe(
      res => 
      {
        this.eventList = res;
      console.log(this.eventList);
      }
    )
  // this.http.get("https://dynamicview.smartsheet.com/views/f1793b24-a77c-48a4-b687-095ef782fdbe").subscribe( res=>
  // {
  //   console.log(res);
  // })

  }

}
