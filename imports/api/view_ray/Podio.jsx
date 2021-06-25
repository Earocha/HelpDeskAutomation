import {Component} from 'react';
import { api as PodioApi } from 'podio-js';


export default class PodioFunction extends Component {

	constructor(appId = 24617483, appToken = '41d3626cad5541c2b9a50c1402ebde2f'){
        super();
        this.appId = appId;
        this.appToken = appToken;
	}
	
	GetRequest(request,ID,hook_code){
		return new Promise((resolve,reject)=>{
			const podio = new PodioApi ({
				authType: 'client',
				clientId: 'ateam-a2q2',
				clientSecret: 'uo28vIdefJ1lMrPVLjPXYv5HiGfFOwppDXRAh4grBrSFewgDvSgX9R1bzF1Hiaku'
			});
			if(request.body.type === 'hook.verify'){
				podio.authenticateWithApp(this.appId,this.appToken, (err) => {
					const option = {
						code: hook_code
					}
					const response = podio.request('POST', `hook/${ID}/verify/validate`, option,
						function(back) {
							console.log(back);
						}).catch(err => console.log(err));
					resolve(response);
				});
			}
			if(request.body.type === 'item.create'){
				
				podio.authenticateWithApp(this.appId, this.appToken, (err)=>{
					const response = podio.request('GET', `item/${ID}`, function(back){ 
						console.log(back);
					}).catch(err => console.log(err));
					resolve(response);
				});
			}
			if(request.body.type === 'item.update'){
				podio.authenticateWithApp(this.appId, this.appToken, (err)=>{
					const response = podio.request('GET', `item/${ID}`,function(back){ 
						console.log(back);
					}).catch(err => console.log(err));
					resolve(response);
				});
			}
		})
	}

} 
