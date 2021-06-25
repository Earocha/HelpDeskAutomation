import {Component} from 'react'
//import builder from 'botbuilder';
const  builder = require('botbuilder');

export default class Main extends Component {
    Send(message){
        return new Promise((resolve,reject)=>{
            let TestAddress = {"id":"1607018710527","channelId":"skype","serviceUrl":"https://smba.trafficmanager.net/apis/","conversation":{"isgroup":true,"id":"19:4b2016cc2141445b86d5568949be1cbf@thread.skype"}}

            const MemoryStorage = new builder.MemoryBotStorage();
            let memStorage =MemoryStorage;


            let connector = new builder.ChatConnector({
                appId: "0c5f5618-0b98-476f-8b56-2d3e3210d166",
                appPassword: "yhpwDXI19?;hqzTIJB309;{"
            })
            
            var sendBot = new builder.UniversalBot(connector).set('storage',memStorage);
            let msg = new builder.Message().address(TestAddress)
            msg.text(message);
            try{
                sendBot.send(msg);
                resolve('Successfully Sent \n', message);
            }catch(err){
                resolve('Auth Error',err);
            }
        })
    }
}