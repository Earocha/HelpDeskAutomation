import { Meteor } from 'meteor/meteor';
import PickersHook from '../imports/api/Helpdesk/PickerHooks';
import Sales_invoice from '../imports/api/sales_invoice/Main';
import ViewRay from '../imports/api/view_ray/Main';
import VideoScan from '../imports/api/VLC/Main';
import bodyParser from 'body-parser';
import { Picker } from 'meteor/meteorhacks:picker';
import FastlySync from '../imports/api/FastltyHRSync/Main';
import AmandaSync from '../imports/api/AmandaSync/Main';
import Uplift from '../imports/api/Uplift/Main';
Meteor.startup(() => {
    Picker.middleware( bodyParser.json( { limit: '500mb' } ) );
    Picker.middleware( bodyParser.urlencoded( { extended: false, limit: '500mb' } ) );

    /*
    const getStart = new VideoScan();
    getStart.Start()
    */
    
    
    //changed role , cannot be up
    Picker.route(`/FastlySync`,({provider},request,responseHTTP)=>{
        const get = new FastlySync()
        get.Start(request)
    })  

    //changed role , cannot be up
    Picker.route(`/AmandaSync`,({provider},request,responseHTTP)=>{
      const get = new AmandaSync()
      get.Start(request)
    })   

    //changed role , cannot be up
    Picker.route(`/helpdesk`, ({ provider }, request, responseHTTP) => {
      const pick = new PickersHook();
      pick.start(request);
    });

    Picker.route(`/view_ray`, ({ provider }, request, responseHTTP) => {
      const view = new ViewRay();
      view.Start(request);
    });
    
    //changed role , cannot be up
    Picker.route(`/sale_invoice_hook`,({ provider }, request, responseHTTP) => {
      const set = new Sales_invoice();
      set.start(request);
    })

    Picker.route(`/uplift`,({provider}, request, responseHTPP)=>{
      const set = new Uplift();
      set.Start(request)
    })
  
});
