const pg = require ('pg');


const config = {

    user: 'wayfarer', //this is the db user credential
    database: 'wayfarerdb',
    password: 'wayfarer',
    port: 5432,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000

}

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('connected to the Database');
});

// const createTables = () => {
//   const userTable = `CREATE TABLE IF NOT EXISTS
//       users(
//         id SERIAL PRIMARY KEY,
//         email VARCHAR(128) NOT NULL,
//         first_name VARCHAR(128) NOT NULL,
//         last_name VARCHAR(128) NOT NULL,
//         password VARCHAR(128) NOT NULL,
//         is_admin VARCHAR(128) NOT NULL
//       )`;
//   pool.query(userTable)
//     .then((res) => {
//       console.log(res);
//       pool.end();
//     })
//     .catch((err) => {
//       console.log(err);
//       pool.end();
//     });
// };

const createTrips = () => {
  const tripsTable = `CREATE TABLE IF NOT EXISTS
      trips(
        id SERIAL PRIMARY KEY,
        bus_id INT NOT NULL,
        origin VARCHAR(128) NOT NULL,
        destination VARCHAR(128) NOT NULL,
        trip_date TIMESTAMP NOT NULL,
        fare FLOAT NOT NULL,
        status FLOAT NOT NULL
      )`;
  pool.query(tripsTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
module.exports = {
  // createTables,
  createTrips,
  pool,
};

require('make-runnable');

module.exports = config;