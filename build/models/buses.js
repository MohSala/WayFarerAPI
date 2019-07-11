"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var Bus = function Bus(number_plate, manufacturer, model, year, capacity) {
  (0, _classCallCheck2["default"])(this, Bus);
  this.id = Number();
  this.number_plate = number_plate;
  this.manufacturer = manufacturer;
  this.model = model;
  this.year = year;
  this.capacity = capacity;
};

var _default = Bus;
exports["default"] = _default;