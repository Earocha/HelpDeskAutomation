import { Component } from 'react';
import Podio_code from '../sales_invoice/Podio_functions.jsx'
import ODD from '../sales_invoice/ODD.jsx'
import { api as PodioApi } from 'podio-js';
import datetimeDifference from "datetime-difference";
import nodeHtmlToImage from 'node-html-to-image';
var fs = Npm.require('fs');
import builder from 'botbuilder';
export default class Sales extends Component {
    constructor(appID = 24467641, appToken = 'a69c8929ea51451aac34098723049d93') {
        super();
        this.appId = appID;
        this.appToken = appToken;
    }
    async start(request){
        console.log(request.body.type);
        (async () => {
            switch(request.body.type){

                case 'hook.verify':
                    var verify = new Podio_code();
                    var response = await verify.Search(request.body.hook_id ,request.body.code,request.body.type, request.method);  
                    console.log(response);
                break;

                case 'item.update':

                    var data = await this.getDinalData(request.body.item_id)
                    var check_change = 0;
                    var i = 0;
                    while(data.fields.length > i){
        
                        if(data.fields[i].label === "Status"){
        
                            var setStatus = data.fields[i].values[0].value.text;
        
                            console.log(setStatus)
                            if(setStatus === "Paid"){
                                check_change = 1;
                            }else{
                                check_change = 0;
                            }
                
                        }
                        if(data.fields[i].label === "Customer Name"){
                                console.log(data.fields[i].values[0].value)
                                var setCustomerName = data.fields[i].values[0].value;
                                if(setCustomerName === undefined){
                                    setCustomerName = "No Customer name"
                                }
                        }
                    
        
                        i++
                    }

                if(check_change === 1){
                        
                        console.log("STATUS CHANGED TO PAID");
                    

                    var verify = new Podio_code();
                    var getItem = await verify.getPodioItem(request)

                    var todayDate = new Date().toISOString().slice(0, 10);

                    var monday = 1;
                    var tuesday = 2;
                    var wednesday = 3;
                    var thursday = 4;
                    var friday = 5;
                    var saturday = 6;
                    var sunday = 7;
                
                    var row = "";
                
                    for(var x = 0; x < getItem.items.length; x++){
                        var DueDate = await this.getDueDate(getItem.items[x].item_id);
                        var datefrompodio = new Date(DueDate[0].start_utc);
                        const datedif = datetimeDifference(datefrompodio,new Date(todayDate));
                
                        console.log("Date from Podio ",DueDate[0].start_utc)
                        console.log("Date Today ",todayDate)

                        var sale_info = await this.finalizeData(getItem.items[x].item_id)
                        console.log(sale_info);
        
                        var message = "===INDIA 27===" + "\n" +
                        "Sales Invoice Tracker" +"\n" +
                        new Date().toLocaleString() +"\n" +
                        "Customer Name: " + sale_info[0].name+ "\n" +
                        "Invoice Number: " + sale_info[1].invoice_number+ "\n" +
                        "Invoice Amount: " + sale_info[2].invoice_ammount+ "\n" +
                        "Due Date: " + sale_info[3].due_date+ "\n" +
                        "Status: " + sale_info[4].status+ "\n" +
                        "Link: " +  getItem.items[x].link+ "\n";
        
                        console.log(message)
        
                        var add_str = "<tr>" +
                        "<td>" + sale_info[0].name + "</td>" +
                        "<td>" + sale_info[1].invoice_number + "</td>" +
                        "<td>" + sale_info[2].invoice_ammount + "</td>" +
                        "<td>" + sale_info[3].due_date + "</td>" +
                        "<td>" + sale_info[4].status + "</td>" +
                        "</tr>"
        
                        row += add_str;
                       
                        console.log("==================================");
                    }

                    let title = "**Sales Invoice - Tracker** \n"+ "Customer changed to PAID"+`${setCustomerName}`+"\n "
                    "https://podio.com/a2q2com/flashpoint/apps/sales-invoice-tracker";
                
                    var html = await this.generateImage(row);
                    console.log(html);
                    var imageconverted = await this.convertingImage(html);
                    console.log(imageconverted);
                    
                    //Testing GC
                    const  MARKGCTESTING ={"id":"1585845724825", "channelId":"skype","serviceUrl":"https://smba.trafficmanager.net/apis/", "conversation":{"isGroup":true,"id":"19:d023e1178dc7446ca27d4f65b0414a89@thread.skype"}}

                    const Flashpoint = {"id":"1589585837868","channelId":"skype","serviceUrl":"https://smba.trafficmanager.net/apis/","conversation":{"isGroup":true,"id":"19:b3a353ace0044b568081a69d550379f4@thread.skype"}}

                    var sent = await this.sendTitle(title,MARKGCTESTING);
                    console.log(sent)
                
                    var sent = await this.SendToSkype(MARKGCTESTING);
                    console.log(sent)

                }else{
                    console.log("Status not changed to paid");
                }

                break;

                case 'item.create':
                    
                    console.log("waitring for datas");
                    var waitfor = await this.wait2sec();
                    console.log(waitfor);

                    var getData = await this.initializedata(request)
                    console.log(getData)
                break;
                   
            }
        })();
    }

