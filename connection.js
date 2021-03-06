const MongoClient = require("mongodb").MongoClient;

const connectionString = "mongodb+srv://seftian:seftian123@cluster0.ebnzj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(connectionString, {
    useUnifiedTopology: true
});

(async () => {
    try {
        await client.connect();
    } catch (error) {
        console.error(error);
    }
})();

module.exports = client;
