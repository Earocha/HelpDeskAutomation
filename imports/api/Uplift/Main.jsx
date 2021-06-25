import React, {Component} from 'react'
import PodioInstance from './Podio'
import striptags from 'striptags'
import Skype from './Skype'
import nodemailer from 'nodemailer';

export default class Main extends Component {
    constructor(Podio = new PodioInstance, GetSkype = new Skype){
        super();
        this.Podio = Podio;
        this.Skype= GetSkype;
    }
    async Start(request){
        switch(request.body.type){

            case 'hook.verify':
                    let Gohook = await this.Podio.VerifyPodio(request.body.hook_id,request.body.code)
                    console.log("Hook Verify Result =>", Gohook)
            break;
            case 'item.update':
            case 'item.create':
                    let Data = await this.Podio.PodioUpdate(request.body.item_id)
                    let OrgData = await this.OrganizeData(Data);
                    console.log(OrgData)

                 try {
                    let transporter = nodemailer.createTransport({
                    host: "smtp-mail.outlook.com",
                    port: 587,
                    secure: false, 
                        auth: {
                        user: 'uplift@a2q2.com',
                        pass: 'Explode2021!#', 
                        },
                    });
                
                    let info = await transporter.sendMail({
                        from: '"Uplift PA" <uplift@a2q2.com>', // sender address
                        to: OrgData.Email, // list of receivers
                        subject: "Uplift PA Ticket", // Subject line
                        //text: "", // plain text body
                        html: "<p>Hi,</p> <br><br>Good day! <br>Thank you for submitting your ticket. We will make sure to address it accordingly.<br><br><br> We will reach out to you if we have questions or concerns.<br><br> <br> Best regards,  <br> <strong>Adrian Balderosa</strong>", // html body
                    });
                    console.log(info);
                    

                    var Message = "New Uplift - SASI Ticket" + "\n" + 
                        "Create OAI: " + OrgData.Oai  +"\n" +
                        "Name of the Requestor: " + OrgData.Requestor  +"\n" +
                        "Date: " + OrgData.Date  +"\n" +
                        "Report Name: " + OrgData.ReportName  +"\n" +
                        "Reason: " + OrgData.Reason  +"\n" +
                        "Description: " + OrgData.Description  +"\n" +
                        "Instructions on how to approach the error: " + OrgData.Instructions  +"\n" +
                        "Screenshot: " + OrgData.Screenshot.toString().replace(/,/g, "\n") +"\n" +
                        "Link: "  + OrgData.Link

                    }catch{
                        var Message = "New Uplift - SASI Ticket" + "\n" + 
                        "Create OAI: " + OrgData.Oai  +"\n" +
                        "Name of the Requestor: " + OrgData.Requestor  +"\n" +
                        "Date: " + OrgData.Date  +"\n" +
                        "Report Name: " + OrgData.ReportName  +"\n" +
                        "Reason: " + OrgData.Reason  +"\n" +
                        "Description: " + OrgData.Description  +"\n" +
                        "Instructions on how to approach the error: " + OrgData.Instructions  +"\n" +
                        "Screenshot: " + OrgData.Screenshot.toString().replace(/,/g, "\n") +"\n" +
                        "Link: "  + OrgData.Link+"\n" +
                        "NOTE: Email Response did not sent , cannot detect email sender on podio"
                    
                    }

                
                console.log(Message);
                this.Skype.Send(Message);

            break;
            case 'file.change':
                  
            break;

        }
    }
    OrganizeData(Data){
        return new Promise((resolve,reject)=>{
            let Oai = "";
            let Requestor = "";
            let Date = "";
            let ReportName = "";
            let Reason = "";
            let Description = "";
            let Instructions = "";
            let Email = "";
            let Screenshot = []
            for(let i in Data.fields){
                switch(Data.fields[i].label){
                    case 'Create OAI':
                        Oai = Data.fields[i].values[0].value.text;
                    break;
                    case '1. Name of the Requestor':
                        Requestor = Data.fields[i].values[0].value.text;
                    break;
                    case '2. Date':
                        Date = Data.fields[i].values[0].start_date
                    break;
                    case '3. Report Name':
                        ReportName = Data.fields[i].values[0].value.text
                    break;
                    case '4. Reason':
                        Reason = Data.fields[i].values[0].value.text
                    break;
                    case '5. Description':
                        Description = striptags(Data.fields[i].values[0].value)
                    break;
                    case '6. Instructions on how to approach the error':
                        Instructions = striptags(Data.fields[i].values[0].value)
                    break;
                    case '7. Screenshot':
                        for(var x in Data.fields[i].values){
                            Screenshot.push(Data.fields[i].values[x].value.link);
                        }
                    break;
                    case 'Email':
                        console.log(Data.fields[i].values[0].value);
                        Email = striptags(Data.fields[i].values[0].value)
                    break;
                }
            }
            resolve({
                "Oai":Oai, 
                "Requestor":Requestor, 
                "Date":Date, 
                "ReportName":ReportName, 
                "Reason":Reason, 
                "Description":Description, 
                "Instructions":Instructions, 
                "Screenshot":Screenshot, 
                "Link":Data.link,
                "Email":Email
            })
        })
    }
}
/*

*/