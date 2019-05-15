const request = require('request');

var geocodeAddress= (address)=>{
    return new Promise((resolve,reject)=>{
        let addr = encodeURIComponent(address);
        request(
          {
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=Bw0d0a1GttV0hlb1V9AMHv9ZEIxI8HyM&location=${addr}`,
            json: true
          },
          (error, response, body) => {
            if (error) {
              reject("Unable to connect to the server");
            } else if (body.info.statuscode === 400) {
              reject("Please provide valid address");
            } else {
              var address = body.results[0].locations[0];
              resolve({
                address: address.street +", " +address.adminArea5 + ", " +address.adminArea3 +", " +address.adminArea1,
                latitude: body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng
              });
            }
          }
        );
    });
};

geocodeAddress('Bangalore IN')
    .then((location)=>{
        console.log(JSON.stringify(location,undefined,2));
    },(err)=>{
        console.log(err);
    });