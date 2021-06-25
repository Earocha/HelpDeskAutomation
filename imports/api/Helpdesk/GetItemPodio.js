import { api as PodioApi } from 'podio-js';
import { Component } from 'react';

export default class GetItemPodio extends Component {

    constructor(appId = 10409656, appToken = '075cc6ccae5b4e0dbc0970ecf54e04b4'){
        super();
        this.appId = appId;
        this.appToken = appToken;
    }
    Search(item_id, field_id, codeOrItemID, type, method) {
        return new Promise(resolve=>{
            const podio = new PodioApi ({
                authType: 'client',
                clientId: 'ateam-a2q2',
                clientSecret: 'uo28vIdefJ1lMrPVLjPXYv5HiGfFOwppDXRAh4grBrSFewgDvSgX9R1bzF1Hiaku'
            });
            switch(method){
                case 'POST':
                    if(type == 'hook.verify'){
                        podio.authenticateWithApp(this.appId,this.appToken, (err) => {
                            const option = {
                                code: codeOrItemID
                            }
                            const response = podio.request('POST', `hook/${item_id}/verify/validate`, option,
                                function(back) {
                                    console.log(back);
                                }).catch(err => console.log(err));
                            resolve(response);
                        });
                    }else if (type == 'item.create'){
                                try {
                                    podio.authenticateWithApp(this.appId, this.appToken, (err)=>{
                                        const response = podio.request('GET', `item/${item_id}/value/${field_id}`,
                                        function(back){ 
                                            console.log(back);
                                        }).catch(err => console.log(err));
                                        resolve(response);
                                    });
                            }catch{
                                resolve("skip");
                            }     
                        }               
                break;
                case 'LINK':
                     podio.authenticateWithApp(this.appId, this.appToken, (err)=>{
                            const response = podio.request('GET', `item/${item_id}`,
                            function(back){ 
                                console.log(back);
                            }).catch(err => console.log(err));
                            resolve(response);
                        });
                break;
            }
        })
    }
}