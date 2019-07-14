"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _db = _interopRequireDefault(require("../../db"));

var _bookings = _interopRequireDefault(require("../models/bookings"));

var pg = require("pg");

var pool = new pg.Pool(_db["default"]);

var BookingsController =
/*#__PURE__*/
function () {
  function BookingsController() {
    (0, _classCallCheck2["default"])(this, BookingsController);
  }

  (0, _createClass2["default"])(BookingsController, null, [{
    key: "viewBookings",

    /**
     * Users can view all their trips
     * @param {*} req
     * @param {*} res
     */
    value: function viewBookings(req, res) {
      pool.connect(function (err, client, done) {
        if (err) {
          console.log(err);
        }

        var firstQuery = "SELECT is_admin from users where id=$1";
        var value = [req.body.user_id];
        client.query(firstQuery, value, function (error, result) {
          if (result.rows[0].is_admin === "true") {
            var secondQuery = "SELECT * from bookings";
            client.query(secondQuery, function (error, result) {
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
            var query = "SELECT * FROM bookings where user_id=$1";
            var values = [req.body.user_id];
            client.query(query, values, function (error, result) {
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

  }, {
    key: "createBooking",
    value: function createBooking(req, res) {
      var _req$body = req.body,
          user_id = _req$body.user_id,
          trip_id = _req$body.trip_id,
          bus_id = _req$body.bus_id,
          trip_date = _req$body.trip_date,
          seat_number = _req$body.seat_number,
          first_name = _req$body.first_name,
          last_name = _req$body.last_name,
          email = _req$body.email;
      var booking = new _bookings["default"](user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email);
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

      if (booking.seat_number === undefined || booking.seat_number.trim() === "") {
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

      pool.connect(function (err, client, done) {
        if (err) {
          res.status(400).json({
            status: 400,
            error: "Something went wrong, please try again"
          });
        }

        var query = "SELECT * FROM trips where id =$1";
        var value = [req.body.trip_id];
        client.query(query, value, function (error, result) {
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

          var thirdQuery = "SELECT * from bookings where trip_id=$1 AND seat_number=$2";
          var thirdValue = [req.body.trip_id, req.body.seat_number];
          client.query(thirdQuery, thirdValue, function (error, result) {
            if (result.rows[0]) {
              return res.status(400).json({
                status: "error",
                error: "That seat has already been taken, choose another"
              });
            }
          });
          var fourthQuery = "Select * from Buses where id=$1";
          var fourthValue = [req.body.bus_id];
          client.query(fourthQuery, fourthValue, function (error, result) {
            if (result.rows[0].capacity < req.body.seat_number) {
              return res.status(400).json({
                status: "error",
                error: "The Bus does not have that amount of capacity"
              });
            }
          });
          var insertQuery = "INSERT INTO bookings(user_id,trip_id,bus_id,trip_date,seat_number,first_name,last_name,email) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *";
          var insertValues = [booking.user_id, booking.trip_id, booking.bus_id, booking.trip_date, booking.seat_number, booking.first_name, booking.last_name, booking.email];
          client.query(insertQuery, insertValues, function (error, result) {
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
  }, {
    key: "deleteBooking",
    value: function deleteBooking(req, res) {
      pool.connect(function (err, client, done) {
        if (err) {
          console.log(err);
        }

        var query = "DELETE FROM bookings where user_id=$1 and id=$2 returning *";
        var val = [req.body.user_id, req.params.id];
        client.query(query, val, function (error, result) {
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
  }, {
    key: "changeSeat",
    value: function changeSeat(req, res) {
      pool.connect(function (err, client, done) {
        if (err) {
          res.status(400).json({
            status: "Error",
            error: "Something went wrong"
          });
        }

        var query = "SELECT * from bookings where trip_id=$1 AND seat_number=$2";
        var value = [req.body.trip_id, req.body.seat_number];
        client.query(query, value, function (error, result) {
          if (result.rows[0]) {
            return res.status(400).json({
              status: "error",
              error: "That seat has already been taken, choose another"
            });
          }
        });
        var secondQuery = "SELECT * FROM trips where id =$1";
        var secondValue = [req.body.trip_id];
        client.query(secondQuery, secondValue, function (error, result) {
          if (!result.rows[0]) {
            return res.status(404).json({
              status: "error",
              error: "Trip not found!"
            });
          }
        });
        var fourthQuery = "Select * from Buses where id=$1";
        var fourthValue = [req.body.bus_id];
        client.query(fourthQuery, fourthValue, function (error, result) {
          if (result.rows[0].capacity < req.body.seat_number) {
            return res.status(400).json({
              status: "error",
              error: "The Bus does not have that amount of capacity"
            });
          }
        });
        var updateQuery = "UPDATE bookings SET seat_number = $1  returning *";
        var updateValue = [req.body.seat_number];
        client.query(updateQuery, updateValue, function (error, result) {
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
  }]);
  return BookingsController;
}();

var _default = BookingsController;
exports["default"] = _default;