import {Component} from 'react';
import {HTTP} from 'meteor/http'
import { loginUrl,client_id,client_secret,username,password,folder_id } from './soxhelper/helper';

export default class Main extends Component {

    constructor(
        setLoginUrl = loginUrl, setClient_Id = client_id, setClient_Secret = client_secret, setUserName = username, setPassword = password, setFolderId = folder_id
    ){
        super();
        this.setLoginUrl = setLoginUrl;
        this.setClient_Id = setClient_Id;
        this.setClient_Secret = setClient_Secret;
        this.setUserName = setUserName;
        this.setPassword = setPassword;
        this.setFolderId = setFolderId;
    }
    Scan(){
        return new Promise((resolve,reject)=>{
            HTTP.call('POST',this.setLoginUrl,{
                params: {
                    "grant_type": "password",
                    "client_id": this.setClient_Id,
                    "client_secret": this.setClient_Secret,
                    "username": this.setUserName,
                    "password": this.setPassword,
                },
                headers:{
                    'content-type': 'application/x-www-form-urlencoded',
                }
            },(error,response)=>{
                console.log("Login Success, Scanning Folder Now")
                if(response){
                    HTTP.call('GET',"https://a2q2.sf-api.com/sf/v3/Items("+`${this.setFolderId}`+")/Children?includeDeleted=false",{
                        params : {
                            "grant_type": "authorization_code",
                            "access_token": response.data.access_token,
                        },
                        headers: { 
                            'content-type': 'application/x-www-form-urlencoded',
                            'Host': 'a2q2.sf-api.com',
                            'Authorization': 'Bearer '+response.data.access_token
                        }
                    },(error, response)=>{
                        if(response){
                            console.log("Data Request Success!")
                            resolve(response)
                        }
                        else if(error){
                            console.log("Login was successfully executed but there's an error when accessing the folder");
                            resolve(1);
                        }
                    })
                }else if(error){
                    resolve(1)
                }
            })
        })
    }

    CreateDownloadLink(ItemId,Name){
        return new Promise((resolve,reject)=>{

            HTTP.call('POST',this.setLoginUrl,{
                params: {
                    "grant_type": "password",
                    "client_id": this.setClient_Id,
                    "client_secret": this.setClient_Secret,
                    "username": this.setUserName,
                    "password": this.setPassword,
                },
                headers:{
                    'content-type': 'application/x-www-form-urlencoded',
                }
            },(error, response)=>{
                console.log("Login Success, Creating Link Now")
                if(response){

                    var objectydata = { 
                        data: {
                            "grant_type": "authorization_code",
                            "access_token": response.data.access_token,
                            "ShareType":"Send", 
                            "Title":`${Name}`, 
                            "Items": [{ "Id":`${ItemId}` }], 
                            "Recipients":[ { "User": { "Id":"8112596b-92b5-46bd-9c79-4ac3095036f1" } }, { "User": { "Email": "earocha@a2bhq.com" } } ], 
                            "ExpirationDate": "9999-12-31", 
                            "RequireLogin": true, 
                            "RequireUserInfo": false, 
                            "MaxDownloads": -1, 
                            "UsesStreamIDs": false
                        }, 
                        headers: { 
                            'Content-Type':  'application/json',
                            'Host': 'a2q2.sf-api.com',
                            'Authorization': 'Bearer '+response.data.access_token,
                        }
                    }
                    HTTP.post('https://A2Q2.sf-api.com/sf/v3/Shares?notify=false',objectydata,function( error, response ) {

                        if ( error ) {
                            resolve( error );
                        } else {
                            resolve(response.data.Uri);
                        }
                    });
                
                }
            })
        })
    }

    IntervalTime(){
        return new Promise((resolve,reject)=>{  
            setTimeout(function(){
                resolve("Time interval executed")
            },30000)
        })
    }

    
}