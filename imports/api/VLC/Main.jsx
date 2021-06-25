import {Component} from 'react';
import fs from 'fs';
import fsxtra from 'fs-extra';
import recordings from '../helper/data';
import ScreenshotPost from './HTTP';
import ODD from './ODD';
import getID from './Sharefile'
import moment from 'moment'
import mysql from 'mysql2/promise'

export default class Main extends Component{
    async Start(){
        const connect = await  mysql.createConnection({   
            host:'35.225.170.185', 
            user:'a2bapp', 
            password:'hpE34UsknhdWCwE@X3mEPXYf3N2zQKJZesEw@',
            database:'sox',waitForConnections: true, 
            connectionLimit: -1, 
            queueLimit: 0 
        })
        for(var loopinfi = 0 ; loopinfi < 1; loopinfi++){
                
            const recordings_sharefile = fs.readdirSync(recordings.fromsharefile);
            const recordings_local = fs.readdirSync(recordings.local);
            var pause = await this.Pause7Sec();
            console.log(pause);
            
            for(var i in recordings_sharefile){
                //console.log("from sharefile",recordings_sharefile)
                if(recordings_local.includes(recordings_sharefile[i]) === false){
                    console.log("copying files...");
                    try {
                        await fsxtra.copy(recordings.fromsharefile+"/"+recordings_sharefile[i], recordings.local+"/"+recordings_sharefile[i])
                        console.log('success!')
                        
                        var screenshotfolder = recordings_sharefile[i];
                        var pathlocal = recordings.local+"/"+recordings_sharefile[i];
                        var videName = recordings_sharefile[i]; 

                        var dateToday = moment(new Date()).format('MM-DD-YYYY')

                        let ClientFolder = await this.ScanClientName(recordings_sharefile[i]);
                        console.log(ClientFolder)

                        if(ClientFolder === 'No Client Name Detected'){
 
                            var Message = "***New Recording has been detected but No Client Name or it's not a video file .mp4*** \n"
                            + "Status: " + "Skipped Screenshot function" + "\n"
                            + "Video Name: " + videName + "\n"
                            + "Date Scanned: " + dateToday + "\n"
                            var setTosend = new ODD();
                            var sent = setTosend.Send(Message);
                            console.log(sent);
                            console.log("successfully sent testing if the loop continues");

                        }else{
                            var saveSF = recordings.SaveScreenshots+ClientFolder;
                            console.log(saveSF);
                            var getPostHttp = new ScreenshotPost();
                            var response = await getPostHttp.HTTPPOST(screenshotfolder,pathlocal,videName,saveSF,dateToday);
                            console.log(response)
                            console.log(saveSF);

                                var getSFID = new getID();
                                var pathpass = encodeURIComponent("/Key Reports/"+`${ClientFolder}`+"/"+videName+dateToday)
                                console.log("check get id by path", pathpass);
                                var ID = await getSFID.GetIdByPath(pathpass);
                                console.log("The Response = >", ID)
                                var mainurlSF = "https://a2q2.sharefile.com/home/shared/"+ID
                                var fullScreenshotPath = recordings.SaveScreenshots +"/"+screenshotfolder;

                                var Message = "***New Screenshots Recordings Ready*** \n"
                                            + "Title : " + screenshotfolder + "\n"
                                            + "Sharefile Link: " + "["+`${mainurlSF}`+"]("+`${mainurlSF}`+")" + "\n"
                                            + "Computer Path : " + response.content + "\n"


                                var setTosend = new ODD();
                                var sent = setTosend.Send(Message);
                                console.log(sent);
                                console.log("successfully sent testing if the loop continues");
                                
                                const mysqldata = {
                                    "id":ID,
                                    "videName":videName,
                                    "SFLink":mainurlSF,
                                    "date":dateToday
                                }
                                const mysqlResult = await this.SaveMysql(mysqldata,connect);
                                console.log("mysql result =>",mysqlResult);
                        }
                    } catch (err) {
                        console.error(err)
                    }
                }else{
                    console.log("Already copied");
                }
            }
            loopinfi--;
        }
        //add infinite loop and pause interval
    }


    Pause7Sec(){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve("execute in 1 minute")
            },7000) //7seconds
        })
    }

    ScanClientName(recording_name){
        return new Promise((resolve,reject)=>{
            if(recording_name.includes('.MP4') || recording_name.includes('.mp4')){
                if(recording_name.includes('Ambarella')){
                    resolve('Ambarella/Screenshots')
                }else if(recording_name.includes('Assetmark')){
                    resolve('Assetmark/Screenshots')
                }else if(recording_name.includes('Cortexyme')){
                    resolve('Cortexyme/Screenshots')
                }else if(recording_name.includes('ERI')){
                    resolve('ERI/Screenshots')
                }else if(recording_name.includes('Fastly')){
                    resolve('Fastly/Screenshots')
                }else if(recording_name.includes('Kindred Bio')){
                    resolve('Kindred Bio/Screenshots')
                }else if(recording_name.includes('McGrath')){
                    resolve('McGrath/Screenshots')
                }else if(recording_name.includes('Techpoint')){
                    resolve('Techpoint/Screenshots')
                }else if(recording_name.includes('ViewRay')){
                    resolve('ViewRay/Screenshots')
                }else if(recording_name.includes('Esperanto')){
                    resolve('Esperanto/Screenshots')
                }else{
                    resolve("No Client Name Detected")
                }
            }else{
                resolve("No Client Name Detected")
            }
        })
    }
    SaveMysql(data,connect){
        return new Promise((resolve,reject)=>{
            let {id,videName,SFLink,date} = data
            let query = [[
                id,
                videName,
                SFLink,
                "",
                date
            ]]
            let SQLINSERT = "INSERT INTO recordings(id,videoname,sflink,keyreport,date) VALUES ?"
            const result = connect.query(SQLINSERT, [query], function (err, result) {
                if (err) throw err;
                resolve(" SQL STATUS: Number of records inserted: " + result.affectedRows);
            });
            resolve(result)
        })
    }
    CheckDuplication(data,connect){

    }
}








