"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _trips = _interopRequireDefault(require("../controllers/trips"));

var router = _express["default"].Router();

router.get("/", _trips["default"].getTrips);
router.post("/", _trips["default"].createTrip);
router.patch("/:trip_id", _trips["default"].cancelTrip);
var _default = router;
exports["default"] = _default;