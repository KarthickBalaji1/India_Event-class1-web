import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AdminLayoutRoutes } from './admin-layout.routing';
import { PublicLayoutRoutes } from './public-layout-routing.module';


// Material Importss
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatStepperModule} from '@angular/material/stepper';
import { MatRadioModule} from '@angular/material/radio'
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';


//toastr module



// // New Componenets

import { DashboardComponent } from '../main/dashboard/dashboard.component';
import { NewEventRequestComponent } from '../main/new-event-request/new-event-request.component';
import { HonarariumListComponent } from '../main/honararium-list/honararium-list.component';
import { PostEventListComponent } from '../main/post-event-list/post-event-list.component';
import { PostEventSettlementComponent } from '../main/post-event-settlement/post-event-settlement.component';
import { EventListComponent } from '../main/event-list/event-list.component';
import { HonarariumPaymentRequestComponent } from '../main/honararium-payment-request/honararium-payment-request.component';


// Under Dev
import { AddEmployeesComponent } from '../main/add-employees/add-employees.component';
import { UtilityModule } from '../utility/utility.module';

import { Class1EventRequestComponent } from '../main/event-request-form/class1-event-request/class1-event-request.component';
import { StallFabricationEventRequestComponent } from '../main/event-request-form/stall-fabrication-event-request/stall-fabrication-event-request/stall-fabrication-event-request.component';
import { WebinarEventRequestComponent } from '../main/event-request-form/webinar-event-request/webinar-event-request.component';
import { Class1HonorariumRequestComponent } from '../main/event-honorarium-request/class1-honorarium-request/class1-honorarium-request.component';
import { WebinarHonorariumRequestComponent } from '../main/event-honorarium-request/webinar-honorarium-request/webinar-honorarium-request.component';
import { Class1PostEventSettlementComponent } from '../main/post-event-settlement-requests/class1-post-event-settlement/class1-post-event-settlement.component';
import { WebinarPostEventSettlementComponent } from '../main/post-event-settlement-requests/webinar-post-event-settlement/webinar-post-event-settlement.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PublicLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatRadioModule,
    UtilityModule,
    MatCheckboxModule,
    MatTableModule,
    
    
    
    
    
  ],
  declarations: [
    DashboardComponent,
    NewEventRequestComponent,
    HonarariumPaymentRequestComponent,
    PostEventSettlementComponent,
    EventListComponent,
    HonarariumListComponent,
    PostEventListComponent,
    AddEmployeesComponent,
    Class1EventRequestComponent,
    StallFabricationEventRequestComponent,
    WebinarEventRequestComponent,
    Class1HonorariumRequestComponent,
    WebinarHonorariumRequestComponent,
    Class1PostEventSettlementComponent,
    WebinarPostEventSettlementComponent
    
  ]
})

export class PublicLayoutModule {}
