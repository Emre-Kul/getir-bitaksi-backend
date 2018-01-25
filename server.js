const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const MongoConnection = require('./server/MongoConnection.js');
const mongoCon = new MongoConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

app.get('/', (req, res) => {
    res.send("Welcome!");
});

app.post('/searchRecord', (req, res) => {
    const result = {};
    const records = mongoCon.getRecords(req.body).then((recordList) => {
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






