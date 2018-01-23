const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("Hello World!");
});

app.get('/searchRecord',(req,res) => {
    //let reqStr = JSON.stringify(req);
    console.dir(req);
    res.send("Will searchRecord");
    //res.send(reqStr);    
});

const server = app.listen(8080,()=>{
    let host = server.address().address;
    let port = server.address().port;
    console.log("Server Started At => %s:%s ",host,port);
});


