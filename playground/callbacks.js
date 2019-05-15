var getUser =(id,callback)=>{
    var user={
        name:'Madhuri',
        id:id
    }
    setTimeout(()=>{
        callback(user);
    },3000);
};

getUser(31,(user)=>{
    console.log(user);
});