const queries = {
    authors: {
        table_creation: `CREATE TABLE IF NOT EXISTS authors 
        (author_no INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
          author_name VARCHAR(255), 
          university VARCHAR(255), 
          date_of_birth DATE, 
          h_index INT, 
          gender ENUM('m', 'f'))`,
          insertion: `INSERT INTO authors VALUES ?`,
          add_mentor: `ALTER TABLE authors ADD mentor INT;`,
    },
    research_Papers: {
        table_creation: `CREATE TABLE research_Papers(paper_id INT PRIMARY KEY,
             paper_title VARCHAR(256), 
             conference VARCHAR(150), 
             publish_date DATE);`,
          insertion: `INSERT INTO research_Papers VALUES ?`,
    },
    authors_researches: {
        table_creation: `CREATE TABLE authors_researches(id INT PRIMARY KEY AUTO_INCREMENT, 
            author_no INT NOT NULL, 
            paper_no INT NOT NULL, 
            FOREIGN KEY(author_no) REFERENCES authors(author_no), 
            FOREIGN KEY(paper_no) REFERENCES research_Papers(paper_id));`,
          insertion: `INSERT INTO authors_researches(author_no, paper_no) VALUES ?`,
    },
    joins: {
        join1: `SELECT authors1.author_name AS author, 
        authors2.author_name AS mentor 
        FROM authors authors1 
        LEFT JOIN authors authors2 
        ON authors1.mentor = authors2.author_no;`,
        join2: `WITH new_query AS (
        SELECT authors_researches.* , research_papers.paper_title AS research
        FROM authors_researches
        JOIN research_papers
        ON authors_researches.paper_no = research_papers.paper_id)
        SELECT authors.*, new_query.research
        FROM authors
        LEFT JOIN new_query
        ON authors.author_no = new_query.author_no;`
    },
    aggregation: {
        aggregate1: `SELECT paper_title, COUNT(author_no) AS authors_count
        FROM research_Papers JOIN authors_researches 
        ON paper_id = paper_no 
        GROUP BY paper_title;`,
        aggregate2: `SELECT count(id) FROM authors_researches
        LEFT JOIN authors 
        ON authors_researches.author_no = authors.author_no
        WHERE gender = 'f';`,
        aggregate3: `SELECT university, AVG(h_index) AS average 
        FROM authors
        GROUP BY university;`,
        aggregate4: `SELECT university, COUNT(paper_no) AS papers_university
        FROM authors, authors_researches 
        WHERE authors.author_no = authors_researches.author_no 
        GROUP BY university;`,
        aggregate5: `SELECT university, MIN(h_index), MAX(h_index) 
        FROM authors GROUP BY university;`
    }
}

module.exports = queries;