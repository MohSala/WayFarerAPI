"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var Trip = function Trip(bus_id, origin, destination, fare) {
  var status = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  (0, _classCallCheck2["default"])(this, Trip);
  this.id = Number();
  this.bus_id = Number();
  this.origin = origin;
  this.destination = destination;
  this.trip_date = new Date().toDateString();
  this.fare = fare;
  this.status = status;
};

var _default = Trip;
exports["default"] = _default;