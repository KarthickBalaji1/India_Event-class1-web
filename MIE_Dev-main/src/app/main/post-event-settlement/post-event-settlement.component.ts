import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { data, event } from 'jquery';
import { UtilityService } from 'src/app/shared/services/event-utility/utility-service.service';
import { ModalComponent } from 'src/app/utility/modal/modal.component';

@Component({
  selector: 'app-post-event-settlement',
  templateUrl: './post-event-settlement.component.html',
  styleUrls: ['./post-event-settlement.component.css']
})

export class PostEventSettlementComponent implements OnInit  {selectedEvent : string = 'select';

// Event List 
eventList : any;

constructor(private utility: UtilityService, private router : Router) { 
  
  
  utility.getEventTypes().subscribe(
    res => {
      // console.log(res)
      this.eventList = res;
    },
    err => {
      console.log(err)
    }

  )

 
}  

ngOnInit() {
  this.utility.getPreviousEventsFast();

}

  onEventSelect(eventType){
    // console.log(eventType)
    if(eventType == 'EVTC1'){
      this.router.navigate(['event-settlement']);
    }
  }

}