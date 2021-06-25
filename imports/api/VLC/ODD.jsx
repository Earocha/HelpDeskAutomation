import {Component} from 'react'
import builder from 'botbuilder'
import data from '../helper/data'
export default class Main extends Component{
    constructor(TestGC = data.TestGC){
        super();
        this.TestGC = TestGC;
    }
    Send(Message){
        return new Promise((resolve,reject)=>{
            const MemoryStorage = new builder.MemoryBotStorage();
            let memStorage = MemoryStorage;
            let connector = new builder.ChatConnector({
                appId: "0c5f5618-0b98-476f-8b56-2d3e3210d166",
                appPassword: "yhpwDXI19?;hqzTIJB309;{"
            })
            var sendBot = new builder.UniversalBot(connector).set('storage',memStorage);
            var SasiTest = {"id":"1611938936726","channelId":"skype","serviceUrl":"https://smba.trafficmanager.net/apis/","conversation":{"isgroup":true,"id":"19:b1af884605d24a54ac3f53e4542ffa7c@thread.skype"}}

            let msg = new builder.Message().address(SasiTest)
            msg.text(Message)

            try {
                sendBot.send(msg);
                resolve("Successfully Sent \n",email);
            } catch (error) {
                return ("ODD Error", error);   
            }
        })
    }   
}