const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  multipleStatements: true,
});

// template function to query database
const db_query = (query_arg) => {
    connection.query(query_arg, (err) =>{
        if (err) {
            console.log(err.message)
        }
    }) 
}

// connecting to database
connection.connect((err) => {
    if(err){
      console.log('Error connecting to Db');
      return;
    }
    console.log('Connection established')
  });

  // creating database  
const create_db = "DROP DATABASE IF EXISTS meetup; CREATE DATABASE IF NOT EXISTS meetup"
  db_query(create_db);
  db_query("USE meetup");

  // creating tables
const create_invitee = "CREATE TABLE IF NOT EXISTS Invitee (invitee_no int PRIMARY KEY, invitee_name varchar(50), invited_by varchar(50))"
  db_query(create_invitee);

const create_room = "CREATE TABLE IF NOT EXISTS Room (room_no int PRIMARY KEY, room_name varchar(50), floor_number int)"
  db_query(create_room);

const create_meeting = "CREATE TABLE IF NOT EXISTS Meeting (meeting_no int PRIMARY KEY, meeting_title varchar(50), starting_time datetime, ending_time datetime, room_number int, CONSTRAINT roomFk FOREIGN KEY (room_number) REFERENCES Room(room_no))"
  db_query(create_meeting);

  // inserting records
  const invitees_data =
  "INSERT INTO invitee VALUES (1, 'Noah', 'John'),(2, 'Sarah', 'John'),(3, 'Rachel', 'John'),(4, 'Mary', 'John'),(5, 'William', 'John')";
  db_query(invitees_data);

  const rooms_data =
  "INSERT INTO room VALUES (1, 'Reception', 1),(2, 'Waiting', 1),(3, 'Meeting', 2),(4, 'Conference', 2),(5, 'kitchen', 3);"
  db_query(rooms_data);

  const meetings_data =
  "INSERT INTO meeting VALUES (1, 'Morning', '2021-07-26 08:20:30','2021-07-26 09:20:30', 3),(2, 'Planning', '2021-07-26 11:00:00','2021-07-26 12:00:00', 4),(3, 'Launch', '2021-07-26 13:00:00','2021-07-27 13:45:00', 2),(4, 'Discussion', '2021-07-20 16:00:00', '2021-07-27 17:00:00', 4),(5, 'drinking', '2021-07-27 18:00:00', '2023-07-27 18:20:00', 5)";
  db_query(meetings_data)
  
  connection.end();