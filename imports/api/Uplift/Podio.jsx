import React, {Component} from 'react'
import {PodioSyncAuthApi,upliftId,upliftToken} from '../helper/data'

export default class Podio extends Component{
    constructor(PodioClientAuth = PodioSyncAuthApi, Id= upliftId, Token = upliftToken){
        super();
        this.PodioClientAuth = PodioClientAuth;
        this.upliftId = Id;
        this.upliftToken = Token;
    }

    VerifyPodio(ID,Hook_Code){
        return new Promise((resolve,reject)=>{
            this.PodioClientAuth.authenticateWithApp(this.upliftId, this.upliftToken, (error)=>{
                if(error) reject(error)
                const option = {code: Hook_Code}
                const podiorES = this.PodioClientAuth.request('POST',`hook/${ID}/verify/validate`, option,(response)=>{
                    console.log(response);
                }).catch(error => reject(error));

                resolve(podiorES);
            })
        })
    }
    PodioUpdate(ID){
        return new Promise((resolve,reject)=>{
            this.PodioClientAuth.authenticateWithApp(this.upliftId,this.upliftToken,(error)=>{
                if(error) reject(error)
                
                const result = this.PodioClientAuth.request('GET', `item/${ID}`, (response)=>{
                    console.log(response)
                }).catch(error => reject(error))

                resolve(result);
                
            })
        })
    }
}