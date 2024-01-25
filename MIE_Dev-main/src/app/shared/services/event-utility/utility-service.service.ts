import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenariniApiUrl } from '../../config/menarini-api-url-config';


@Injectable({
    providedIn: 'root'
  })

  export class UtilityService {

  constructor(private _http : HttpClient) { }

  


    // get previous events for pre event check
    previousEvents : any;
    getPreviousEventsFast()
    {
        this._http.get(MenariniApiUrl.getpreviousEventDataApi).subscribe( res=>
            {
                this.previousEvents = res;
            })
    }

     // Get Previous Event Details
   getPreviousEvents(){
    return this.previousEvents;
  }

  getPrevEvents(){
    return this._http.get(MenariniApiUrl.getpreviousEventDataApi);
  }

    // get event types from event master 
    getEventTypes()
    {
        return this._http.get(MenariniApiUrl.getMasterEventTypesData);
    }

    // get roles 
    getRoles()
    {
        return this._http.get(MenariniApiUrl.getRoleDataApi);
    }

    // Get employee details from Employee Master
    getEmployees()
    {
        return this._http.get(MenariniApiUrl.getEmployeeDetailsApi);
    }

    // Add New Employees to User Role Master Sheet
     addEmployees(postData:any)
     {
     return this._http.post(MenariniApiUrl.addEmployeesApi,postData);
     }

     // Get Added employees from UserRole Master sheet
     getAddedEmployees()
     {
        return this._http.get(MenariniApiUrl.getEventDatafromUserRoleApi);
     }

     // Get HCP roles from HCP Role Master
    getHcpRoles(): Observable<any>
    {
        return this._http.get(MenariniApiUrl.getHCPRoleDataApi);
    }

    // Update employees in HCP Role Master
    updateEmployees(putData:any)
    {
    return this._http.put(MenariniApiUrl.updateEmployeeDataApi,putData);
    } 

    // Delete Employees from HCP Role Master
    deleteEmployees(deleteData : any)
    {
    return this._http.delete(MenariniApiUrl.deleteEmployeeDataApi);
    }

    // Get Brand Names
    getBrandNames()
    {
    return this._http.get(MenariniApiUrl.getBrandNameDataApi);
    }


    // Get All States
    getAllStates()
    {
        return this._http.get(MenariniApiUrl.getStateNameDataApi);
    }

    // Get All City
    getAllCities()
    {
        return this._http.get(MenariniApiUrl.getCityNameDataApi);
    }

    // Get Vendor Details
    getVendorDetails()
    {
        return this._http.get(MenariniApiUrl.vendorMasterSheetDataApi)
    }

    // POST event 1 reques form First set of data
    postClass1PreEventRequest(data:any):Observable<any>
    {
        return this._http.post(MenariniApiUrl.classIAddDataApi,data)
    }

    // POST brandNames
    postBrandNames(brands)
    {
        return this._http.post(MenariniApiUrl.addDataListApi,brands)
    }

    // Getting Employees From HCP Master
    getEmployeesFromHCPMaster()
    {
        return this._http.get(MenariniApiUrl.hcpMasterApi);
    }

    // honorarium detail by id 
    honorariumDetailsById()
    {
        return this._http.get(MenariniApiUrl.honorariumDetailsByIdApi);
    }

    // honorarium details full list
    honorariumDetails()
    {
        return this._http.get(MenariniApiUrl.honorariumDetailsApi);
    }

    // adding honorarium data 
    addHonorariumPayment(data:any)
    {
        return this._http.post(MenariniApiUrl.honorariumRequestAddDataApi,data);
    }

    //Get Approved trainer Data
    getApprovedTrainers()
    {
        return this._http.get(MenariniApiUrl.getApprovedTrainers);
    }

     //Get Approved speaker Data
    getApprovedSpeakers()
    {
        return this._http.get(MenariniApiUrl.getapprovedspeaker);
      }

    // Get Slide Kit Details from Slide Kit master
    getSlideKitDetails()
    {
    return this._http.get(MenariniApiUrl.getSlideKitDetails);
  }

  //get invitees data for post event settlement
  getInviteesData()
  {
    return this._http.get(MenariniApiUrl.getInviteesData);
  }

  //get expensed data for post event settlement
  getExpensesData()
  {
    return this._http.get(MenariniApiUrl.getExpenseData);
  }

  //file uploading
  fileUpload(formData: any)
  {
     return this._http.post(MenariniApiUrl.fileuploading, formData)
  }

   // Get All Expense Type
   getExpenseType()
   {
    return this._http.get(MenariniApiUrl.getexpenseType);
    }

    //  Post Event Settlement
  postEventInviteess : any ;
  getInviteesFast(){
    return this._http.get("http://localhost:5098/api/GetRequestSheets/GetInviteesData")
  }

   //get expense data for post event settlement
   getPostEventExpense(){
    return  this._http.get("http://localhost:5098/api/GetRequestSheets/GetExpenseData");
   }


  //  Panel Selection Final Amount
  getPanelSelectionFinalAmount(eventId: any){
    return this._http.get(`http://localhost:5098/api/GetRequestSheets/GetEventRequestsHcpDetailsTotalSpendValue?EventID=${eventId}`);
  }


  // Invitee Selection Final Amount
  getTotalInviteesFinalAmount(eventId : any){
    return this._http.get(`http://localhost:5098/api/GetRequestSheets/GetEventRequestsInviteesLcAmountValue?EventID=${eventId}`)
  }
 
  // Expense Final
  getTotalExpenseFinalAmount(eventId){
    return this._http.get(`http://localhost:5098/api/GetRequestSheets/GetEventRequestExpenseSheetAmountValue?EventID=${eventId}`)
  }
 
  // Event Settlement Post
  postEventSettlementDetails(data:any): Observable<any>{
    return this._http.post('http://localhost:5098/api/PostReqestSheets/AddEventSettlementData',data)
  }

  // get event list 
  getEventListFromProcess()
  {
    return this._http.get(MenariniApiUrl.getEventList)
  }

  
//   getInviteesData()
//   {
//     return this.postEventInviteess;
//   }

}