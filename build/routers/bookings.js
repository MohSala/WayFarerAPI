"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bookings = _interopRequireDefault(require("../controllers/bookings"));

var router = _express["default"].Router();

router.post("/bookings", _bookings["default"].createBooking);
router.get("/bookings", _bookings["default"].viewBookings);
router["delete"]("/bookings/:booking_id", _bookings["default"].deleteBooking);
router.patch("/bookings/:booking_id", _bookings["default"].changeSeat);
var _default = router;
exports["default"] = _default;