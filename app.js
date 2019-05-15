const geocode = require("./geocode/geocode");
const yargs = require('yargs');
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

geocode.geocodeAddress(argv.address,(err,results)=>{
    if(err){
        console.log(err);
    }
    else{
        geocode.weather(results, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(JSON.stringify(result, undefined, 2));
          }
        });
    }
});
