import {Component} from 'react';
import striptags from 'striptags';
import podioFunction from './Podio'
export default class Main extends Component {

    constructor(getPodioFuntion = new podioFunction(), ){
        super();
        this.getPodioFuntion = getPodioFuntion;
    }

    async Start(request){

        switch(request.body.type){

            case 'hook.verify':
                    var Gohook = await this.getPodioFuntion.VeriftHookFastlyApp(request.body.hook_id,request.body.code)
                    console.log("Hook Verify Result =>", Gohook)
            break;

            case 'item.create':

                    var Data = await this.getPodioFuntion.GetItemPerIdFastlyApp(request.body.item_id)
                    var OrgData = await this.OrganizeDataOnCreate(Data,request.body.item_id);
                    //console.log("New Item Created On Amanda Fastly App===>>>",OrgData)
                    
                   
                    var createItem = await this.getPodioFuntion.CreateItemAmandaApp(OrgData);
                    var NewData = await this.OrganizeDataOnCreate(createItem,createItem.item_id);
                    //console.log("Item Created On Amanda App===>>>",NewData)
                    if(NewData.length !== 0 ){
                        console.log("Item Created on Amanda!")
                    }

                    var updateItem = await this.getPodioFuntion.UpdateItemFastlyApp(NewData,request.body.item_id);
                    var NewData = await this.OrganizeDataOnCreate(updateItem,updateItem.item_id);
                    //console.log("Item Updated on Fastly = >",NewData)
                    if(NewData.length !== 0 ){
                        console.log("Item Updated for fastly!")
                    }

            break;

            case 'item.update':
                    
                    var Data = await this.getPodioFuntion.GetItemPerIdFastlyApp(request.body.item_id)
                    var OrgData = await this.OrganizeData(Data);
                   
                    //update other apps function
                    var Data = await this.getPodioFuntion.UpdateAmandaApp(OrgData,request.body.item_id)
                    var OrgData = await this.OrganizeData(Data);

                    if(OrgData.length !== 0 ){
                        console.log("Item Updated for amanda!")
                    }

            break;
            case 'file.change':
                    
                    var Data = await this.getPodioFuntion.GetItemPerIdFastlyApp(request.body.item_id)
                    var OrgData = await this.OrganizeData(Data);
                    //console.log("After update triggered ==>",OrgData,OrgData[0].SyncItemId)

                    var file_id = []
                    for(var i in OrgData,OrgData[0].FileIds){

                        var new_file_id = await this.getPodioFuntion.CopyFileAmanda(OrgData[0].FileIds[i])
                        file_id.push(new_file_id.file_id);
                    }
                    //console.log("new files =>", file_id);
                    //update other apps function
                    var Data = await this.getPodioFuntion.FileUploadOnAmanda(OrgData,request.body.item_id,file_id)
                    var OrgData = await this.OrganizeData(Data);
                    //console.log("Update organize Data ==>",OrgData)

                    if(OrgData.length !== 0 ){
                        console.log("Item Updated for amanda!")
                    }

                        
            break;

        }
    }

    OrganizeDataOnCreate(Data,Item_ID){
        return new Promise((resolve,reject)=>{
            var ProcessName = " ";      //text
            var TaskName = " ";          //text
            var TaskDescription = " ";   //text
            var Deliverable ;       //app
            var Status ;             //category
            var InternalExternal ;   //category
            var Priority ;           //category
            var Stage ;              //category
            var CurrentNotes = " ";      //text
            var Requester;         //app	
            var AssignedTo;        //app
            var Reviewer;          //app	
            var WaitingOn;         //app	
            var OpenDate ;          //date
            var DueDate ;           //date
            var ClosedDate ;        //date           
            var Frequency ;          //category
            var Time;              //duration
            var percentComplete ;    //category

            var SyncItemId = Item_ID;
            var WholeData = [];
            var FileId = [];

            for(var i in Data.fields){

                switch(Data.fields[i].label){

                        case 'Process Name, Control ID, or Deliverable':
                                ProcessName = striptags(Data.fields[i].values[0].value);
                        break;

                        case 'Task Name (brief description)':
                                TaskName = striptags(Data.fields[i].values[0].value);
                        break;

                        case 'Task Description (detailed description)':
                                TaskDescription = striptags(Data.fields[i].values[0].value);
                        break;

                        case 'Deliverable':
                                Deliverable = Data.fields[i].values[0].value.item_id;
                        break;

                        case 'Status':
                                Status = Data.fields[i].values[0].value.text;
                        break;

                        case 'Internal / External':
                                InternalExternal = Data.fields[i].values[0].value.text;
                        break;  

                        case 'Priority':
                                Priority = Data.fields[i].values[0].value.text;
                        break;

                        case 'Stage':
                                //Stage = Data.fields[i].values[0].value.id;
                        break;
                        
                        case 'Current Notes (Detailed)':
                                CurrentNotes = striptags(Data.fields[i].values[0].value);
                        break;

                        case 'Requester':
                                Requester = Data.fields[i].values[0].value.item_id
                        break;

                        case 'Assigned To':
                                AssignedTo = Data.fields[i].values[0].value.item_id
                        break;

                        case 'Reviewer':
                                Reviewer = Data.fields[i].values[0].value.item_id
                        break;

                        case 'Waiting On':
                                WaitingOn = Data.fields[i].values[0].value.item_id
                        break;

                        case 'Open Date':
                                OpenDate = Data.fields[i].values[0].start;
                        break;

                        case 'Due Date':
                                DueDate = Data.fields[i].values[0].start
                        break;

                        case 'Closed Date':
                                ClosedDate = Data.fields[i].values[0].start
                        break;

                        case 'Frequency':
                                Frequency = Data.fields[i].values[0].value.text
                        break;

                        case 'Est. Time (Hrs)':
                                Time = Data.fields[i].values[0].value
                        break;

                        case 'Percent Complete':
                                percentComplete = Data.fields[i].values[0].value.text
                        break;

                }
            }
            
            for(var x in Data.files){
                FileId.push(Data.files[x].file_id)
            }
            WholeData.push({
                "ProcessName" : ProcessName,
                "TaskName" : TaskName,
                "TaskDescription" : TaskDescription,
                "Deliverable" : Deliverable,
                "Status" : Status,
                "InternalExternal" : InternalExternal,
                "Priority" : Priority,
                "Stage" : Stage,
                "CurrentNotes" : CurrentNotes,
                "Requester" : Requester,
                "AssignedTo" : AssignedTo,
                "Reviewer" : Reviewer,
                "WaitingOn" : WaitingOn,
                "OpenDate" : OpenDate,
                "DueDate" : DueDate,
                "ClosedDate" : ClosedDate,
                "Frequency" : Frequency,
                "Time" : Time,
                "percentComplete" : percentComplete,
                "FileIds" : FileId,
                "CreatedOn": Data.created_on,
                "SyncItemId":SyncItemId
            })
            resolve(WholeData);
        })
    }

