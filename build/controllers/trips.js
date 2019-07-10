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
  }]);
  return TripController;
}();

var _default = TripController;
exports["default"] = _default;