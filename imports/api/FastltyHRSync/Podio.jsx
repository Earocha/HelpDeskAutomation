import {Component} from 'react';
import { fastlyHR_appId, fastlyHR_appToken, amanda_appId, amanda_appToken, PodioSyncAuthApi} from '../helper/data'
export default class Main extends Component{
    constructor(fastlyAppId = fastlyHR_appId, fastlyAppToken = fastlyHR_appToken, amandaAppId = amanda_appId, amandaAppToken = amanda_appToken, podio = PodioSyncAuthApi){
        super();
        this.fastlyAppId = fastlyAppId;
        this.fastlyAppToken = fastlyAppToken;
        this.amandaAppId = amandaAppId;
        this.amandaAppToken = amandaAppToken;
        this.podio = podio;
    }
    VeriftHookFastlyApp(ID,Hook_Code){
        return new Promise((resolve,reject)=>{
            this.podio.authenticateWithApp(this.fastlyAppId, this.fastlyAppToken, (error)=>{

                const option = {code: Hook_Code}
                const podiorES = this.podio.request('POST',`hook/${ID}/verify/validate`, option,(response)=>{
                    console.log(response);
                }).catch(error => reject(error));

                resolve(podiorES);
            })
        })  
    }

    GetItemPerIdFastlyApp(ID){
        return new Promise((resolve,reject)=>{
            this.podio.authenticateWithApp(this.fastlyAppId,this.fastlyAppToken, (response)=>{

                const result = this.podio.request('GET', `item/${ID}`, (response)=>{
                    console.log(response)
                }).catch(error => reject(error))

                resolve(result);
            })
        })
    }

    CreateItemAmandaApp(Data,file_id){
        return new Promise((resolve,reject)=>{
            this.podio.authenticateWithApp(this.amandaAppId,this.amandaAppToken, (response)=>{
                if (response) throw new Error(err);
                this.podio.isAuthenticated().then(() => {
                    var Amanda =  {
                        "external_id": "process-name-control-id-or-deliverable",
                        "external_id": "task",
                        "external_id": "task-description",
                        "external_id": "deliverable",
                        "external_id": "status-2",
                        "external_id": "internal-external",
                        "external_id": "priority",
                        "external_id": "stage",
                        "external_id": "current-status-detailed",
                        "external_id": "requester",
                        "external_id": "assigned-to",
                        "external_id": "reviewer",
                        "external_id": "waiting-on-2",
                        "external_id": "open-date-2",
                        "external_id": "due-date-2",
                        "external_id": "closed-date-2",
                        "external_id": "frequency",
                        "external_id": "est-time",
                        "external_id": "percent-complete",
                        "external_id": "sync-item-id",
                        "fields" : {
                            214506723: Data[0].ProcessName,
                            214506724: Data[0].TaskName,
                            214506725: Data[0].TaskDescription,
                            214506726: Data[0].Deliverable,
                            214506727: Data[0].Status,
                            214506728: Data[0].InternalExternal,
                            214506729: Data[0].Priority,
                            214506730: Data[0].Stage,
                            214506731: Data[0].CurrentNotes,
                            214506732: Data[0].Requester,
                            214506733: Data[0].AssignedTo,
                            214506734: Data[0].Reviewer,
                            214506735: Data[0].WaitingOn,
                            214506736: Data[0].OpenDate,
                            214506737: Data[0].DueDate,
                            214506738: Data[0].ClosedDate,
                            214506739: Data[0].Frequency,
                            214506740: Data[0].Time,
                            214506741: Data[0].percentComplete,
                            214867044: Data[0].SyncItemId,
                        },
                        "file_ids" : file_id
                    }
                    
                        const newitem = this.podio.request('POST', `/item/app/${this.amandaAppId}`, Amanda, function(response) {
                            console.log('Hey there', response);
                        }).catch(err => console.log(err));
                    resolve(newitem);
                
                }).catch(err => reject(err));

            })
        })
    }

    UpdateItemFastlyApp(Data,FastlyItemId){
        return new Promise((resolve,reject)=>{
            var SyncId = "";
            SyncId = Data[0].SyncItemId.toString();
            this.podio.authenticateWithApp(this.fastlyAppId,this.fastlyAppToken, (response)=>{
                if (response) throw new Error(err);
                this.podio.isAuthenticated().then(() => {
                    var Fastly =  {
                        "external_id": "process-name-control-id-or-deliverable",
                        "external_id": "task",
                        "external_id": "task-description",
                        "external_id": "deliverable",
                        "external_id": "status-2",
                        "external_id": "internal-external",
                        "external_id": "priority",
                        "external_id": "stage",
                        "external_id": "current-status-detailed",
                        "external_id": "requester",
                        "external_id": "assigned-to",
                        "external_id": "reviewer",
                        "external_id": "waiting-on-2",
                        "external_id": "open-date-2",
                        "external_id": "due-date-2",
                        "external_id": "closed-date-2",
                        "external_id": "frequency",
                        "external_id": "est-time",
                        "external_id": "percent-complete",
                        "external_id": "sync-item-id",
                        "fields" : {
                            214175605: Data[0].ProcessName,
                            214175606: Data[0].TaskName,
                            214175607: Data[0].TaskDescription,
                            214190200: Data[0].Deliverable,
                            214175609: Data[0].Status,
                            214175610: Data[0].InternalExternal,
                            214175611: Data[0].Priority,
                            214175612: Data[0].Stage,
                            214175613: Data[0].CurrentNotes,
                            214175614: Data[0].Requester,
                            214175615: Data[0].AssignedTo,
                            214175616: Data[0].Reviewer,
                            214175617: Data[0].WaitingOn,
                            214175618: Data[0].OpenDate,
                            214175619: Data[0].DueDate,
                            214175620: Data[0].ClosedDate,
                            214175621: Data[0].Frequency,
                            214175622: Data[0].Time,
                            214190201: Data[0].percentComplete,
                            214867043: SyncId,
                        }
                    }
                    
                    const newitem = this.podio.request('PUT', `/item/${FastlyItemId}`, Fastly, function(response) {console.log('Hey there', response);}).catch(err => console.log(err));
                    resolve(newitem);
                
                }).catch(err => reject(err));

            })
        })
    }

