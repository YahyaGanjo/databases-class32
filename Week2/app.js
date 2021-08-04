const mysql = require('mysql');
const util = require('util');
const queries = require('./queries');
const data = require('./data');
const { research_papers } = require('./data');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser', 
    password: 'hyfpassword',
});

const execQuery = util.promisify(connection.query.bind(connection));

const seedDatabase = async () => {
    connection.connect();

    try {
        await execQuery(`DROP DATABASE IF EXISTS researches;`);
        await execQuery(`CREATE DATABASE researches;`);
        await execQuery(`USE researches;`);

        // Exercise 1: Keys
        await execQuery(queries.authors.table_creation);
        await execQuery(queries.authors.add_mentor);

        //Exercise 2: Relationships
        await execQuery(queries.research_Papers.table_creation);
        await execQuery(queries.authors_researches.table_creation);
        await execQuery(queries.authors.insertion, [data.authors]);
        await execQuery(queries.research_Papers.insertion, [data.research_papers]);
        await execQuery(queries.authors_researches.insertion, [data.authors_researches]);

        // Exercise 3: Joins
        const author_mentor = await execQuery(queries.joins.join1)
        const author_research_paper = await execQuery(queries.joins.join2)
        console.log(author_mentor, author_research_paper)

        // Exercise 4: Aggregate Functions
        const research_papers_count = await execQuery(queries.aggregation.aggregate1)
        const females_researches = await execQuery(queries.aggregation.aggregate2)
        const avg_h_idx = await execQuery(queries.aggregation.aggregate3)
        const papers_per_university = await execQuery(queries.aggregation.aggregate4)
        const min_max = await execQuery(queries.aggregation.aggregate5)
        console.log(research_papers_count, females_researches, avg_h_idx, papers_per_university, min_max)
        
    } catch (err) {
        console.log(err.message);
    }
    connection.end();
}

seedDatabase();