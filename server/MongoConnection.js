const MongoClient = require('mongodb').MongoClient;
const config = require('./config.js');

const MongoConnection = function(){
    this.db = null;
    this.client = null;

    this.connect = (callback) => {
        MongoClient.connect(config.MONGODB_URL,(err, client) => {
            if(err)
                throw err;
            this.client = client;
            this.db = client.db(config.MONGODB_DB_NAME);
            console.log("MongoDb Connection Established");
            callback();
        });
    }

    this.close = () => {
        this.client.close();    
    }

    this.getRecords = (startDate, endDate) => {
        return records = this.db.collection('records').find({});
        //records.toArray((err,rec) => {
            //console.log(rec);
        //});
        //return records;
    }

}

module.exports = MongoConnection;