    OrganizeData(Data){
        return new Promise((resolve,reject)=>{
            var ProcessName = " ";      //text
            var TaskName = " ";          //text
            var TaskDescription = " ";   //text
            var Deliverable ;       //app
            var Status ;             //category
            var InternalExternal ;   //category
            var Priority ;           //category
            var Stage ;              //category
            var CurrentNotes = " ";      //text
            var Requester;         //app	
            var AssignedTo;        //app
            var Reviewer;          //app	
            var WaitingOn;         //app	
            var OpenDate ;          //date
            var DueDate ;           //date
            var ClosedDate ;        //date           
            var Frequency ;          //category
            var Time;              //duration
            var percentComplete ;    //category

            var SyncItemId = "";
            var WholeData = [];
            var FileId = [];

            for(var i in Data.fields){

                switch(Data.fields[i].label){

                        case 'Process Name, Control ID, or Deliverable':
                                ProcessName = striptags(Data.fields[i].values[0].value);
                        break;

                        case 'Task Name (brief description)':
                                TaskName = striptags(Data.fields[i].values[0].value);
                        break;

                        case 'Task Description (detailed description)':
                                TaskDescription = striptags(Data.fields[i].values[0].value);
                        break;

                        case 'Deliverable':
                                Deliverable = Data.fields[i].values[0].value.item_id;
                        break;

                        case 'Status':
                                Status = Data.fields[i].values[0].value.text;
                        break;

                        case 'Internal / External':
                                InternalExternal = Data.fields[i].values[0].value.text;
                        break;  

                        case 'Priority':
                                Priority = Data.fields[i].values[0].value.text;
                        break;

                        case 'Stage':
                                //Stage = Data.fields[i].values[0].value.id;
                        break;
                        
                        case 'Current Notes (Detailed)':
                                CurrentNotes = striptags(Data.fields[i].values[0].value);
                        break;

                        case 'Requester':
                                Requester = Data.fields[i].values[0].value.item_id
                        break;

                        case 'Assigned To':
                                AssignedTo = Data.fields[i].values[0].value.item_id
                        break;

                        case 'Reviewer':
                                Reviewer = Data.fields[i].values[0].value.item_id
                        break;

                        case 'Waiting On':
                                WaitingOn = Data.fields[i].values[0].value.item_id
                        break;

                        case 'Open Date':
                                OpenDate = Data.fields[i].values[0].start;
                        break;

                        case 'Due Date':
                                DueDate = Data.fields[i].values[0].start
                        break;

                        case 'Closed Date':
                                ClosedDate = Data.fields[i].values[0].start
                        break;

                        case 'Frequency':
                                Frequency = Data.fields[i].values[0].value.text
                        break;

                        case 'Est. Time (Hrs)':
                                Time = Data.fields[i].values[0].value
                        break;

                        case 'Percent Complete':
                                percentComplete = Data.fields[i].values[0].value.text
                        break;

                        case 'Sync Item ID':
                                SyncItemId = striptags(Data.fields[i].values[0].value);
                        break;

                }
            }
            
            for(var x in Data.files){

                FileId.push(Data.files[x].file_id)
            }
            WholeData.push({
                "ProcessName" : ProcessName,
                "TaskName" : TaskName,
                "TaskDescription" : TaskDescription,
                "Deliverable" : Deliverable,
                "Status" : Status,
                "InternalExternal" : InternalExternal,
                "Priority" : Priority,
                "Stage" : Stage,
                "CurrentNotes" : CurrentNotes,
                "Requester" : Requester,
                "AssignedTo" : AssignedTo,
                "Reviewer" : Reviewer,
                "WaitingOn" : WaitingOn,
                "OpenDate" : OpenDate,
                "DueDate" : DueDate,
                "ClosedDate" : ClosedDate,
                "Frequency" : Frequency,
                "Time" : Time,
                "percentComplete" : percentComplete,
                "FileIds" : FileId,
                "CreatedOn": Data.created_on,
                "SyncItemId":SyncItemId
            })
            resolve(WholeData);
        })
    }

    checkMatch(Data1,Data2){
        return new Promise((resolve,reject)=>{

        })
    }
}