    initializedata (request){
        return new Promise (resolve=>{
            (async () => {
            var strt = new Podio_code();
                var result = await strt.Search(request.body.item_id, request.body.code,request.body.type, request.method);
                try {
                    var customer = result.fields[0].values[0].value;
                } catch (error) {
                    customer = "No data provided";
                }

                try {
                    var email_contact = result.fields[1].values[0].value;
                } catch (error) {
                    email_contact = "No data provided";
                }

                try {
                    var invoice_number = result.fields[2].values[0].value;
                } catch (error) {
                    invoice_number = "No data provided";
                }

                try {
                    var invoice_amount = Math.floor(result.fields[3].values[0].value);
                } catch (error) {
                    invoice_amount =  "No data provided";
                }

                try {
                    var due_date = result.fields[4].values[0].start_date_utc;
                } catch (error) {
                    due_date =  "No data provided";
                }

                try {
                    var status = result.fields[5].values[0].value.text;
                } catch (error) {
                    status =  "No data provided";
                }

                try {
                    var monitored_by = result.fields[6].values[0].value.title;
                } catch (error) {
                    monitored_by =  "No data provided";
                }

                try {
                    var date_monitored = result.fields[7].values[0].start_date_utc;
                } catch (error) {
                    date_monitored =  "No data provided";
                }

                try {
                    var link = result.link;
                } catch (error) {
                    link =  "No data provided";
                }
                
                var message = "===INDIA 27===" + "\n" +
                "Sales Invoice Tracker" +"\n" +
                new Date().toLocaleString() +"\n" +
                "Customer Name: " + customer+ "\n" +
                "Invoice Number: " + invoice_number+ "\n" +
                "Invoice Amount: " + invoice_amount+ "\n" +
                "Due Date: " + due_date+ "\n" +
                "Status: " + status+ "\n" +
                "Link: " + link+ "\n";

                var setODD = new ODD();
                var send = setODD.SendToSkype(message);
                resolve(send);
            })();
        })
    }

    generateImage (row) {
        return new Promise(resolve => {
            var html = "<table width='775'>" +
                "<tbody>" +
                "<tr width='155' height='50' bgcolor='Green' style='color:white;font-family:verdana'>" +
                "<th colspan='7'>Sales Invoice Tracker<br>" + new Date().toLocaleString() + "</th>" +
                "</tr>" +
                "<tr bgcolor='red' style='color:white;font-family:verdana'>" +
                "<td>Customer Name</td>" +
                "<td>Invoice Number</td>" +
                "<td>Invoice Amount</td>" +
                "<td>Due Date</td>" +
                "<td>Status</td>" +
                "</tr>" +
                `${row}` +
                "</tr>" +
                "</tbody>" +
                "</table>";
            resolve(html);
    
        })
    }
    
