const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'transactions',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  connection.connect();

  try {
    await execQuery(`INSERT INTO account 
    VALUES 
    (101, 8300), 
    (102, 2100);`);
    await execQuery(`INSERT INTO account_changes 
    VALUES 
    (1001, 101, -1000, '2008-11-11', 'subtract'), 
    (1002, 102, 1000, '2008-11-11', 'increment');`);

  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
    connection.end();
  }

  connection.end();
}

seedDatabase();