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

  
}

export default TripController;
