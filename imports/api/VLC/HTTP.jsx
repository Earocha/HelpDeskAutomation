import {Component} from 'react'
import { HTTP } from  'meteor/http';
export default class Main extends Component {
    HTTPPOST(screenshotfolder,pathlocal,videName,savedSF,dateToday){
        return new Promise((resolve,reject)=>{
            try {
                var body = {
                    data : {
                        "screenshotfolder":screenshotfolder,
                        "pathlocal": pathlocal,
                        "videoName":videName,
                        "savedSF":savedSF,
                        "dateToday":dateToday
                    }
                }
                HTTP.call('POST','http://127.0.0.1:5010/screenshots', body, (error, response) =>{
                    if(error){
                        console.log("Authenticated Error!");
                        resolve(error);
                    }else{
                        resolve(response)
                    }

                } );
            } catch (error) {
                console.log(error)
            }
            
        })
    }
}