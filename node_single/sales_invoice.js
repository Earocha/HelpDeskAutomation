var PodioAPI = require('podio-js').api;


const podio = new PodioAPI ({
    authType: 'client',
    clientId: 'salesinvoice',
    clientSecret: '1vkugmF3hjPVTOCsqiDFwYHovIRoGDFBZ74J7hkkJHW4jXX0OjhcBjFXzvPwNWeX'
});


var appId = 24467641;
var appToken = 'a69c8929ea51451aac34098723049d93';

async function start () {
    var getItem = await getPodioItem();

    for(var x = 0; x < getItem.items.length; x++){
        var DueDate = await getDueDate(getItem.items[x].item_id);
        console.log(DueDate[0].start_utc);
    }
}

function getPodioItem(){
    return new Promise(resolve=>{
        podio.authenticateWithApp(appId, appToken, (err) => {
            if (err) throw new Error(err);
            resolve(podio.request('POST', `/item/app/${appId}/filter/`, function(response) {
                console.log('resolved', response);
            }).catch(err => console.log(err)));
        });
    })
} 

function getDueDate (item_id){
    return new Promise (resolve=>{
        var field_id = 206433230;
        podio.authenticateWithApp(appId, appToken, (err) => {
            if (err) throw new Error(err);
            resolve(podio.request('GET', `/item/${item_id}/value/${field_id}`, function(response) {
                console.log('resolved', response);
            }).catch(err => console.log(err)));
        });
    })
}


start();