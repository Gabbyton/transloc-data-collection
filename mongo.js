const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://127.0.0.1:27017/transloc_data';

module.exports.addData = (data) => {
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, client) {
        if (err) {
            console.log('[ERROR]:\t\tcannot connect to mongoDB database.');
        }
        const db = client.db("test");
        db.collection('inventory').insertOne(data)
            .then(function (result) {
                // console.log('[SUCCESS]:\t\tadded dataset to mongoDB database.');
                client.close();
            })
    });
}