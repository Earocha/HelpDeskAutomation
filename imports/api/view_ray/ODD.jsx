import {Component} from  'react';
import builder from 'botbuilder';

export default class ODD extends Component {
  SendText (email){
    return new Promise((resolve,reject)=>{
        const MemoryStorage = new builder.MemoryBotStorage();
            let memStorage =MemoryStorage;
            let connector = new builder.ChatConnector({
                appId: "0c5f5618-0b98-476f-8b56-2d3e3210d166",
                appPassword: "yhpwDXI19?;hqzTIJB309;{"
            })
            
            var sendBot = new builder.UniversalBot(connector).set('storage',memStorage);

            const markTesting = 
            {"id":"1596076177638","channelId":"skype","serviceUrl":"https://smba.trafficmanager.net/apis/","conversation":{"isGroup":true,"id":"19:d023e1178dc7446ca27d4f65b0414a89@thread.skype"}}
            const viewray = {"id":"1596483018263","channelId":"skype","serviceUrl":"https://smba.trafficmanager.net/apis/","conversation":{"isGroup":true,"id":"19:06ebb020cc39422e8c70a9e19d9dc308@thread.skype"}}
            let msg = new builder.Message().address(viewray)
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