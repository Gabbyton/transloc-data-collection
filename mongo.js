const MongoClient = require('mongodb').MongoClient;

const dbName = 'transloc_data';
const tableName = 'data_collection_1_1';

// Connection URL
const url = `mongodb://127.0.0.1:27017/${dbName}`;

module.exports.addData = (data) => {
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, client) {
        if (err) {
            console.log(`${new Date().toUTCString()} - [ERROR]:\t\tcannot connect to mongoDB database.`);
        }
        const db = client.db(dbName);
        db.collection(tableName).insertOne(data)
            .then(function (result) {
                // console.log('[SUCCESS]:\t\tadded dataset to mongoDB database.');
                client.close();
            })
    });
}