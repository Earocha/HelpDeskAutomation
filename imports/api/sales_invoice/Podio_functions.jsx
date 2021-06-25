import { api as PodioApi } from 'podio-js';
import { Component } from 'react';

export default class Podio_Start extends Component{

    constructor(appID = 24467641, appToken = 'a69c8929ea51451aac34098723049d93') {
        super();
        this.appId = appID;
        this.appToken = appToken;
    }
    Search(item_id, codeOrItemID, type, method) {
        return new Promise(resolve=>{
            const podio = new PodioApi ({
                authType: 'client',
                clientId: 'salesinvoice2',
                clientSecret: 'eXyvvGg4VuBrCKZ7QPZkDmermApYjkrY3ClZufDPcpjteVq6eOYRw8ngrLVepB24'
            });
            switch(method){
                case 'POST':
                    if(type == 'hook.verify'){
                        var hook_id = item_id;
                        podio.authenticateWithApp(this.appId, this.appToken, (err)=>{
                            const option ={
                                code: codeOrItemID
                            }
                            const response = podio.request('POST', `hook/${hook_id}/verify/validate`,option,
                            function(back){ 
                                console.log(back);
                            }).catch(err => console.log(err));
                            resolve(response);
                        });
                }else if (type == 'item.update'){
                                try {
                                    podio.authenticateWithApp(this.appId, this.appToken, (err)=>{
                                        const response = podio.request('GET', `item/${item_id}`,
                                        function(back){ 
                                            console.log(back);
                                        }).catch(err => console.log(err));
                                        resolve(response);
                                    });
                            }catch{
                                resolve("skip");
                            }     
                         
                        }else if (type == 'item.create'){
                            try {
                                podio.authenticateWithApp(this.appId, this.appToken, (err)=>{
                                    const response = podio.request('GET', `item/${item_id}`,
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
    getPodioItem(){
        return new Promise(resolve=>{
            const podio = new PodioApi ({
                authType: 'client',
                clientId: 'salesinvoice-e8tnx8',
                clientSecret: 'fFxk5b8u93ag2e1xh5hQokgiTuWiFIY3LXFFxqlyUfXfQISFgWcq7wYSQSWaXxp4'
            });
            podio.authenticateWithApp(this.appId, this.appToken, (err) => {
                if (err) throw new Error(err);
                resolve(podio.request('POST', `/item/app/${this.appId}/filter/`, function(response) {
                    console.log('resolved', response);
                }).catch(err => console.log(err)));
            });
        })
    } 

}