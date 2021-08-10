const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  connection.connect();

  try {
    await execQuery(`DROP DATABASE IF EXISTS transactions;`);
    await execQuery(`CREATE DATABASE transactions;`);
    await execQuery(`USE transactions;`);

    await execQuery(`CREATE TABLE account 
    (account_number INT NOT NULL,
        balance FLOAT NOT NULL,
        PRIMARY KEY (account_number));`);
    await execQuery(`CREATE TABLE account_changes 
    (change_number INT NOT NULL, 
        account_number INT, 
        amount FLOAT, 
        changed_date DATE, 
        remark VARCHAR(250),
        PRIMARY KEY (change_number),
        FOREIGN KEY (account_number) REFERENCES account(account_number));`);
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
    connection.end();
  }

  connection.end();
}

seedDatabase();