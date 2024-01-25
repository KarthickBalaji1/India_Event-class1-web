import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { data, event } from 'jquery';
import { UtilityService } from 'src/app/shared/services/event-utility/utility-service.service';
import { ModalComponent } from 'src/app/utility/modal/modal.component';

@Component({
  selector: 'app-class1-post-event-settlement',
  templateUrl: './class1-post-event-settlement.component.html',
  styleUrls: ['./class1-post-event-settlement.component.css']
})
export class Class1PostEventSettlementComponent implements OnInit   {
  PostEventSettlement : FormGroup;

  addExpenseForm : FormGroup;


  stepper: any;
  isUploadShows:boolean=false;
  isUploadGST:boolean=false;
  show30DaysUpload:boolean=false;

  invitees : any;
  inviteeTableIsPresentCheckBox : any[] = [];
  totalAttendance : number = 0;

  showInviteeDeviation : boolean = false;

  expense : any;

  selectedEvent : any;
  showPostEventContent : boolean = false;
  inviteeTableDetails : any[] = [];
  expenseTabelDetails : any[] = [];

  expenseTableDetailCopy : any[] = [];
  inviteeTableDetailsCopy : any[] = []

  
  allEventList : any ;
  expenseType : any;
  

  // Amount Table 
  panelSelectionFinalAmount : any;
  inviteesFinalAmount : any;
  expenseFinalAmount : any;
  amountTableFinalAmount : any = 0;

  // Advance Table:
  advancedUtilized : any = 0;
  amountToPayForInitiator : any = 0;
  amountToPayForCompany : any = 0;

    constructor(private utilityService : UtilityService) {
      
  
      this.PostEventSettlement = new FormGroup({
       // dayssince: new FormControl('',Validators.required),
        uploadDeviation: new FormControl('',Validators.required),
        TotalAttendance: new FormControl('',Validators.required),
        itCompanysBTCBTE: new FormControl('',Validators.required),
        Expense: new FormControl('',Validators.required),
        costperparticipant: new FormControl('',Validators.required),
        Amount: new FormControl('',Validators.required),
        CostperparticipantINR: new FormControl('',Validators.required),
        includingGST: new FormControl('',Validators.required),
        uploadDeviation1: new FormControl('',Validators.required),
        actualAmount : new FormControl(''),
        inviteeIsPresent : new FormControl('',),

  
      })

      this.allEventList = utilityService.getPreviousEvents();

      utilityService.getInviteesFast().subscribe(res => {
        this.invitees = res
      });

      if(this.allEventList){
        this.after30Days(this.allEventList);
      }
      else{
        utilityService.getInviteesFast().subscribe(res => {
          this.invitees = res
        });
        console.log('qqq', utilityService.getPreviousEvents() )
      }

      utilityService.getExpenseType().subscribe(
        res => this.expenseType = res
      )
     
      
     
      
      // this.invitees = this.utilityService.getInviteesData();
      // this.addInviteePrePopulate();

      utilityService.getPostEventExpense().subscribe(
        res => {
          console.log(res);
          this.expense = res;

        }
      )
     
      this.addExpenseForm = new FormGroup({
        expenseType : new FormControl('',Validators.required),
        expenseAmountWithoutGST : new FormControl(0,),
        gstAmount : new FormControl(0,),
        expenseBTC : new FormControl('',Validators.required),
      })
  
    
    }

    addInviteePrePopulate(){
      // console.log(this.invitees)
     if(Boolean(this.inviteeTableDetails)){
      for(let i=0;i<this.inviteeTableDetails.length;i++){
        this.inviteeTableIsPresentCheckBox.push(i);
        // this.expenseTableActualAmountInput.push(i+'actual-amount')
      }
     }
    }

    inviteePresent(value:any){
     console.log(value)
     if(value){
      this.totalAttendance++;
     }
     else{
      this.totalAttendance--;
     }

     if(this.totalAttendance < 5){
      this.showInviteeDeviation = true;
     }
     else this.showInviteeDeviation = false;
    }


    // Expense Table Controls
    expenseTableActualAmountInput : any[] = [];

