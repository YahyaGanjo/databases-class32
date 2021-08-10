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
    await execQuery("START TRANSACTION");

    await execQuery(`UPDATE  account a
    INNER JOIN account_changes b
        ON a.account_number = b.account_number
    SET a.balance = a.balance + b.amount`);

    await execQuery("COMMIT");
    const transactions = await execQuery(`SELECT * FROM account_changes;`)
    const accounts = await execQuery(`SELECT * FROM account;`)
    console.log(transactions, accounts);
  } catch (error) {
    console.error(error);
    await execQuery("ROLLBACK");
    connection.end();
  }

  connection.end();
}

seedDatabase();