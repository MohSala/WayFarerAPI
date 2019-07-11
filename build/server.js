"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _users = _interopRequireDefault(require("./routers/users"));

var _middleware = _interopRequireDefault(require("./middleware"));

var _trips = _interopRequireDefault(require("./routers/trips"));

var _buses = _interopRequireDefault(require("./routers/buses"));

var app = (0, _express["default"])();

var router = _express["default"].Router();

app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
var port = process.env.PORT || 3001; // when a random route is inputed

app.get("/", _middleware["default"].checkToken, function (req, res) {
  return res.status(200).send({
    message: "Welcome to this API."
  });
});
app.use("/api/v1/auth/", _users["default"]);
app.use("/api/v1/trips/", _middleware["default"].checkToken, _trips["default"]);
app.use("/api/v1/", _middleware["default"].checkToken, _buses["default"]);
app.listen(port, function () {
  console.log("Server is running on PORT ".concat(port));
});
var _default = app;
exports["default"] = _default;