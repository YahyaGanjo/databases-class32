const { MongoClient } = require("mongodb");

const url = 'mongodb+srv://yahya:30716@world.pmrms.mongodb.net/world?retryWrites=true&w=majority'                                                                                                                                       
const client = new MongoClient(url);
const dbName = "world";
const clName = "city";

async function run(client, nameOfCity) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const result = await client.db(dbName).collection(clName).deleteOne({ Name: nameOfCity });
  if (result) {
    console.log(
      `Deleted a city in the collection with the name '${nameOfCity}':`
    );
    console.log(result);
  } else {
    console.log(`No cities found with the name '${nameOfCity}'`);
  }                                                                                                                     
    } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run(client, "my city").catch(console.dir);