    convertingImage(data) {
        return new Promise(resolve => {
            nodeHtmlToImage({
                output: 'C:/Users/Eveguel/Desktop/automation/HELP-DESK-AUTOMATION/imports/api/sales_invoice/image/sales_invoice.png',
                html: data,
            }).then(() => resolve(1))
        })
    }
    sendTitle(title,address) {
        return new Promise(resolve => {
            const MemoryStorage = new builder.MemoryBotStorage();
            let memStorage =MemoryStorage;
            let connector = new builder.ChatConnector({
                appId: "0c5f5618-0b98-476f-8b56-2d3e3210d166",
                appPassword: "yhpwDXI19?;hqzTIJB309;{"
            })
            
            var SendBot = new builder.UniversalBot(connector).set('storage', memStorage);

            let msg = new builder.Message().address(address);
            msg.text(title)
    
            try {
                SendBot.send(msg);
                resolve('Message sent');
            } catch (error){
                resolve("Notification Error:", error)
            }
        })
    }
    SendToSkype(address){
        return new Promise (resolve =>{
            const MemoryStorage = new builder.MemoryBotStorage();
            let memStorage =MemoryStorage;
            let connector = new builder.ChatConnector({
                appId: "0c5f5618-0b98-476f-8b56-2d3e3210d166",
                appPassword: "yhpwDXI19?;hqzTIJB309;{"
            })
            
            var SendBot = new builder.UniversalBot(connector).set('storage', memStorage);

            var imageData = fs.readFileSync('C:/Users/Eveguel/Desktop/automation/HELP-DESK-AUTOMATION/imports/api/sales_invoice/image/sales_invoice.png');
            const base64Image = Buffer.from(imageData).toString('base64');
            var image = {
                name: 'architecture-resize.png',
                contentType: 'image/png',
                contentUrl: `data:image/png;base64,${ base64Image }`
            }
            let msg = new builder.Message().address(address);
            msg.addAttachment(image)
    
            try {
                SendBot.send(msg);
                resolve('Message sent');
            } catch (error){
                console.log(error)
                resolve("Notification Error:", error)
            }
        })
    }
    finalizeData(item_id){
        return new Promise(resolve=>{
            (async () => {
                var sales_data = [];
                var i = 0;
                var data = await this.getDinalData(item_id)

                while(data.fields.length > i){
                    
                    if(data.fields[i].label === "Customer Name"){

                            console.log(data.fields[i].values[0].value)
                            
                            try {
                                var setCustomerName = data.fields[i].values[0].value;
                
                                sales_data.push({'name':setCustomerName})
                
                            } catch (error) {
                                setCustomerName = "No Customer Name Added";
                                
                                sales_data.push({'name':setCustomerName})
                            }
                        
                    }
                    
                    if(data.fields[i].label === "Invoice Number"){

                            console.log(data.fields[i].values[0].value)
                            
                            try {
                                var InvoiceNumber = data.fields[i].values[0].value;
                
                                sales_data.push({'invoice_number':InvoiceNumber})
                
                            } catch (error) {
                                InvoiceNumber = "No Invoice Number Added";
                                
                                sales_data.push({'invoice_number':InvoiceNumber})
                            }
                        
                    }
                    if(data.fields[i].label === "Invoice Amount"){

                        try {
                            var setInvoiceAmount = data.fields[i].values[0].value;
            
                            sales_data.push({'invoice_ammount':Math.floor(setInvoiceAmount)})
            
                        } catch (error) {
                            setInvoiceAmount = "No Invoice Amount Added";
                            
                            sales_data.push({'invoice_ammount':Math.floor(setInvoiceAmount)})
                        }

                    }

                    if(data.fields[i].label === "Due Date"){
                        try {
                            var setDueDate = data.fields[i].values[0].start_utc;
            
                            sales_data.push({'due_date':setDueDate})
            
                        } catch (error) {
                            setInvoiceAmount = "No Due Date Added";
                            
                            sales_data.push({'due_date':setDueDate})
                        }
                    }
                    if(data.fields[i].label === "Status"){
                        try {
                            var setStatus = data.fields[i].values[0].value.text;
                           sales_data.push({'status':setStatus})
            
                        } catch (error) {
                            setStatus = "No Status Added";
                            
                            sales_data.push({'status':setStatus})
                        }
                    }

                    i++
                }
                resolve(sales_data);
            })();
        })
    }
    getDueDate (item_id){
        return new Promise (resolve=>{
            
            const podio = new PodioApi ({
                authType: 'client',
                clientId: 'salesinvoice-e8tnx8',
                clientSecret: 'fFxk5b8u93ag2e1xh5hQokgiTuWiFIY3LXFFxqlyUfXfQISFgWcq7wYSQSWaXxp4'
            });
            var field_id = 206433230;
            podio.authenticateWithApp(this.appId, this.appToken, (err) => {
                if (err) throw new Error(err);
                resolve(podio.request('GET', `/item/${item_id}/value/${field_id}`, function(response) {
                    console.log('resolved', response);
                }).catch(err => console.log(err)));
            });
        })
    }
    getDinalData (item_id,field_id){
        return new Promise (resolve=>{
            const podio = new PodioApi ({
                authType: 'client',
                clientId: 'salesinvoice-e8tnx8',
                clientSecret: 'fFxk5b8u93ag2e1xh5hQokgiTuWiFIY3LXFFxqlyUfXfQISFgWcq7wYSQSWaXxp4'
            });
            podio.authenticateWithApp(this.appId, this.appToken, (err) => {
                if (err) throw new Error(err);
                resolve(podio.request('GET', `/item/${item_id}/`, function(response) {
                    console.log('resolved', response);
                }).catch(err => console.log(err)));
            });
        })
    }
    wait2sec (){
        return new Promise(resolve=>{
            setTimeout(function () {
                resolve("go");
            },3000)
        })
    }

}