    onExpenseActualAmountChanges(value : any,id : any){
      // console.log(id);
      // console.log(value);
     
      // this.inviteeTableDetailsCopy = this.inviteeTableDetails;

      // this.expenseTableDetailCopy[id].Amount = value;
     
      console.log(Boolean(value))
      if(Boolean(value)){ 
        this.advancedUtilized = this.amountTableFinalAmount;
        console.log('advan', this.advancedUtilized);
        
        this.advancedUtilized -= this.expenseTabelDetails[id].Amount;

        console.log('afterchan', this.advancedUtilized)
        this.advancedUtilized += value;
        this.calculateAdvanceTableDetails();
      }
      else{
        this.calculateAdvanceIfNoChange();
      }
      

      // console.log(this.expenseTabelDetails[id]);
      // console.log(this.expenseTabelDetails)
      // console.log(this.expenseTableDetailCopy)
      
      // console.log(this.expenseTabelDetails);
      // this.expenseTableActualAmountInput[0] = 10000;
      // console.log(this.expenseTableActualAmountInput)
    }

    onInviteeLcAmountChanges(value : any, id : any){
      if(Boolean(value)){ 
        this.advancedUtilized = this.amountTableFinalAmount;
        console.log('advan', this.advancedUtilized);
        
        this.advancedUtilized -= this.inviteeTableDetails[id].LcAmount;

        console.log('afterchan', this.advancedUtilized)
        this.advancedUtilized += value;
        this.calculateAdvanceTableDetails();
      }
      else{
        this.calculateAdvanceIfNoChange();
      }
    }
  
  
  
    ngOnInit(): void {
       
       this.showingUpload();
       this.addExpenseFormPrePopulate();

       
    }

    selectedEventDetails : any;

    onEventSelect(eventId:any){
      // console.log(eventId)
      this.inviteeTableDetails = [];
      this.expenseTabelDetails = [];
      this.inviteeTableDetailsCopy = [];
      this.expenseTableDetailCopy = [];

      this.selectedEventDetails = this.allEventList.find(eve => {
        return eve['EventId/EventRequestId'] == eventId
      })

      this.invitees.forEach(invitee => {
        if(invitee['EventId/EventRequestId'] == eventId){
          /*
          {
      "eventIdOrEventRequestId": "string",
      "inviteeName": "string",
      "misCode": "string",
      "localConveyance": "string",
      "btcorBte": "string",
      "lcAmount": "string"
    }
           */
          console.log(invitee)
          const data = {
            EventIdOrEventRequestId : invitee['EventId/EventRequestId'],
            InviteeName : invitee.InviteeName,
            MisCode : invitee.MISCode,
            LocalConveyance : invitee.LocalConveyance,
            BtcorBte : invitee['BTC/BTE'],
            LcAmount : invitee.LcAmount
          };
          this.inviteeTableDetails.push(data);
          // this.inviteeTableDetailsCopy.push(invitee);
        }
      })

      this.expense.forEach(exp => {
        // console.log(exp['EventId/EventRequestId'])
        /**
         * {
      "eventId": "string",
      "expense": "string",
      "amount": "string",
      "amountExcludingTax": "string",
      "btcorBte": "string",
      "btcAmount": "string",
      "bteAmount": "string",
      "budgetAmount": "string"
    }
         */
        console.log('aaa',exp)
        if(exp['EventId/EventRequestID'] == eventId){
          const expense = {
            Amount : exp.Amount,
            Expense : exp.Expense,
            AmountExcludingTax : exp['AmountExcludingTax?'],
            BtcorBte : exp['BTC/BTE'],

            // For API
            EventId : ' ',
            BtcAmount : ' ',
            BteAmount :  ' ',
            BudgetAmount : ' '
          }
          this.expenseTabelDetails.push(expense);
          // this.expenseTableDetailCopy.push(expense);
        }
        
       
       
      })

      for(let i=0;i<this.expenseTabelDetails.length;i++){
        this.expenseTableActualAmountInput.push(i)
      }

      this.utilityService.getPanelSelectionFinalAmount(eventId).subscribe(
        res => {
         if(Boolean(res)){
          this.panelSelectionFinalAmount = res
          this.amountTableFinalAmount += res
          this.advancedUtilized += res
         }
        }
      )

      this.utilityService.getTotalInviteesFinalAmount(eventId).subscribe(
        res => {
          if(Boolean(res)){
            this.inviteesFinalAmount = res;
            this.amountTableFinalAmount += res;
          }
        }
      )

      this.utilityService.getTotalExpenseFinalAmount(eventId).subscribe(
        res => {
          
          if(Boolean(res)){
            this.expenseFinalAmount = res;
            this.amountTableFinalAmount += res;
          }
          
          // this.amountTableFinalAmount = parseInt(this.expenseFinalAmount) + parseInt(this.inviteesFinalAmount) + parseInt(this.panelSelectionFinalAmount);
        }
      )

      // console.log('Expense Table',this.expenseTabelDetails.length);
      // console.log('Invitees', this.inviteeTableDetails);




      if(this.inviteeTableDetails.length > 0 && this.expenseTabelDetails.length > 0 ){
        this.showPostEventContent = true;
      }
      else{
        this.showPostEventContent = false;
        alert('This Event has no associated data')
      }

      this.advancedUtilized = this.amountTableFinalAmount;
      // this.calculateAdvanceTableDetails();
      // if(this.expenseTabelDetails.length > 0){
      //   this.expenseTabelDetails.forEach(expense => {
      //     console.log(expense.Amount)
      //     this.advancedUtilized += parseInt(expense.Amount)
      //   })
      // }

      // if(this.inviteeTableDetails.length > 0){
      //   this.inviteeTableDetails.forEach(invitee => {
      //     // console.log(invitee.LcAmount)
      //     this.advancedUtilized += parseInt(invitee.LcAmount);
      //   })
      // }

      console.log('Amou U', typeof this.amountTableFinalAmount);
      console.log('Uiii', typeof this.advancedUtilized)
      
    }

