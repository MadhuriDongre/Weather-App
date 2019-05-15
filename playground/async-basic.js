console.log('Starting App');
setTimeout(()=>{
    console.log('Inside callback function');
},2000);
setTimeout(() => {
  console.log("Inside second callback function");
}, 0);
console.log('Finishing up');