import React, { Component } from 'react'
import SharefileFunction from './Sharefile'
import moment from 'moment'
import PodioFunction from './Podio'
import ODDFunction from './ODD'

export default class Main extends Component{

    async Start(){
        var itemsid = [];
        var itemsname = [];
        var newItemID = [];
        var newItemNAME = [];
            
            var Start = new SharefileFunction();

            if(await Start.IntervalTime()){
            
                var res = await Start.Scan();
                console.log(res);

                //get all items on folder
                for(var x = 0; x < res.data.value.length; x++){
                                
                    var name = res.data.value[x].Name;
                    var id = res.data.value[x].Id;
                    itemsid.push(id)
                    itemsname.push(name)
                     
                }

                
                for(var i = 0 ; i < 1; i++){

                    if(await Start.IntervalTime()){
                        var checknew = await Start.Scan();
                        //compare new scan to old scan
                        for(let i in checknew.data.value){ 

                            if(itemsid.includes(checknew.data.value[i].Id) === false){
                                var name = checknew.data.value[i].Name;
                                var id = checknew.data.value[i].Id;
                                newItemID.push(id)
                                newItemNAME.push(name)
                                console.log("New Item found added on the array");
                            }
                        

                            //next step after scanning
                            if(newItemID.length > 0){
                                for(let z in newItemID){
                                    var NewIdScanned = newItemID[z]
                                    var NewNameScanned = newItemNAME[z]
                                    var today = new Date();
                                    var date = moment(today).format('YYYY-MM-DD HH:MM:ss');

                                    var link = await Start.CreateDownloadLink(NewIdScanned,NewNameScanned)
                                    console.log("Data Scanned ===>", NewIdScanned, NewNameScanned, date, link)

                                    var SetPodioCreate = new PodioFunction();
                                    var createItem = await SetPodioCreate.CreateItemPodio(NewIdScanned, NewNameScanned, date, link)

                                    if(createItem === 1 ){
                                        console.log("ERROR CREATING PODIO ITEM");
                                    }else{

                                        for(let odd in createItem.fields){
                                            if(createItem.fields[odd].label === "Item Name"){

                                            var name =  createItem.fields[odd].values[0].value

                                            }       
                                            if(createItem.fields[odd].label === "Sharefile Link"){
                                                
                                            var sfLink = createItem.fields[odd].values[0].embed.url;
                                                
                                            }
                                            if(createItem.fields[odd].label === "Date Added"){
                                                
                                            var date_added = createItem.fields[odd].values[0].start_date;
                                                
                                            }
                                        }

                                        let message = "==SOX Questionaire Tracker==" + "\n File Name: " + name + "\nSharefile Link: " + sfLink + "\nPodio Link:" + createItem.link + "\nDate added: " + date_added

                                        var setODD = new ODDFunction()

                                        var sent =  await setODD.SendToSkype(message)
                                        console.log(sent);
                                    }
                                    itemsid.push(newItemID[z])
                                    itemsname.push(newItemNAME[z])
                                    newItemID = [];
                                    newItemNAME = [];
                                }
                            }

                        }
                    }
                i--;
            }
        }
    }
}