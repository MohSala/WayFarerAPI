const pg = require("pg");
import config from "../../db";
import Trip from "../models/trips";

const pool = new pg.Pool(config);

class TripController {
  static getTrips(req, res) {
    pool.connect((err, client, done) => {
      if (err) {
        console.log(err);
      }

      const query = "SELECT * FROM trips";
      client.query(query, (error, result) => {
        if (error) {
          return res.status(401).json({
            status: "error",
            error: "No token provided"
          });
        }
        if (result.rows < 1) {
          res.status(200).json({
            status: "Success",
            message: "No trips found"
          });
        }
        return res.status(200).json({
          status: "Success",
          data: result.rows
        });
        done();
      });
    });
  }

  static createTrip(req, res) {
    const data = {
      bus_id: req.body.bus_id,
      origin: req.body.origin,
      destination: req.body.destination,
      trip_date: req.body.trip_date,
      fare: req.body.fare,
      status: req.body.status
    };

    if (data.bus_id === undefined || data.bus_id === "") {
      res.status(400).json({
        status: "Error",
        error: "Bus not supplied"
      });
      return;
    }

    if (data.origin === undefined || data.origin.trim() === "") {
      res.status(400).json({
        status: "Error",
        error: "Origin not supplied"
      });
      return;
    }

    if (data.destination === undefined || data.destination.trim() === "") {
      res.status(400).json({
        status: "Error",
        error: "Destination not supplied"
      });
      return;
    }

    if (data.trip_date === undefined || data.trip_date.trim() === "") {
      res.status(400).json({
        status: "Error",
        error: "Trip Day not supplied"
      });
      return;
    }

    if (data.fare === undefined || data.fare.trim() === "") {
      res.status(400).json({
        status: "Error",
        error: "Fare not supplied"
      });
      return;
    }

    pool.connect((err, client, done) => {
      const query =
        "INSERT INTO trips(bus_id,origin, destination, trip_date, fare,status) VALUES($1,$2,$3,$4,$5,$6) RETURNING *";
      const values = [
        data.bus_id,
        data.origin,
        data.destination,
        data.trip_date,
        data.fare,
        data.status
      ];

      client.query(query, values, (error, result) => {
        done();
        if (error) {
          res.status(400).json({ 
            status: 'Error',  
            error: "Not all credentials filled" 
            });
        }
        res.status(201).send({
          status: "Successful",
          data: result.rows[0]
        });
      });
    });
  }

}

export default TripController;
