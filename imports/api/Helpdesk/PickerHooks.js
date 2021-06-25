import { Component } from 'react';
import builder from 'botbuilder';
import Items from './GetItemPodio.js'
import sanitizeHTML from 'striptags';

export default class PickersHook extends Component{
  
    async start(request){

            console.log("Item ID",request.body.item_id);
            console.log("Method ",request.method);
            console.log("TYPE ",request.body.type);
            console.log("Code ",request.body.code);
            console.log("Request Body ",request.body);

            const priority_fieldID = 125927694;
            const openDate_fieldID = 137241980;
            const title_fieldID = 80519767;
            const emailrequest_fieldID = 80519844;
            const waitingON_fieldID = 137359208;
            const assignTO_fieldID = 137359206;
            const from_fieldID = 138227255;

            
        (async () => {

            switch(request.body.type){
                case 'hook.verify':
                    var verify = new Items();
                    var response = await verify.Search(request.body.hook_id, title_fieldID,request.body.code,request.body.type, request.method);  
                    console.log(response);

                    break;
                case 'item.create':

                    console.log("Data gathering......");
                    var dataClearing = await this.wait2Sec();
                    console.log(dataClearing);

                    var Start = new Items();

                        console.log("Getting Email From...");
                    try {
                        var data = await Start.Search (request.body.item_id, from_fieldID, request.body.code,request.body.type, request.method)
                        var From = data[0].value;
                        console.log(From,"\n");
                    } catch (error) {
                        var From = "";
                        console.log(From,"\n");
                    }

                    try {
                        console.log("Getting priority...");
                        var data = await Start.Search (request.body.item_id, priority_fieldID, request.body.code,request.body.type, request.method)
                        var priority = data[0].value.text;
                        console.log(priority,"\n");

                    } catch (error) {
                        var priority = "";
                        console.log(priority,"\n");
                    }


                    try {
                        console.log('Getting title...');
                        var data = await Start.Search (request.body.item_id, title_fieldID, request.body.code,request.body.type, request.method)
                        var title = data[0].value;
                        console.log(title,"\n");
                    } catch (error) {
                        var title = "";
                        console.log(title,"\n");
                    }


                    console.log('Getting Email...');
                    try{
                        var strip = await Start.Search (request.body.item_id, emailrequest_fieldID, request.body.code,request.body.type,request.method)
                        if(strip === "skip"){
                            var strip = await Start.Search (request.body.item_id, emailrequest_fieldID, request.body.code,request.body.type,request.method)
                            var data = sanitizeHTML(strip[0].value)
                            var email = data.slice(0,300);
                            console.log(email,"\n");
                        }else{
                            var data = sanitizeHTML(strip[0].value)
                            var email = data.slice(0,300);
                            console.log(email,"\n");
                        }
                    }catch{
                        var email = "";
                    }

                    console.log('Getting Waiting on...');
                    try{
                        var waiting_on = await Start.Search (request.body.item_id, waitingON_fieldID, request.body.code,request.body.type,request.method)
                        if(waiting_on.length == 0){
                            var waiting_on = ""
                        }else {
                            try {
                                var waiting_on = waiting_on[0].value.name;
                            } catch (error) {
                                console.log(error);
                                var waiting_on = ""
                            }
                        }
                    }catch{
                        var waiting_on= "";
                    }
                    console.log(waiting_on,"\n");

                    console.log('Getting Assign to...');
                    try{
                        var assign_to = await Start.Search (request.body.item_id, assignTO_fieldID, request.body.code,request.body.type,request.method)
                        if(assign_to.length == 0){
                            var assign_to = ""
                        }else {
                            try {
                                var assign_to = assign_to[0].value.name;
                            } catch (error) {
                                console.log(error);
                                var assign_to = ""
                            }
                        }
                    }catch{
                        assign_to = "";
                    }
                    console.log(assign_to,"\n");

                    const getLink = await Start.Search(request.body.item_id, title_fieldID, request.body.code,request.body.type, 'LINK')
                    var link = getLink.link;
                    console.log(getLink);
                    console.log("Link search Result ", link);
                    

                try{
                    
                    const messageModify =   "==INDIA 27== \n"+
                                            "==Help Desk A2Q2/AteamHQ== \n"+
                                            "Priority: " + `${priority} \n`+
                                            "From: " + `${From} \n`+
                                            "Subject: " + `${title} \n` +
                                            `${link} \n\n` +
                                            `${email} \n\n` +
                                            "Waiting On: " + `${waiting_on}\n` +
                                            "Assigned To: " + `${assign_to}\n` +
                                            "Please action and status accordingly. Thank you. ";

                                    
                    console.log(messageModify);

                    var sent = await this.SendToSkype(messageModify)
                    console.log(sent);

                    }catch(err){
                        console.log(err);
                        console.log("Something Wrong");
                }
                break;
            }
        })();      
    }


    SendToSkype(email){
        return new Promise (resolve =>{
            const MemoryStorage = new builder.MemoryBotStorage();
            let memStorage =MemoryStorage;
            let connector = new builder.ChatConnector({
                appId: "0c5f5618-0b98-476f-8b56-2d3e3210d166",
                appPassword: "yhpwDXI19?;hqzTIJB309;{"
            })
            
            var sendBot = new builder.UniversalBot(connector).set('storage',memStorage);

            //Testing GC
            const oddTestingGc = 
            {
                "id":"1579657462094",
                "channelId":"skype",
                "serviceUrl":"https://smba.trafficmanager.net/apis/",
                    "conversation":
                    {
                        "isGroup":true,
                        "id":"19:4a0a7c7b2aa94600b1a560fbaec57b6f@thread.skype"
                    }
            }

            // HelpDesk Notification GC
            const HelpDesk = 
            {
                "id":"1582938996874",
                "channelId":"skype",
                "serviceUrl":"https://smba.trafficmanager.net/apis/",
                    "conversation":
                    {
                        "isGroup":true,
                        "id":"19:23618f6b0515405281f070ba668d6e76@thread.skype"
                    }
            }

            let msg = new builder.Message().address(HelpDesk)
            msg.text(email);
            try{
                sendBot.send(msg);
                resolve('Successfully Sent \n', email);
            }catch(err){
                resolve('Auth Error',err);
            }
        })
    }

    wait2Sec () {
        return new Promise(resolve=>{
            setTimeout(function () {
                resolve("go");
            },2000)
        })
    }
}




