const pg = require("pg");
import config from "../../db";
import Booking from "../models/bookings";

const pool = new pg.Pool(config);

class BookingsController {
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
}

export default BookingsController;
