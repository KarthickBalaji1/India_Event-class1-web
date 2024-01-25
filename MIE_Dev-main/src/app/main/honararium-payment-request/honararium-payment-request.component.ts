import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { data, event } from 'jquery';
import { UtilityService } from 'src/app/shared/services/event-utility/utility-service.service';
import { ModalComponent } from 'src/app/utility/modal/modal.component';

@Component({
  selector: 'app-honararium-payment-request',
  templateUrl: './honararium-payment-request.component.html',
  styleUrls: ['./honararium-payment-request.component.css']
})
export class HonarariumPaymentRequestComponent implements OnInit {selectedEvent : string = 'select';

// Event List 
eventList : any;

constructor(private utility: UtilityService,
  private activatedRoute : ActivatedRoute) { 
  
  
  utility.getEventTypes().subscribe(
    res => {
      // console.log(res)
      this.eventList = res;
    },
    err => {
      console.log(err)
    }

  )

  utility.getPreviousEventsFast();
}  ngOnInit() {

  this.activatedRoute.queryParams.subscribe(params => {
    console.log('param', params);
    if(params.eventid && params.eventType){
      if(params.eventType == 'Class I'){
        console.log(params.eventType);
        this.selectedEvent = 'EVTC1'
      }
    }
  })

}


}