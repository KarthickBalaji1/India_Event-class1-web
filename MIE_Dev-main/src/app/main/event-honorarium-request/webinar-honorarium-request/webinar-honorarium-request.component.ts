import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { data, event } from 'jquery';
import { UtilityService } from 'src/app/shared/services/event-utility/utility-service.service';
import { ModalComponent } from 'src/app/utility/modal/modal.component';

@Component({
  selector: 'app-webinar-honorarium-request',
  templateUrl: './webinar-honorarium-request.component.html',
  styleUrls: ['./webinar-honorarium-request.component.css']
})
export class WebinarHonorariumRequestComponent implements OnInit {

  stepper: any;
  honorarium: FormGroup;


  // for pagination purpose
  currentpage = 1;
  page : number = 1;
  count : number = 0;
  tableSize : number = 10;
  tableSized : any = [5,10,15,20];


  show2DaysUpload: boolean = false;
  showuploadifGSTyes: boolean = false;
  pageSizeOptions: number[];





  constructor(private utilityService: UtilityService,private dialog : MatDialog) {
    this.honorarium = new FormGroup({
      //isAfter2Days:new FormControl('',[Validators.required]),
      uploadDeviation: new FormControl('', [Validators.required]),
      uploadSpeakerAgreement: new FormControl('', [Validators.required]),
      uploadPhotos: new FormControl(''),
      uploadFinalHonorariumDetails: new FormControl(''),
      uploadDetails: new FormControl(''),
      isItIncludingGST: new FormControl(''),
      isInviteeslessthan5: new FormControl(''),
      UploadDetails1: new FormControl(''),
      EventId: new FormControl('')
    })
    this.After2WorkingDays(this.utilityService.getPreviousEvents());
    

  }
  ngOnInit(): void {
    this.showUpload();
    this.showingDetails();
    this.honorarium.valueChanges.subscribe(changes=>
      {
        if(changes.EventId){
          this.honortableDetails = [];
          console.log(changes.EventId)
          this.selectedEvent = changes.EventId;
          this.filterHonor(changes.EventId);
          // console.log(this.honortableDetails);
          
        }
      })
    // console.log(this.length);
  }

  showUpload() {
    this.honorarium.valueChanges.subscribe(chanegs => {
    this.showuploadifGSTyes = (chanegs.isItIncludingGST == 'Yes') ? true : false;

    })
  }
  eventListafter2days: any[] = [];
  eventIds: any[] = [];
  private After2WorkingDays(eventList: any) {
    if (Boolean(eventList)) {
      eventList.forEach(event => {

        if(event.EventType == 'Webinar'){
          let today: any = new Date();
          let eventDate: any = new Date(event.EventDate);
          const twodays = 2 * 24 * 60 * 60 * 1000;
          if (today.getTime() - eventDate.getTime() >= twodays) {
            this.eventListafter2days.push(event);
            this.eventIds.push(event['EventId/EventRequestId']);
            this.show2DaysUpload = true;
  
           console.log('after 2 days list',this.eventListafter2days);
  

        }
       
        }
      })
      
    }

  }

  //declearing the variable for honorarium details
  honorarDetails: any;
  honortableDetails:any[] = [];
  eventTypeForId : any[] = [];

  private showingDetails() {

    this.utilityService.honorariumDetails().subscribe(honoDetails => {
      this.honorarDetails = honoDetails;
      // this.filterHonor();
      
     
    })
  }

  gstRadio : any[] = [];
  disableGST : any[] = [];

  selectedEvent : any;

  filterHonor(eventId:any){
    console.log(eventId);
   if(Boolean(this.honorarDetails))
   {
    
    this.honorarDetails.forEach(data =>{
      console.log(data['EventId/EventRequestId']);
      if(data['EventId/EventRequestId'] == eventId){
        this.honortableDetails.push(data);
      }
    })
   }
  

    for(let i=0;i<this.honortableDetails.length;i++){
      this.gstRadio.push(i)
      this.disableGST.push(true);
    }

  }

  onSubmit()
  {
    let honorariumData :any[] =[] ;

    console.log(this.eventTypeForId)
    this.honortableDetails.forEach(honor=>
      {
        let data={
        HcpName : honor.HCPName,
      EventId : honor['EventId/EventRequestId'],
      EventType : (this.eventTypeForId.length > 0)?this.eventTypeForId.find(event =>event.eventId == honor['EventId/EventRequestId']).eventType: ' ',
      HcpRole : (Boolean(honor.HcpRole))?honor.HcpRole:" ",
      MISCode :(Boolean(honor.MISCode))?honor.MISCode:" ",
      GONGO : (Boolean(honor.GONGO))?honor.GONGO:" ",
      IsItincludingGST : (Boolean(honor.isIncludingGSTForAPI))? honor.isIncludingGSTForAPI : 'No',
      AgreementAmount : (Boolean(honor.AgreementAmount))?honor.AgreementAmount+'':"0",
      HonorariumSubmitted : "Yes"
        }
       
       honorariumData.push(data);

       

      })
      
    console.log('hnonorarium data',honorariumData);
    const requestHonorariumList = {
      RequestHonorariumList : honorariumData
    };
    this.utilityService.addHonorariumPayment(requestHonorariumList).subscribe( changes=>
      {
        //console.log(changes);
      })

  }

  idShown : any[] = [];
  checkGST(option : any, name : string, id : string){
    // if(this.idShown.indexOf(id) == -1){
    //   this.idShown.push(id);
    // }
    // console.log(this.honortableDetails)
    if(option == 'Yes')
    {
      this.disableGST[id] = false;

      this.honortableDetails[id].isIncludingGSTForAPI = 'Yes' ;
    }
    else
    {
      this.disableGST[id] = true;
      this.honortableDetails[id].isIncludingGSTForAPI = 'No' ;

    }

    console.log(this.honortableDetails)

    // if(value == "Yes"){
    //   console.log(index)
    // }
  }

 
  openhonorariumUpdateModal(honorarium : any){
    const dialogRef =  this.dialog.open(ModalComponent,{
      width: '600px',
      data : {
        forHonararium : true,
        honarariumData : honorarium
      }
    });
  }

  onTableChange(changetableevent:any)
  {
    this.page = changetableevent;
    this.honortableDetails;

  }
  onTableSizeChange(changetablesizeevent:any):void
  {
    this.tableSize = changetablesizeevent.target.value;
    this.page = 1;
    this.honortableDetails;
  }

  


}

