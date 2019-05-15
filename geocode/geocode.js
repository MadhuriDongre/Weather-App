const request = require("request");
var geocodeAddress = (addr, callback)=>{
    let address = encodeURIComponent(addr);
    request({
                url:`http://www.mapquestapi.com/geocoding/v1/address?key=Bw0d0a1GttV0hlb1V9AMHv9ZEIxI8HyM&location=${address}`,
                json:true
            },(error, response, body)=>{
                if(error){
                    callback('Unable to connect to the server');
                }
                else if(body.info.statuscode===400) {
                    callback('Please provide valid address');
                }
                else{
                    var address = body.results[0].locations[0];
                    callback(undefined,{
                        address: address.street+', '+address.adminArea5 +', '+ address.adminArea3 +', '+ address.adminArea1,
                        latitude: body.results[0].locations[0].latLng.lat,
                        longitude: body.results[0].locations[0].latLng.lng
                    });
                }
            });
};

var weather = (addr, callback)=>{
    request({
        url: `https://api.darksky.net/forecast/a24397beb9e25c5e237786d394cfb5f9/${addr.latitude},${addr.longitude}`,
        json:true
    },(error,response,body)=>{
        if(error){
            callback('Unable to connect to server');
        }
        else if(body.code===400){
            callback(body.error);
        }
        else {
            callback({
              address:addr.address,
              summary: body.currently.summary,
              temperature: (body.currently.temperature-32)*(5/9) + ' F',
              humidity: body.currently.humidity,
              visibility: body.currently.visibility
            });
        }

    });
}
module.exports = {
  geocodeAddress,
  weather
};