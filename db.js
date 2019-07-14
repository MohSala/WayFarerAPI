const pg = require("pg");
require("dotenv").config();

const config = {
  user: process.env.DB_USER, //this is the db user credential
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: process.env.MAX, // max number of clients in the pool
  idleTimeoutMillis: process.env.IDLETIMEOUTMILLIS
};

const pool = new pg.Pool(config);

pool.on("connect", () => {
  console.log("connected to the Database");
});

const createTables = () => {
  const userTable = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(128) NOT NULL,
        first_name VARCHAR(128) NOT NULL,
        last_name VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        is_admin VARCHAR(128) NOT NULL
      )`;
  pool
    .query(userTable)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });

  const tripsTable = `CREATE TABLE IF NOT EXISTS
      trips(
        id SERIAL PRIMARY KEY,
        bus_id INT NOT NULL REFERENCES buses(id),
        origin VARCHAR(128) NOT NULL,
        destination VARCHAR(128) NOT NULL,
        trip_date TIMESTAMP NOT NULL,
        fare FLOAT NOT NULL,
        status FLOAT NOT NULL
      )`;
  pool
    .query(tripsTable)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });

  const busesTable = `CREATE TABLE IF NOT EXISTS
    buses(
      id SERIAL PRIMARY KEY,
      number_plate VARCHAR(128) NOT NULL,
      manufacturer VARCHAR(128) NOT NULL,
      model VARCHAR(128) NOT NULL,
      year VARCHAR(128) NOT NULL,
      capacity INT NOT NULL
      
    )`;
  pool
    .query(busesTable)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });

  const bookings = `CREATE TABLE IF NOT EXISTS
  bookings (
    id SERIAL PRIMARY KEY,
    user_id SERIAL NOT NULL REFERENCES users(id),
    trip_id SERIAL NOT NULL REFERENCES trips(id),
    created_on TIMESTAMP DEFAULT Now(),
    bus_id SERIAL NOT NULL REFERENCES buses(id),
    trip_date TIMESTAMP NOT NULL,
    seat_number INT NOT NULL,
    first_name VARCHAR (128) NOT NULL,
    last_name VARCHAR (128) NOT NULL,
    email VARCHAR (355) NOT NULL
    )`;
  pool.query(bookings).catch(err => {
    // eslint-disable-next-line no-console
    console.log(err);
    pool.end();
  });
};

module.exports = {
  createTables,
  pool
};

require("make-runnable");

module.exports = config;
