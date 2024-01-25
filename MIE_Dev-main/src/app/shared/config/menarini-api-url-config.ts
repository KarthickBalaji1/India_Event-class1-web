// environment
import { url } from "inspector";
import { environment } from "src/environments/environment";

// Api base url
const Url: string = environment.basiApiUrl;

export const MenariniApiUrl = {
    //Login 
    loginApi : Url + "/LoginAndRegister/Login",
   registerNewApi : Url + "/LoginAndRegister/RegisterNew",
    loginwithGoogleApi : Url + "/LoginAndRegister/LoginwithGoogle",

    //Class I previous Events
   getpreviousEventDataApi : Url + "/GetRequestSheets/GetEventRequestWebData",

    // TO get event types
    getMasterEventTypesData : Url + "/GetMasterSheets/GetEventData",

    // Get Roles
    getRoleDataApi : Url + "/GetMasterSheets/GetRoleData",

    // Get employee details from Employee Master
    getEmployeeDetailsApi : Url + "/LoginAndRegister/GetSheetData",

    // Add New Employees to User Role Master Sheet
    addEmployeesApi : Url + "/UserRoleMaster/AddData",

    // Get Added employees from UserRole Master sheet
   getEventDatafromUserRoleApi : Url + "/UserRoleMaster/GetEventData",

    // Get HCP roles from HCP Role Master
    getHCPRoleDataApi : Url + "/GetMasterSheets/GetHCPRoleData",

    // Update employees in HCP Role Master
    updateEmployeeDataApi : Url + "/UserRoleMaster/UpdateData",

    // Delete Employees from HCP Role Master
    deleteEmployeeDataApi : Url + "/UserRoleMaster/DeleteData/${deleteData.Email}",

    // Get Brand Names
   getBrandNameDataApi : Url + "/GetMasterSheets/GetBrandNameData",

    // Get All States
    getStateNameDataApi : Url + "/GetMasterSheets/GetStateNameData",

    // Get All City
    getCityNameDataApi : Url + "/GetMasterSheets/GetCityNameData",

    // Get Vendor Details
    vendorMasterSheetDataApi : Url + "/GetMasterSheets/VendorMasterSheetData",

    // POST event 1 reques form First set of data
    classIAddDataApi : Url + "/PostReqestSheets/AllObjModelsData",

     // POST brandNames
     addDataListApi : Url + "/EventRequestBrandsList/AddDataList",

     // Getting Employees From HCP Master
    hcpMasterApi : Url + "/GetMasterSheets/HcpMaster",

     // honorarium detail by event id fetching
     honorariumDetailsByIdApi : Url + "/GetRequestSheets/GetEventRequestsHcpRoleByIds",

     // get honorarium details 
     honorariumDetailsApi : Url + "/GetRequestSheets/GetHCPRoleDetailsData",

     // adding honorarium payment data
    honorariumRequestAddDataApi : Url + "/PostReqestSheets/AddHonorariumData",

     //get Approved Trainers
     getApprovedTrainers : Url + "/GetMasterSheets/GetApprovedTrainersData",

     //get slidekit details
     getSlideKitDetails : Url + "/GetMasterSheets/SlideKitMaster",

     // get approved speaker
     getapprovedspeaker : Url + "/GetMasterSheets/GetApprovedSpeakersData",

     //getting invitees for post event settlement 
     getInviteesData : Url + "/GetRequestSheets/GetInviteesData",

     // getting expense for post event settlement
     getExpenseData : Url + "/GetRequestSheets/GetExpenseData",

       // file uploading
       fileuploading : Url + "/Temp/AddFormData",

       //getting expense types
       getexpenseType:  Url +'/GetMasterSheets/GetExpenseTypeMasterData',


       //  Post Event Settlement
       getInviteesFast : Url + '/GetRequestSheets/GetInviteesData',

       //get expense data for post event settlement
       getPostEventExpense : Url + '/GetRequestSheets/GetExpenseData',

       getPanelSelectionFinalAmount : Url + ''
}

