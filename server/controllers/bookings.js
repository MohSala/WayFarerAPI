const pg = require("pg");
import config from "../../db";
import Booking from "../models/bookings";

const pool = new pg.Pool(config);

class BookingsController {
  /**
   * Users can view all their trips
   * @param {*} req
   * @param {*} res
   */

  static viewBookings(req, res) {
    pool.connect((err, client, done) => {
      if (err) {
        console.log(err);
      }
      const firstQuery = "SELECT is_admin from users where id=$1";
      const value = [req.body.user_id];
      client.query(firstQuery, value, (error, result) => {
        if (result.rows[0].is_admin === "true") {
          const secondQuery = "SELECT * from bookings";
          client.query(secondQuery, (error, result) => {
            if (error) {
              return res.status(400).json({
                status: "error",
                error: "Sorry something went wrong"
              });
            }
            res.status(200).json({
              status: "Success",
              data: result.rows
            });
          });
        } else {
          const query = "SELECT * FROM bookings where user_id=$1";
          const values = [req.body.user_id];
          client.query(query, values, (error, result) => {
            console.log(result.rows[0]);
            if (error) {
              return res.status(400).json({
                status: "error",
                error: "Something went wrong"
              });
            }
            if (result.rows < 1) {
              res.status(200).json({
                status: "Success",
                message: "No trip has been booked for this user"
              });
            }
            return res.status(200).json({
              status: "Success",
              data: result.rows
            });
            done();
          });
        }
      });
    });
  }

  /**
   * Users can book a seat for a trip
   * @param {*} req
   * @param {*} res
   */
  static createBooking(req, res) {
    const {
      user_id,
      trip_id,
      bus_id,
      trip_date,
      seat_number,
      first_name,
      last_name,
      email
    } = req.body;

    const booking = new Booking(
      user_id,
      trip_id,
      bus_id,
      trip_date,
      seat_number,
      first_name,
      last_name,
      email
    );
    console.log(booking);

    if (booking.user_id === undefined || booking.user_id.trim() === "") {
      res.status(400).json({
        status: 400,
        error: "User not supplied"
      });
      return;
    }

    if (booking.trip_id === undefined || booking.trip_id.trim() === "") {
      res.status(400).json({
        status: 400,
        error: "Trip not supplied"
      });
      return;
    }

    if (booking.user_id === undefined || booking.user_id.trim() === "") {
      res.status(400).json({
        status: 400,
        error: "User not supplied"
      });
      return;
    }

    if (
      booking.seat_number === undefined ||
      booking.seat_number.trim() === ""
    ) {
      res.status(400).json({
        status: 400,
        error: "User not supplied"
      });
      return;
    }

    if (booking.first_name === undefined || booking.first_name.trim() === "") {
      res.status(400).json({
        status: 400,
        error: "User not supplied"
      });
      return;
    }

    if (booking.last_name === undefined || booking.last_name.trim() === "") {
      res.status(400).json({
        status: 400,
        error: "User not supplied"
      });
      return;
    }

    if (booking.email === undefined || booking.email.trim() === "") {
      res.status(400).json({
        status: 400,
        error: "User not supplied"
      });
      return;
    }

    pool.connect((err, client, done) => {
      if (err) {
        res.status(400).json({
          status: 400,
          error: "Something went wrong, please try again"
        });
      }

      const query = "SELECT * FROM trips where id =$1";
      const value = [req.body.trip_id];
      client.query(query, value, (error, result) => {
        if (!result.rows[0]) {
          return res.status(404).json({
            status: "error",
            error: "Trip not found!"
          });
        }

        if (result.rows[0].status === 0) {
          return res.status(400).json({
            status: "error",
            error: "This trip has been canceled, you can not book it"
          });
        }

        const thirdQuery =
          "SELECT * from bookings where trip_id=$1 AND seat_number=$2";
        const thirdValue = [req.body.trip_id, req.body.seat_number];

        client.query(thirdQuery, thirdValue, (error, result) => {
          if (result.rows[0]) {
            return res.status(400).json({
              status: "error",
              error: "That seat has already been taken, choose another"
            });
          }
        });

        const fourthQuery = "Select * from Buses where id=$1";
        const fourthValue = [req.body.bus_id];

        client.query(fourthQuery, fourthValue, (error, result) => {
          if (result.rows[0].capacity < req.body.seat_number) {
            return res.status(400).json({
              status: "error",
              error: "The Bus does not have that amount of capacity"
            });
          }
        });

        const insertQuery =
          "INSERT INTO bookings(user_id,trip_id,bus_id,trip_date,seat_number,first_name,last_name,email) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *";
        const insertValues = [
          booking.user_id,
          booking.trip_id,

          booking.bus_id,
          booking.trip_date,
          booking.seat_number,
          booking.first_name,
          booking.last_name,
          booking.email
        ];

        client.query(insertQuery, insertValues, (error, result) => {
          if (error) {
            return res.status(400).json({
              status: "error",
              error: "Something went wrong, try again"
            });
          }
          return res.status(201).json({
            status: "success",
            data: result.rows[0]
          });
        });
      });
    });
  }

  static deleteBooking(req, res) {
    pool.connect((err, client, done) => {
      if (err) {
        console.log(err);
      }

      const query =
        "DELETE FROM bookings where user_id=$1 and id=$2 returning *";

      const val = [req.body.user_id, req.params.id];
      client.query(query, val, (error, result) => {
        if (error) {
          return res.status(400).json({
            status: "Error",
            error: "Sorry something went wrong"
          });
        }
        if (!result.rows) {
          res.status(400).json({
            status: "Error",
            message: "Not found"
          });
        }
        return res.status(200).json({
          status: "Success",
          data: {
            message: "Deleted Successfully"
          }
        });
        done();
      });
    });
  }

  static changeSeat(req, res) {
    pool.connect((err, client, done) => {
      if (err) {
        res.status(400).json({
          status: "Error",
          error: "Something went wrong"
        });
      }

      const query =
        "SELECT * from bookings where trip_id=$1 AND seat_number=$2";
      const value = [req.body.trip_id, req.body.seat_number];

      client.query(query, value, (error, result) => {
        if (result.rows[0]) {
          return res.status(400).json({
            status: "error",
            error: "That seat has already been taken, choose another"
          });
        }
      });

      const secondQuery = "SELECT * FROM trips where id =$1";
      const secondValue = [req.body.trip_id];
      client.query(secondQuery, secondValue, (error, result) => {
        if (!result.rows[0]) {
          return res.status(404).json({
            status: "error",
            error: "Trip not found!"
          });
        }
      });

      const fourthQuery = "Select * from Buses where id=$1";
      const fourthValue = [req.body.bus_id];

      client.query(fourthQuery, fourthValue, (error, result) => {
        if (result.rows[0].capacity < req.body.seat_number) {
          return res.status(400).json({
            status: "error",
            error: "The Bus does not have that amount of capacity"
          });
        }
      });

      const updateQuery = "UPDATE bookings SET seat_number = $1  returning *";
      const updateValue = [req.body.seat_number];
      client.query(updateQuery, updateValue, (error, result) => {
        console.log(result.rows[0]);
        if (!result.rows[0]) {
          return res.status(404).json({
            status: "error",
            error: "Not Found"
          });
        }
        return res.status(200).json({
          status: "success",
          data: result.rows[0]
        });
      });
    });
  }
}

export default BookingsController;
