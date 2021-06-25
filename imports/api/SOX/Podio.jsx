import {Component} from 'react';
import {api as PodioAPI} from 'podio-js';
import { podioAppId,podioAppToken } from './soxhelper/helper';

export default class Main extends Component{

    constructor(appId = podioAppId, appToken = podioAppToken){
        super();
        this.appId = appId;
        this.appToken = appToken;
    }

    CreateItemPodio(NewIdScanned, NewNameScanned, date, link){
        return new Promise((resolve,rejcet)=>{
            const podio = new PodioAPI({
                authType: 'client',
                clientId: 'sox-questionaire-tracker',
                clientSecret: 'Y7TjVCMYWGAzNJOcQouM3zagQJGXfMekvcXZ3d05SviI44zedcCMmMV6ludmo6zv'
            });

            podio.authenticateWithApp(this.appId, this.appToken, (err) => {
                if (err) throw new Error(err);
                podio.isAuthenticated().then(() => {
                    var Item =  {
                        "external_id": "title",
                        "external_id": "sharefile-link",
                        "external_id": "date-added",
                        "fields" : {
                            212588726: NewNameScanned,
                            212588730: { 'url': link},
                            212588729:{"start":date,"end":date}, 
                        }
                    }
                        const newitem = podio.request('POST', `/item/app/${this.appId}`, Item, function(response) {
                            console.log('Hey there', response);
                        }).catch(err => console.log(err));
                    resolve(newitem);
                
                }).catch(err => resolve(1));
            });

        })
    }

  
}