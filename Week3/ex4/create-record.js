const { MongoClient } = require("mongodb");
 
const url = 'mongodb+srv://yahya:30716@world.pmrms.mongodb.net/world?retryWrites=true&w=majority'                                                                                                                                       
const client = new MongoClient(url);
 
 // The database to use
 const dbName = "world";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const col = db.collection("city");

         // Construct a document                                                                                                                                                              
         const myCity = {
             no: 4081,
             name: "my city",                                                                                                                              
             country_code: "SYR",                                                                                                                                
             region: "Aleppo",
             population: 4000000
         }

         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(myCity);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);