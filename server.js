const express = require('express');
const app = express();

const MongoConnection = require('./server/MongoConnection.js');
const mongoCon = new MongoConnection();

app.get('/',(req,res)=>{
    res.send("Hello World!");
});

app.get('/searchRecord',(req,res) => {
    console.log("Getting Records");
    //mongoCon.getRecords();
    console.dir(req.query);
    res.send("Will searchRecord");
});

mongoCon.connect(() => {
    const server = app.listen(8080,()=>{
        let host = server.address().address;
        let port = server.address().port;
        console.log("Server Started At => %s:%s ",host,port);
    });
});






