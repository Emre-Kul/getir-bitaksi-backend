const MongoClient = require('mongodb').MongoClient;
const config = require('./config.js');

const MongoConnection = function () {
    this.db = null;
    this.client = null;

    this.connect = (callback) => {
        MongoClient.connect(config.MONGODB_URL, (err, client) => {
            if (err)
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

    this.getRecords = (payload) => {
        const records = this.db.collection('records').aggregate(
            [
                {
                    $project:
                    {
                        key: '$key',
                        createdAt: '$createdAt',
                        totalCount: { $sum: '$counts' }
                    }
                },
                {
                    $match:
                    {
                        totalCount: { $gt: parseInt(payload.minCount), $lt: parseInt(payload.maxCount) },
                        createdAt: { $gt: new Date(payload.startDate), $lt: new Date(payload.endDate) }
                    }
                }
            ]
        );
        return records;
    }
}

module.exports = MongoConnection;