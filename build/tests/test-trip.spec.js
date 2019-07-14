"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

var _trips = _interopRequireDefault(require("../controllers/trips"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _middleware = _interopRequireDefault(require("../middleware"));

/* eslint-disable no-unused-expressions */

/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
var should = _chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

describe("Trip Controller", function () {
  it("Trip Controller should exist", function () {
    _trips["default"].should.exist;
  });
}); //getTrip endpoints

describe("Get Trips endpoint", function () {
  it("Get Trip method should exist", function () {
    _trips["default"].getTrips.should.exist;
  });
  it("Get trips should return list of trips", function (done) {
    var user = {
      first_name: "Tobi",
      last_name: "Qwerty",
      email: "tobi@123.com"
    };

    var token = _jsonwebtoken["default"].sign(user, "secretKey", {
      expiresIn: 3000
    });

    var data = {
      token: "".concat(token)
    };

    _chai["default"].request(_server["default"]).get("/api/v1/trips", _middleware["default"].checkToken).send(data).end(function (err, res) {
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
describe("Get trips Endpoint Error Handling", function () {
  it("should return an ERROR if Token is not supplied", function (done) {
    _chai["default"].request(_server["default"]).get("/api/v1/trips").end(function (err, res) {
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
      bus_id: "2",
      origin: "Accre",
      destination: "Lagos",
      trip_date: "2019-01-01",
      fare: "40000",
      status: "1",
      token: "fakeToken"
    };

    _chai["default"].request(_server["default"]).get("/api/v1/trips", _middleware["default"].checkToken).send(data).end(function (err, res) {
      res.should.have.status(401);
      res.should.be.json;
      res.body.should.have.property("status");
      res.body.status.should.equal(401);
      res.body.should.have.property("error");
    });

    done();
  });
}); //post trip endpoints

describe("Post Trips endpoint", function () {
  it("Post Trip method should exist", function () {
    _trips["default"].createTrip.should.exist;
  });
  it("Post trips should create a trip", function (done) {
    var user = {
      first_name: "Tobi",
      last_name: "Qwerty",
      email: "tobi@123.com"
    };

    var token = _jsonwebtoken["default"].sign(user, "secretKey", {
      expiresIn: 3000
    });

    var data = {
      bus_id: "2",
      origin: "Accre",
      destination: "Lagos",
      trip_date: "2019-01-01",
      fare: "40000",
      status: "1",
      token: "".concat(token)
    };

    _chai["default"].request(_server["default"]).post("/api/v1/trips", _middleware["default"].checkToken).send(data).end(function (err, res) {
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.property("status");
      res.body.status.should.equal(201);
      res.body.should.have.property("data");
      res.body.data.should.be.a("object");
    });

    done();
  });
});
describe("Post Trips endpoint Error handling", function () {
  it("Should return an error if no bus Id provided", function (done) {
    var user = {
      first_name: "Tobi",
      last_name: "Qwerty",
      email: "tobi@123.com"
    };

    var token = _jsonwebtoken["default"].sign(user, "secretKey", {
      expiresIn: 3000
    });

    var data = {
      //   bus_id: "2",
      origin: "Accre",
      destination: "Lagos",
      trip_date: "2019-01-01",
      fare: "40000",
      status: "1",
      token: "".concat(token)
    };

    _chai["default"].request(_server["default"]).post("/api/v1/trips", _middleware["default"].checkToken).send(data).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.property("status");
      res.body.status.should.equal("Error");
      res.body.should.have.property("error");
    });

    done();
  });
  it("Should return an error if no origin provided", function (done) {
    var user = {
      first_name: "Tobi",
      last_name: "Qwerty",
      email: "tobi@123.com"
    };

    var token = _jsonwebtoken["default"].sign(user, "secretKey", {
      expiresIn: 3000
    });

    var data = {
      bus_id: "2",
      //   origin: "Accre",
      destination: "Lagos",
      trip_date: "2019-01-01",
      fare: "40000",
      status: "1",
      token: "".concat(token)
    };

    _chai["default"].request(_server["default"]).post("/api/v1/trips", _middleware["default"].checkToken).send(data).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.property("status");
      res.body.status.should.equal("Error");
      res.body.should.have.property("error");
    });

    done();
  });
  it("Should return an error if no destination provided", function (done) {
    var user = {
      first_name: "Tobi",
      last_name: "Qwerty",
      email: "tobi@123.com"
    };

    var token = _jsonwebtoken["default"].sign(user, "secretKey", {
      expiresIn: 3000
    });

    var data = {
      bus_id: "2",
      origin: "Accre",
      //   destination: "Lagos",
      trip_date: "2019-01-01",
      fare: "40000",
      status: "1",
      token: "".concat(token)
    };

    _chai["default"].request(_server["default"]).post("/api/v1/trips", _middleware["default"].checkToken).send(data).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.property("status");
      res.body.status.should.equal("Error");
      res.body.should.have.property("error");
    });

    done();
  });
  it("Should return an error if no trip day provided", function (done) {
    var user = {
      first_name: "Tobi",
      last_name: "Qwerty",
      email: "tobi@123.com"
    };

    var token = _jsonwebtoken["default"].sign(user, "secretKey", {
      expiresIn: 3000
    });

    var data = {
      bus_id: "2",
      origin: "Accre",
      destination: "Lagos",
      //   trip_date: "2019-01-01",
      fare: "40000",
      status: "1",
      token: "".concat(token)
    };

    _chai["default"].request(_server["default"]).post("/api/v1/trips", _middleware["default"].checkToken).send(data).end(function (err, res) {
      res.should.have.status(400);
      res.should.be.json;
      res.body.should.be.a("object");
      res.body.should.have.property("status");
      res.body.status.should.equal("Error");
      res.body.should.have.property("error");
    });

    done();
  });
  it("Should return an error if no fare provided", function (done) {
    var user = {
      first_name: "Tobi",
      last_name: "Qwerty",
      email: "tobi@123.com"
    };

    var token = _jsonwebtoken["default"].sign(user, "secretKey", {
      expiresIn: 3000
    });

    var data = {
      bus_id: "2",
      origin: "Accre",
      destination: "Lagos",
      trip_date: "2019-01-01",
      //   fare: "40000",
      status: "1",
      token: "".concat(token)
    };

    _chai["default"].request(_server["default"]).post("/api/v1/trips", _middleware["default"].checkToken).send(data).end(function (err, res) {
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
    _chai["default"].request(_server["default"]).post("/api/v1/trips").end(function (err, res) {
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

    _chai["default"].request(_server["default"]).post("/api/v1/trips", _middleware["default"].checkToken).send(data).end(function (err, res) {
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