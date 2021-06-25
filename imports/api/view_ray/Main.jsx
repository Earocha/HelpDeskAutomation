import { Component } from 'react';
import Podio_function from './Podio.jsx'
import sanitizeHTML from 'striptags';
import ODD from './ODD';

export default class Main extends Component {
	async Start(request){
		console.log(request.body);

		console.log("Item ID",request.body.item_id);
		console.log("Method ",request.method);
		console.log("TYPE ",request.body.type);
		console.log("Code ",request.body.code);
		console.log("Request Body ",request.body);


		switch(request.body.type){
			case 'hook.verify':
					var getPodioFunction = new Podio_function();
					var startcode = await getPodioFunction.GetRequest(request,request.body.hook_id,request.body.code);
					console.log(startcode)
			break;

			case 'item.create':

					var getPodioFunction = new Podio_function();
					var startcode = await getPodioFunction.GetRequest(request,request.body.item_id,"No code Required");
                    console.log(startcode)
                    
                    var Subject = "No title added"
                    var Client = "ViewRay | A2BHQ"
                    var Link = startcode.link;
                    var WaitingOn = "";
                    var AssignedTo = "";
                    var Email = "";

					for(var i = 0; i < startcode.fields.length; i++){
						console.log(startcode.fields[i].label)
						if(startcode.fields[i].label === "OAI Title"){
                            Subject = startcode.fields[i].values[0].value;
                        }
                        if(startcode.fields[i].label === "Assigned To"){
                            AssignedTo = startcode.fields[i].values[0].value.name;
                        }
                        if(startcode.fields[i].label === "Waiting On"){
                            WaitingOn = startcode.fields[i].values[0].value.name
                        }
                        if(startcode.fields[i].label === "Email Request"){
                            var data = sanitizeHTML(startcode.fields[i].values[0].value)
                            Email = data.slice(0,300);
						}
					}

                    const message = "==VIEW RAY OAI EMAIL==" + "\nClient: " + Client + "\nSubject: " + Subject + "\nLink: " + Link + "\n\n" + Email + "\n\nWaiting On:" + WaitingOn + "\nAssigned To: "+AssignedTo + "\nPlease action and status accordingly. Thank you."
                    
                   console.log(message);

                   var getODD = new ODD();
                   var executeODD = await getODD.SendText(message)
                   console.log(executeODD)

			break;

			case 'item.update':
					var getPodioFunction = new Podio_function();
					var startcode = await getPodioFunction.GetRequest(request,request.body.item_id,"No code Required");
					console.log(startcode)
			break;
		}
	} 
}