    addExpenseRadio : String;
    showAddExpense : boolean = false;

    onAddExpenseRadioChange(value:String){
      console.log(value)
      if(value == 'Yes'){
        this.showAddExpense = true;
      }else{
        this.showAddExpense = false;
      }
    }

    addExpenseFormPrePopulate(){
      /**
       * Expense
       * Amount
       * BTC/BTE
       * AmountExcluding
       */
      
      this.addExpenseForm.valueChanges.subscribe(
        changes => {
          // console.log(this.expenseTabelDetails)
          // console.log(changes)

          
        }
      )
    }

    expenseTabelDetails2 : any[] = [];

    addToExpenseTable(){
     
      if(this.addExpenseForm.valid && this.addExpenseForm.value.expenseAmountWithoutGST > 0){

          /**
           *  "eventId": "string",
      "expense": "string",
      "amount": "string",
      "amountExcludingTax": "string",
      "btcorBte": "string",
      "btcAmount": "string",
      "bteAmount": "string",
      "budgetAmount": "string"
           */
        const expense = {
          Amount : this.addExpenseForm.value.expenseAmountWithoutGST + this.addExpenseForm.value.gstAmount ,
          Expense : this.addExpenseForm.value.expenseType,
          AmountExcludingTax : (this.addExpenseForm.value.gstAmount > 0)? 'No' : 'Yes',
          BtcorBte : this.addExpenseForm.value.expenseBTC,

          // For API
          eventId : this.selectedEventDetails['EventId/EventRequestId'],

        }

       this.amountTableFinalAmount += expense.Amount;
        this.expenseTabelDetails2.push(expense);
        // this.expenseTableActualAmountInput;
       

        // this.expenseTableActualAmountInput[this.expenseTableActualAmountInput.length-1] = expense.Amount + this.addExpenseForm.value.gstAmount;

        // console.log(this.expenseTableActualAmountInput)

        this.addExpenseForm.reset();
        this.addExpenseForm.controls.expenseAmountWithoutGST.setValue(0);
        this.addExpenseForm.controls.gstAmount.setValue(0);
        
      }
      else{
        alert("Fill All Fields")
      }
    }

  
    showingUpload()
    {
     this.PostEventSettlement.valueChanges.subscribe( (res =>
      {
        console.log(res);
        this.isUploadShows = (res.dayssince == 'Yes')?true:false;
        this.isUploadGST = (res.includingGST == 'Yes')?true:false;
      }))
    }

    after30DaysList: any[] =[] ;
    private  after30Days(eventList : any)
      {
        console.log('Event List',eventList)
       if(Boolean(eventList))
       {
        eventList.forEach(event =>
          {

           if(Boolean(event.EventDate)){
            let today : any = new Date();
            let eventDate = new Date(event.EventDate);
    
            let Difference_In_Time = eventDate.getTime() - today.getTime();
    
            let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

           
            if(Difference_In_Days <= -30){
              this.after30DaysList.push(event)
            }
           }

           
    
            // this.eventDate = changes.eventDate
    
            // if(Difference_In_Days <= 7){
            //   this.show7DaysUploadDeviation = true;
            // }
            // else this.show7DaysUploadDeviation = false
    
          //  let today : any = new Date();
 
          //  if(event.EventDate)
          //  {
          //    let eventDate : any = new Date(event.EventDate);
          //    console.log(eventDate.getTime());
            

          //  }
              //  if(Difference_In_Time >= today.getDate())
              //  {
              //   console.log("hello",eventDate)
              //  }
              
              //  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
 
              //  if(Difference_In_Days >= 30){
              //   
              //  }
           }
          
                
       )}
       if(this.after30Days.length > 0){
        this.show30DaysUpload = true;
       }
       else{
        this.show30DaysUpload = false;
       }
       }


