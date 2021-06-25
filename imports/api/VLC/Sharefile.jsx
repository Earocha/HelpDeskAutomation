import {Component} from 'react';
import {HTTP} from 'meteor/http'
import { loginUrl,client_id,client_secret,username,password } from '../helper/data'
export default class Main extends Component {
    constructor(
        setLoginUrl = loginUrl, setClient_Id = client_id, setClient_Secret = client_secret, setUserName = username, setPassword = password
    ){
        super();
        this.setLoginUrl = setLoginUrl;
        this.setClient_Id = setClient_Id;
        this.setClient_Secret = setClient_Secret;
        this.setUserName = setUserName;
        this.setPassword = setPassword;
    }
    GetIdByPath(path){
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
                    HTTP.call('GET',"https://A2Q2.sf-api.com/sf/v3/Items/ByPath?path="+`${path}`,{
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
                            console.log(response.data)
                            resolve(response.data.Id)
                        }
                        else if(error){
                            console.log("Login was successfully executed but there's an error when accessing the folder");
                            console.log(error)
                            resolve(1);
                        }
                    })
                }else if(error){
                    resolve(1)
                }
            })
        })

    }
}