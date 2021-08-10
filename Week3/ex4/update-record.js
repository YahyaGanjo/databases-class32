const { MongoClient } = require("mongodb");

const url = 'mongodb+srv://yahya:30716@world.pmrms.mongodb.net/world?retryWrites=true&w=majority'                                                                                                                                       
const client = new MongoClient(url);
const dbName = "world";
const clName = "city";

async function run(client, numberOfListing, updatedListing) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const result = await client.db(dbName).collection(clName)
                        .updateOne({ no: numberOfListing }, { $set: updatedListing });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
    } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run(client, 4081, { population: 2900000 }).catch(console.dir);