    UpdateAmandaApp(Data, FastlyItemId){
        return new Promise((resolve,reject)=>{
            console.log(Data[0].FileIds);
            var SyncId = "";
            SyncId = FastlyItemId.toString();
            this.podio.authenticateWithApp(this.amandaAppId,this.amandaAppToken, (error)=>{
                if (error) throw new Error(err);
                this.podio.isAuthenticated().then(() => {
                    var Amanda =  {
                        "external_id": "process-name-control-id-or-deliverable",
                        "external_id": "task",
                        "external_id": "task-description",
                        "external_id": "deliverable",
                        "external_id": "status-2",
                        "external_id": "internal-external",
                        "external_id": "priority",
                        "external_id": "stage",
                        "external_id": "current-status-detailed",
                        "external_id": "requester",
                        "external_id": "assigned-to",
                        "external_id": "reviewer",
                        "external_id": "waiting-on-2",
                        "external_id": "open-date-2",
                        "external_id": "due-date-2",
                        "external_id": "closed-date-2",
                        "external_id": "frequency",
                        "external_id": "est-time",
                        "external_id": "percent-complete",
                        "external_id": "sync-item-id",
                        "fields" : {
                            214506723: Data[0].ProcessName,
                            214506724: Data[0].TaskName,
                            214506725: Data[0].TaskDescription,
                            214506726: Data[0].Deliverable,
                            214506727: Data[0].Status,
                            214506728: Data[0].InternalExternal,
                            214506729: Data[0].Priority,
                            214506730: Data[0].Stage,
                            214506731: Data[0].CurrentNotes,
                            214506732: Data[0].Requester,
                            214506733: Data[0].AssignedTo,
                            214506734: Data[0].Reviewer,
                            214506735: Data[0].WaitingOn,
                            214506736: Data[0].OpenDate,
                            214506737: Data[0].DueDate,
                            214506738: Data[0].ClosedDate,
                            214506739: Data[0].Frequency,
                            214506740: Data[0].Time,
                            214506741: Data[0].percentComplete,
                            214867044: SyncId,
                        }
                    }

                    
                        const newitem = this.podio.request('PUT', `/item/${Data[0].SyncItemId}`, Amanda, function(response) {
                            console.log('Hey there', response);
                        }).catch(err => console.log(err));
                        
                    resolve(newitem);
                
                }).catch(err => reject(err));
            })
        })
    }

    CopyFileAmanda(file_id){ //copy files to replace new file_id to update the item 
        return new Promise((resolve,reject)=>{
            this.podio.authenticateWithApp(this.amandaAppId,this.amandaAppToken,(error)=>{
                if (error) throw new Error(err);
                this.podio.isAuthenticated().then(() => {
               
                    const newitem = this.podio.request('POST', `/file/${file_id}/copy`, function(response) {console.log('Hey there', response);}).catch(err => console.log(err));
                    
                    resolve(newitem);

                }).catch(err => reject(err))
            })
        })
    }


    FileUploadOnAmanda(Data, FastlyItemId,fileID){
        return new Promise((resolve,reject)=>{
            var SyncId = "";
            SyncId = FastlyItemId.toString();
            this.podio.authenticateWithApp(this.amandaAppId,this.amandaAppToken, (error)=>{
                if (error) throw new Error(err);
                this.podio.isAuthenticated().then(() => {
                    var Amanda =  {
                        "external_id": "process-name-control-id-or-deliverable",
                        "external_id": "task",
                        "external_id": "task-description",
                        "external_id": "deliverable",
                        "external_id": "status-2",
                        "external_id": "internal-external",
                        "external_id": "priority",
                        "external_id": "stage",
                        "external_id": "current-status-detailed",
                        "external_id": "requester",
                        "external_id": "assigned-to",
                        "external_id": "reviewer",
                        "external_id": "waiting-on-2",
                        "external_id": "open-date-2",
                        "external_id": "due-date-2",
                        "external_id": "closed-date-2",
                        "external_id": "frequency",
                        "external_id": "est-time",
                        "external_id": "percent-complete",
                        "external_id": "sync-item-id",
                        "fields" : {
                            214506723: Data[0].ProcessName,
                            214506724: Data[0].TaskName,
                            214506725: Data[0].TaskDescription,
                            214506726: Data[0].Deliverable,
                            214506727: Data[0].Status,
                            214506728: Data[0].InternalExternal,
                            214506729: Data[0].Priority,
                            214506730: Data[0].Stage,
                            214506731: Data[0].CurrentNotes,
                            214506732: Data[0].Requester,
                            214506733: Data[0].AssignedTo,
                            214506734: Data[0].Reviewer,
                            214506735: Data[0].WaitingOn,
                            214506736: Data[0].OpenDate,
                            214506737: Data[0].DueDate,
                            214506738: Data[0].ClosedDate,
                            214506739: Data[0].Frequency,
                            214506740: Data[0].Time,
                            214506741: Data[0].percentComplete,
                            214867044: SyncId,
                        },
                        "file_ids" : fileID
                    }
                        const newitem = this.podio.request('PUT', `/item/${Data[0].SyncItemId}`, Amanda, function(response) {
                            console.log('Hey there', response);
                        }).catch(err => console.log(err));
                        
                    resolve(newitem);
                
                }).catch(err => reject(err));
            })
        })
    }

    
}