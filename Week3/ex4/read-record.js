const { MongoClient } = require("mongodb");

const url = 'mongodb+srv://yahya:30716@world.pmrms.mongodb.net/world?retryWrites=true&w=majority'                                                                                                                                       
const client = new MongoClient(url);
const dbName = "world";
const clName = "city";

async function findDoc(client, queryKey) {
    const cursor = await client.db(dbName).collection(clName).find(queryKey);
    const results = await cursor.toArray();
    if (results) {
        console.log(`Document found: ${JSON.stringify(results)}`);
    } else {
        console.log(`Document not found!`);
    }
}

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        await findDoc(client, { name: "my city" });                                                                                                                       
        await findDoc(client, { country_code: "SYR" });                                                                                                                       
    } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);