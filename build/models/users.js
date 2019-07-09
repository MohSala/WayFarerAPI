"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var User = function User(email, first_name, last_name, password, is_admin) {
  (0, _classCallCheck2["default"])(this, User);
  this.id = Number();
  this.email = email;
  this.first_name = first_name;
  this.last_name = last_name;
  this.password = password;
  this.is_admin = false;
};

var _default = User;
exports["default"] = _default;