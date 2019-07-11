"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

var _buses = _interopRequireDefault(require("../controllers/buses"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _middleware = _interopRequireDefault(require("../middleware"));

/* eslint-disable no-unused-expressions */

/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
var should = _chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

describe("Bus Controller", function () {
  it("Bus Controller should exist", function () {
    _buses["default"].should.exist;
  });
});
describe("Create Bus endpoint", function () {
  it("Create Bus method should exist", function () {
    _buses["default"].createBus.should.exist;
  });
  it("createBus should create a bus", function (done) {
    var user = {
      first_name: "Tobi",
      last_name: "Qwerty",
      email: "tobi@123.com"
    };

    var token = _jsonwebtoken["default"].sign(user, "secretKey", {
      expiresIn: 3000
    });

    var data = {
      number_plate: "123345ddd",
      manufacturer: "Toyota",
      model: "American",
      year: "2019",
      capacity: "4",
      token: "".concat(token)
    };

    _chai["default"].request(_server["default"]).post("/api/v1/buses", _middleware["default"].checkToken).send(data).end(function (err, res) {
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.property("status");
      res.body.status.should.equal("Success");
      res.body.should.have.property("data");
      res.body.data.should.be.a("object");
    });

    done();
  });
}); //create bus error handling

describe("Create Buses endpoint Error handling", function () {
  it("Should return an error if no number_plate is provided", function (done) {
    var user = {
      first_name: "Tobi",
      last_name: "Qwerty",
      email: "tobi@123.com"
    };

    var token = _jsonwebtoken["default"].sign(user, "secretKey", {
      expiresIn: 3000
    });

    var data = {
      // number_plate: "123345ddd",
      manufacturer: "Toyota",
      model: "American",
      year: "2019",
      capacity: "4",
      token: "".concat(token)
    };

    _chai["default"].request(_server["default"]).post("/api/v1/buses", _middleware["default"].checkToken).send(data).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.property("status");
      res.body.status.should.equal("Error");
      res.body.should.have.property("error");
    });

    done();
  });
  it("Should return an error if no manufacturer is provided", function (done) {
    var user = {
      first_name: "Tobi",
      last_name: "Qwerty",
      email: "tobi@123.com"
    };

    var token = _jsonwebtoken["default"].sign(user, "secretKey", {
      expiresIn: 3000
    });

    var data = {
      number_plate: "123345ddd",
      //   manufacturer: "Toyota",
      model: "American",
      year: "2019",
      capacity: "4",
      token: "".concat(token)
    };

    _chai["default"].request(_server["default"]).post("/api/v1/buses", _middleware["default"].checkToken).send(data).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.property("status");
      res.body.status.should.equal("Error");
      res.body.should.have.property("error");
    });

    done();
  });
  it("Should return an error if no model is provided", function (done) {
    var user = {
      first_name: "Tobi",
      last_name: "Qwerty",
      email: "tobi@123.com"
    };

    var token = _jsonwebtoken["default"].sign(user, "secretKey", {
      expiresIn: 3000
    });

    var data = {
      number_plate: "123345ddd",
      manufacturer: "Toyota",
      //   model: "American",
      year: "2019",
      capacity: "4",
      token: "".concat(token)
    };

    _chai["default"].request(_server["default"]).post("/api/v1/buses", _middleware["default"].checkToken).send(data).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.property("status");
      res.body.status.should.equal("Error");
      res.body.should.have.property("error");
    });

    done();
  });
  it("Should return an error if no year is provided", function (done) {
    var user = {
      first_name: "Tobi",
      last_name: "Qwerty",
      email: "tobi@123.com"
    };

    var token = _jsonwebtoken["default"].sign(user, "secretKey", {
      expiresIn: 3000
    });

    var data = {
      number_plate: "123345ddd",
      manufacturer: "Toyota",
      model: "American",
      //   year: "2019",
      capacity: "4",
      token: "".concat(token)
    };

    _chai["default"].request(_server["default"]).post("/api/v1/buses", _middleware["default"].checkToken).send(data).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.property("status");
      res.body.status.should.equal("Error");
      res.body.should.have.property("error");
    });

    done();
  });
  it("Should return an error if no capacity is provided", function (done) {
    var user = {
      first_name: "Tobi",
      last_name: "Qwerty",
      email: "tobi@123.com"
    };

    var token = _jsonwebtoken["default"].sign(user, "secretKey", {
      expiresIn: 3000
    });

    var data = {
      number_plate: "123345ddd",
      manufacturer: "Toyota",
      model: "American",
      year: "2019",
      //   capacity: "4",
      token: "".concat(token)
    };

    _chai["default"].request(_server["default"]).post("/api/v1/buses", _middleware["default"].checkToken).send(data).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.property("status");
      res.body.status.should.equal("Error");
      res.body.should.have.property("error");
    });

    done();
  });
  it("Should return an error if no token provided", function (done) {
    _chai["default"].request(_server["default"]).post("/api/v1/buses").end(function (err, res) {
      res.should.have.status(401);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.property("status");
      res.body.status.should.equal(401);
      res.body.should.have.property("error");
    });

    done();
  });
  it("should return an ERROR if Token is invalid", function (done) {
    var data = {
      bus_id: "2",
      origin: "Accre",
      destination: "Lagos",
      trip_date: "2019-01-01",
      fare: "40000",
      status: "1",
      token: "fakeToken"
    };

    _chai["default"].request(_server["default"]).post("/api/v1/buses", _middleware["default"].checkToken).send(data).end(function (err, res) {
      res.should.have.status(401);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.property("status");
      res.body.status.should.equal(401);
      res.body.should.have.property("error");
    });

    done();
  });
});