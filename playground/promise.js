var asyncAdd =(a,b)=>{
 return new Promise((resolve, reject) => {
   setTimeout(() => {
       if(typeof a ==='number'&& typeof b ==='number'){
           resolve(a + b);
       }else{
            reject("arguments should be numbers");   
       }
   }, 1500);
 });
}

asyncAdd(3, 4).then(
  message => {
    console.log("Result:", message);
  },
  err => {
    console.log("Result:", err);
  }
);

asyncAdd(3, 4)
    .then(
    message => {
        console.log("Result1:", message);
        return asyncAdd(message,23);
    })
    .then(message=>{
        console.log("Result2:", message);
    })
    .catch(err=>{
        console.log('error:',err);
    });

var somePromise=  new Promise((resolve, reject)=>{
    setTimeout(()=>{
        // resolve("Promise Working");
        reject("unable to fullfill promise");
    },2500);
});

somePromise.then((message)=>{
    console.log('Success:',message);
},(error)=>{
    console.log('Failure:',error);
});

