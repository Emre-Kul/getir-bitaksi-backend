const express = require('express');
const app = express();

const MongoConnection = require('./server/MongoConnection.js');
const mongoCon = new MongoConnection();

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.get('/searchRecord', (req, res) => {
    console.log("Getting Records");
    const result = {};
    const records = mongoCon.getRecords(req.query).then((recordList) => {
        result.code = 0;
        result.msg = "Success";
        result.records = recordList;
    }).catch( ()=> {
        result.code = 1;
        result.msg = "Error"; 
    }).then( () => {
        res.send(result); 
    });
});

mongoCon.connect(() => {
    const server = app.listen(8080, () => {
        let host = server.address().address;
        let port = server.address().port;
        console.log("Server Started At => %s:%s ", host, port);
    });
});






