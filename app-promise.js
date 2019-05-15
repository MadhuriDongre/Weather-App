const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .option({
        a: {
            demand:true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help','h')
    .argv;

let address = encodeURIComponent(argv.address);
let geocodeURL = `http://www.mapquestapi.com/geocoding/v1/address?key=Bw0d0a1GttV0hlb1V9AMHv9ZEIxI8HyM&location=${address}`;

axios.get(geocodeURL).then((response)=>{
    if(response.data.info.statuscode===400){
        throw new Error('Unable to find that address');
    }
    let latitude= response.data.results[0].locations[0].latLng.lat;
    let longitude= response.data.results[0].locations[0].latLng.lng;
    let weatherURL = `https://api.darksky.net/forecast/a24397beb9e25c5e237786d394cfb5f9/${latitude},${longitude}`
    
    let address1 = response.data.results[0].locations[0];
    let address = address1.street+', '+address1.adminArea5 +', '+ address1.adminArea3 +', '+ address1.adminArea1;
       
    return axios.get(weatherURL).then((res)=>{
        let result = {
              address:address,
              summary: res.data.currently.summary,
              temperature: (res.data.currently.temperature-32)*(5/9) + ' C',
              humidity: res.data.currently.humidity,
              visibility: res.data.currently.visibility
            };
        console.log(JSON.stringify(result,undefined,2));
    })
}).catch((err)=>{
    if(err.code==='ENOTFOUND'){
        console.log('Unable to connect to API server');
    }
    else{
        console.log(err.message);
    }
})