    private calculateAdvanceIfNoChange(){
      this.advancedUtilized = this.amountTableFinalAmount;
      this.amountToPayForCompany = 0;
      this.amountToPayForInitiator = 0;
      // if(this.expenseTabelDetails.length > 0){
      //   this.expenseTabelDetails.forEach(expense => {
      //     console.log(expense.Amount)
      //     this.advancedUtilized += parseInt(expense.Amount)
      //   })
      // }

      // if(this.inviteeTableDetails.length > 0){
      //   this.inviteeTableDetails.forEach(invitee => {
      //     // console.log(invitee.LcAmount)
      //     this.advancedUtilized += parseInt(invitee.LcAmount);
      //   })
      // }
    }


    private calculateAdvanceTableDetails(){
      
      
      // if(this.expenseTabelDetails.length > 0){
      //   this.expenseTabelDetails.forEach(expense => {
      //     console.log(expense.Amount)
      //     this.advancedUtilized += parseInt(expense.Amount)
      //   })
      // }

      // if(this.inviteeTableDetails.length > 0){
      //   this.inviteeTableDetails.forEach(invitee => {
      //     // console.log(invitee.LcAmount)
      //     this.advancedUtilized += parseInt(invitee.LcAmount);
      //   })
      // }
      // console.log('uti', this.advancedUtilized);
      // console.log('fina', this.amountTableFinalAmount)
      if(this.amountTableFinalAmount < this.advancedUtilized ){
        this.amountToPayForCompany = 0;
        this.amountToPayForInitiator = this.advancedUtilized - this.amountTableFinalAmount;
      }

      if(this.amountTableFinalAmount > this.advancedUtilized){
        this.amountToPayForInitiator = 0;
        this.amountToPayForCompany = this.amountTableFinalAmount - this.advancedUtilized;
      }

      if(this.amountTableFinalAmount == this.advancedUtilized){
        this.amountToPayForCompany = 0;
        this.amountToPayForInitiator = 0;
        console.log(this.amountToPayForInitiator)
      }
    }


    postEventSubmit(){
      // Pay Load
      /**
       "eventSettlement": {
    "eventId": "string",
    "eventTopic": "string",
    "eventType": "string",
    "eventDate": "2024-01-25T05:00:20.473Z",
    "startTime": "string",
    "initiatorName": "string",
    "endTime": "string",
    "venueName": "string",
    "state": "string",
    "city": "string",
    "attended": "string",
    "inviteesParticipated": "string",
    "expenseParticipated": "string",
    "totalExpense": "string",
    "advance": "string"
  },
       */
    console.log(this.selectedEventDetails)
    const eventSettlementInfo = {
      EventId : this.selectedEventDetails['EventId/EventRequestId'],
      EventTopic : this.selectedEventDetails['Event Topic'],
      EventType : this.selectedEventDetails.EventType,
      EventDate : this.selectedEventDetails.EventDate,
      StartTime : this.selectedEventDetails.StartTime,
      InitiatorName : this.selectedEventDetails.InitiatorName,
      EndTime : this.selectedEventDetails.EndTime,
      VenueName : this.selectedEventDetails.VenueName,
      State : this.selectedEventDetails.State,
      City : this.selectedEventDetails.City,
      Attended : this.totalAttendance+'',
      InviteesParticipated : this.inviteeTableDetails.length+'',
      ExpenseParticipated : (this.expenseTabelDetails.length + this.expenseTabelDetails2.length)+'',
      TotalExpense : this.advancedUtilized+'',
      Advance : this.amountTableFinalAmount+''

    }
    // console.log(this.inviteeTableDetails)

    const apiPayload = {
      EventSettlement : eventSettlementInfo,
      RequestInvitees : this.inviteeTableDetails,
      ExpenseSheet : this.expenseTabelDetails
    }

    this.utilityService.postEventSettlementDetails(apiPayload).subscribe(
      res => {
        console.log(res);
        if(res.message == "Data added successfully."){
          alert("Event Settlement Submitted Successfully")
        }
      },
      err => {
        console.log(err)
      }
    )

    console.log(apiPayload)
    }

    
    
       
}
