"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _db = _interopRequireDefault(require("../../db"));

var _trips = _interopRequireDefault(require("../models/trips"));

var pg = require("pg");

var pool = new pg.Pool(_db["default"]);

var TripController =
/*#__PURE__*/
function () {
  function TripController() {
    (0, _classCallCheck2["default"])(this, TripController);
  }

  (0, _createClass2["default"])(TripController, null, [{
    key: "getTrips",
    value: function getTrips(req, res) {
      pool.connect(function (err, client, done) {
        if (err) {
          console.log(err);
        }

        var query = "SELECT * FROM trips";
        client.query(query, function (error, result) {
          if (error) {
            return res.status(400).json({
              status: "error",
              error: "Something went wrong"
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
  }, {
    key: "createTrip",
    value: function createTrip(req, res) {
      var data = {
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

      pool.connect(function (err, client, done) {
        var query = "SELECT is_admin FROM users where id =$1";
        var value = [req.body.user_id];
        client.query(query, value, function (error, result) {
          if (error) {
            res.status(400).json({
              status: "Error",
              error: "Something went wrong please try again"
            });
          }

          if (result.rows[0].is_admin === "true") {
            var _query = "INSERT INTO trips(bus_id,origin, destination, trip_date, fare,status) VALUES($1,$2,$3,$4,$5,$6) RETURNING *";
            var values = [data.bus_id, data.origin, data.destination, data.trip_date, data.fare, data.status];
            client.query(_query, values, function (error, result) {
              done();

              if (error) {
                res.status(400).json({
                  status: "Error",
                  error: "Not all credentials filled"
                });
              }

              res.status(201).send({
                status: "Successful",
                data: result.rows[0]
              });
            });
          } else {
            res.status(400).json({
              status: "Error",
              error: "Sorry only admin can make trips"
            });
          }
        });
      });
    }
  }, {
    key: "cancelTrip",
    value: function cancelTrip(req, res) {
      pool.connect(function (err, client, done) {
        var query = "SELECT is_admin from users where id=$1";
        var values = [req.body.id];
        client.query(query, values, function (error, result) {
          if (error) {
            res.status(400).json({
              status: "Error",
              error: "Something went wrong"
            });
          }

          if (result.rows[0].is_admin === "true") {
            var cancelQuery = "UPDATE trips\n          SET status=$1\n          WHERE id=$2 returning *";
            var val = ["0", req.params.trip_id];
            client.query(cancelQuery, val, function (error, result) {
              if (result.rows[0] <= 0) {
                return res.status(404).json({
                  status: "error",
                  error: "No trip found with such ID"
                });
              }

              return res.status(200).json({
                status: "success",
                data: result.rows[0]
              });
            });
          } else {
            res.status(400).json({
              status: "error",
              error: "You do not have the priviledges"
            });
          }
        });
      });
    }
  }]);
  return TripController;
}();

var _default = TripController;
exports["default"] = _default;