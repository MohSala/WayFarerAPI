"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _buses = _interopRequireDefault(require("../controllers/buses"));

var router = _express["default"].Router();

router.post("/buses", _buses["default"].createBus);
router.get("/buses", _buses["default"].viewBus);
var _default = router;
exports["default"] = _default;