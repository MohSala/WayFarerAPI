"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _db = _interopRequireDefault(require("../../db"));

var _buses = _interopRequireDefault(require("../models/buses"));

var pg = require("pg");

var pool = new pg.Pool(_db["default"]);

var BusController =
/*#__PURE__*/
function () {
  function BusController() {
    (0, _classCallCheck2["default"])(this, BusController);
  }

  (0, _createClass2["default"])(BusController, null, [{
    key: "createBus",
    value: function createBus(req, res) {
      var _req$body = req.body,
          number_plate = _req$body.number_plate,
          manufacturer = _req$body.manufacturer,
          model = _req$body.model,
          year = _req$body.year,
          capacity = _req$body.capacity;
      var bus = new _buses["default"](number_plate, manufacturer, model, year, capacity);
      console.log(bus);

      if (bus.number_plate === undefined || bus.number_plate.trim() === "") {
        res.status(400).json({
          status: "Error",
          error: "number plate not supplied"
        });
        return;
      }

      if (bus.manufacturer === undefined || bus.manufacturer.trim() === "") {
        res.status(400).json({
          status: "Error",
          error: "Manufacturer not supplied"
        });
        return;
      }

      if (bus.model === undefined || bus.model.trim() === "") {
        res.status(400).json({
          status: "Error",
          error: "Bus model not supplied"
        });
        return;
      }

      if (bus.year === undefined || bus.year.trim() === "") {
        res.status(400).json({
          status: "Error",
          error: "Year not supplied"
        });
        return;
      }

      if (bus.capacity === undefined || bus.capacity.trim() === "") {
        res.status(400).json({
          status: "Error",
          error: "Capacity not supplied"
        });
        return;
      }

      pool.connect(function (err, client, done) {
        if (err) {
          res.status(400).json({
            status: "Error",
            error: "Something went wrong with the connection"
          });
        }

        client.query("INSERT into buses (number_plate, manufacturer, model, year, capacity)  VALUES($1,$2,$3,$4,$5)", [bus.number_plate, bus.manufacturer, bus.model, bus.year, bus.capacity], function (err, result) {
          if (err) {
            res.status(400).json({
              status: "Error",
              error: "There was an error on insertion"
            });
          }

          res.status(201).json({
            status: "Success",
            data: {
              bus: {
                manufacturer: bus.manufacturer,
                number_plate: bus.number_plate,
                model: bus.model,
                year: bus.year,
                capacity: bus.capacity
              }
            }
          });
        });
        done();
      });
    }
  }]);
  return BusController;
}();

var _default = BusController;
exports["default"] = _default;