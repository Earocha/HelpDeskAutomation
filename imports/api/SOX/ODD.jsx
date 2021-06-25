import builder from 'botbuilder';
import { Component } from 'react';
import {MarkAddressTesting} from './soxhelper/helper'



export default class Main extends Component{

    SendToSkype(message){
        return new Promise ((resolve,reject)=>{
            const MemoryStorage = new builder.MemoryBotStorage();
            let memStorage =MemoryStorage;
            let connector = new builder.ChatConnector({
                appId: "0c5f5618-0b98-476f-8b56-2d3e3210d166",
                appPassword: "yhpwDXI19?;hqzTIJB309;{"
            })
            
            var sendBot = new builder.UniversalBot(connector).set('storage',memStorage);    

            let msg = new builder.Message().address(MarkAddressTesting)
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