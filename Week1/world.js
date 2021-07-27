const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'world'
});

// template function to query database
const db_query = (query_arg) => {
    connection.query(query_arg, (err,result) =>{
        if (err) {
            console.log(err.message)
        }
        console.log(result)
    }) 
}

// connecting to database
connection.connect((err) => {
    if(err){
      console.log('Error connecting to world');
      return;
    }
    console.log('Connection established with world')
  });

  // countries with population greater than 8 million
  const q1 = "SELECT Name FROM country WHERE population > 8000000"
  db_query(q1);
  // countries that have “land” in their names
  const q2 = "SELECT Name FROM country WHERE Name LIKE '%land%'"
  db_query(q2);
  // cities with population in between 500,000 and 1 million
  const q3 = "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000"
  db_query(q3);
  // countries on the continent ‘Europe’
  const q4 = "SELECT Name FROM country WHERE Continent = 'Europe'"
  db_query(q4);
  // countries in the descending order of their surface areas
  const q5 = "SELECT Name FROM country ORDER BY SurfaceArea DESC"
  db_query(q5);
  // names of all the cities in the Netherlands
  const q6 = "SELECT Name FROM city WHERE CountryCode = 'NLD'"
  db_query(q6);
  // population of Rotterdam
  const q7 = "SELECT Population FROM city WHERE Name = 'Rotterdam'"
  db_query(q7);
  // top 10 countries by Surface Area
  const q8 = "SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10"
  db_query(q8);
  // top 10 most populated cities
  const q9 = "SELECT Name FROM city ORDER BY Population DESC LIMIT 10"
  db_query(q9);
  // the population number of the world
  const q10 = "SELECT SUM (Population) FROM country"
  db_query(q10);

  connection.end();
