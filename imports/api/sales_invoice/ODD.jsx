import {Component}  from 'react';
import builder from 'botbuilder';



export default class ODD extends Component {
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
            const  MARKGCTESTING =
            {
                "id":"1585845724825",
                "channelId":"skype",
                "serviceUrl":"https://smba.trafficmanager.net/apis/",
                    "conversation":
                    {
                        "isGroup":true,
                        "id":"19:d023e1178dc7446ca27d4f65b0414a89@thread.skype"
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

            let msg = new builder.Message().address(MARKGCTESTING)
            msg.text(email);
            try{
                sendBot.send(msg);
                resolve('Successfully Sent \n', email);
            }catch(err){
                resolve('Auth Error',err);
            }
        })
    }
}


