"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

var _bookings = _interopRequireDefault(require("../controllers/bookings"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _middleware = _interopRequireDefault(require("../middleware"));

/* eslint-disable no-unused-expressions */

/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
var should = _chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

describe("Booking Controller", function () {
  it("Booking Controller should exist", function () {
    _bookings["default"].should.exist;
  });
});
describe("Get Bookings endpoint", function () {
  it("Get Bookings method should exist", function () {
    _bookings["default"].viewBookings.should.exist;
  });
  it("Get bookings should return a list of bookings", function (done) {
    var user = {
      first_name: "Tobi",
      last_name: "Qwerty",
      email: "tobi@123.com"
    };

    var token = _jsonwebtoken["default"].sign(user, "secretKey", {
      expiresIn: 3000
    });

    var data = {
      id: "3",
      token: "".concat(token)
    };

    _chai["default"].request(_server["default"]).get("/api/v1/bookings", _middleware["default"].checkToken).send(data).end(function (err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.property("status");
      res.body.status.should.equal(200);
      res.body.should.have.property("data");
      res.body.data.should.be.a("object");
    });

    done();
  });
});
describe("Get Bookings error handling", function () {
  it("should return an ERROR if Token is not supplied", function (done) {
    _chai["default"].request(_server["default"]).get("/api/v1/bookings").end(function (err, res) {
      res.should.have.status(401);
      res.should.be.json;
      res.body.should.have.property("status");
      res.body.status.should.equal(401);
      res.body.should.have.property("error");
    });

    done();
  });
  it("should return an ERROR if Token is invalid", function (done) {
    var data = {
      id: "3",
      token: "fakeToken"
    };

    _chai["default"].request(_server["default"]).get("/api/v1/bookings", _middleware["default"].checkToken).send(data).end(function (err, res) {
      res.should.have.status(401);
      res.should.be.json;
      res.body.should.have.property("status");
      res.body.status.should.equal(401);
      res.body.should.have.property("error");
    });

    done();
  });
});