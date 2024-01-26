import { Routes } from '@angular/router';

// import { DashboardComponent } from '../../dashboard/dashboard.component';



// New Componenets
// import { New } from 'app/new-event-request/new-event-request.component';
// import { HonarariumPaymentRequestComponent } from 'app/honararium-payment-request/honararium-payment-request.component';
// import { PostEventSettlementComponent } from 'app/post-event-settlement/post-event-settlement.component';
// import { EventListComponent } from 'app/event-list/event-list.component';
// import { HonarariumListComponent } from 'app/honararium-list/honararium-list.component';
// import { PostEventListComponent } from 'app/post-event-list/post-event-list.component';
// import { AuthGuard } from 'app/guards/auth.guard';

import { DashboardComponent } from '../main/dashboard/dashboard.component';
import { NewEventRequestComponent } from '../main/new-event-request/new-event-request.component';
import { HonarariumListComponent } from '../main/honararium-list/honararium-list.component';
import { HonarariumPaymentRequestComponent } from '../main/honararium-payment-request/honararium-payment-request.component';
import { PostEventListComponent } from '../main/post-event-list/post-event-list.component';
import { PostEventSettlementComponent } from '../main/post-event-settlement/post-event-settlement.component';
import { EventListComponent } from '../main/event-list/event-list.component';
import { AddEmployeesComponent } from '../main/add-employees/add-employees.component';
import { AuthGuard } from '../shared/routeguard/auth.guard';
import { Class1HonorariumRequestComponent } from '../main/event-honorarium-request/class1-honorarium-request/class1-honorarium-request.component';
import { Class1PostEventSettlementComponent } from '../main/post-event-settlement-requests/class1-post-event-settlement/class1-post-event-settlement.component';




export const PublicLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard] },
    { path: 'new-event-request', component: NewEventRequestComponent,canActivate:[AuthGuard]  },
    { path: 'honararium-payment-request', component: HonarariumPaymentRequestComponent,canActivate:[AuthGuard]  },
    { path: 'post-event-settlement', component: PostEventSettlementComponent,canActivate:[AuthGuard]   },
    { path: 'view-event-list', component: EventListComponent,canActivate:[AuthGuard]   },
    { path: 'view-honararium-list', component: HonarariumListComponent,canActivate:[AuthGuard]  },
    { path: 'post-event-list', component: PostEventListComponent,canActivate:[AuthGuard]  },
    { path: 'add-employees' , component: AddEmployeesComponent, canActivate:[AuthGuard]},
    // From View Events
    { path: 'honararium-request', component : Class1HonorariumRequestComponent, canActivate:[AuthGuard]},
    { path: 'event-settlement', component : Class1PostEventSettlementComponent, canActivate: [AuthGuard]}
 
  

];


