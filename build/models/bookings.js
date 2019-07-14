"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var Booking = function Booking(user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email) {
  (0, _classCallCheck2["default"])(this, Booking);
  this.id = Number();
  this.user_id = user_id;
  this.trip_id = trip_id;
  this.bus_id = bus_id;
  this.trip_date = trip_date;
  this.seat_number = seat_number;
  this.first_name = first_name;
  this.last_name = last_name;
  this.email = email;
};

var _default = Booking;
exports["default"] = _default;