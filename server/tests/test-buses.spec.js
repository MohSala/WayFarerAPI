/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server";
import BusController from "../controllers/buses";
import jwt from "jsonwebtoken";
import middleware from "../middleware";
// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

describe("Bus Controller", () => {
  it("Bus Controller should exist", () => {
    BusController.should.exist;
  });
});

//Create bus endpoints
describe("Create Bus endpoint", () => {
  it("Create Bus method should exist", () => {
    BusController.createBus.should.exist;
  });

  it("createBus should create a bus", done => {
    const user = {
      first_name: "Tobi",
      last_name: "Qwerty",
      email: "tobi@123.com"
    };
    const token = jwt.sign(user, "secretKey", { expiresIn: 3000 });
    const data = {
      number_plate: "123345ddd",
      manufacturer: "Toyota",
      model: "American",
      year: "2019",
      capacity: "4",
      token: `${token}`
    };

    chai
      .request(server)
      .post("/api/v1/buses", middleware.checkToken)
      .send(data)
      .end((err, res) => {
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
});

//create bus error handling
describe("Create Buses endpoint Error handling", () => {
  it("Should return an error if no number_plate is provided", done => {
    const user = {
      first_name: "Tobi",
      last_name: "Qwerty",
      email: "tobi@123.com"
    };
    const token = jwt.sign(user, "secretKey", { expiresIn: 3000 });
    const data = {
      // number_plate: "123345ddd",
      manufacturer: "Toyota",
      model: "American",
      year: "2019",
      capacity: "4",
      token: `${token}`
    };

    chai
      .request(server)
      .post("/api/v1/buses", middleware.checkToken)
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.status.should.equal("Error");
        res.body.should.have.property("error");
      });
    done();
  });

  it("Should return an error if no manufacturer is provided", done => {
    const user = {
      first_name: "Tobi",
      last_name: "Qwerty",
      email: "tobi@123.com"
    };
    const token = jwt.sign(user, "secretKey", { expiresIn: 3000 });
    const data = {
      number_plate: "123345ddd",
      //   manufacturer: "Toyota",
      model: "American",
      year: "2019",
      capacity: "4",
      token: `${token}`
    };

    chai
      .request(server)
      .post("/api/v1/buses", middleware.checkToken)
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.status.should.equal("Error");
        res.body.should.have.property("error");
      });
    done();
  });

  it("Should return an error if no model is provided", done => {
    const user = {
      first_name: "Tobi",
      last_name: "Qwerty",
      email: "tobi@123.com"
    };
    const token = jwt.sign(user, "secretKey", { expiresIn: 3000 });
    const data = {
      number_plate: "123345ddd",
      manufacturer: "Toyota",
      //   model: "American",
      year: "2019",
      capacity: "4",
      token: `${token}`
    };

    chai
      .request(server)
      .post("/api/v1/buses", middleware.checkToken)
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.status.should.equal("Error");
        res.body.should.have.property("error");
      });
    done();
  });

  it("Should return an error if no year is provided", done => {
    const user = {
      first_name: "Tobi",
      last_name: "Qwerty",
      email: "tobi@123.com"
    };
    const token = jwt.sign(user, "secretKey", { expiresIn: 3000 });
    const data = {
      number_plate: "123345ddd",
      manufacturer: "Toyota",
      model: "American",
      //   year: "2019",
      capacity: "4",
      token: `${token}`
    };

    chai
      .request(server)
      .post("/api/v1/buses", middleware.checkToken)
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.status.should.equal("Error");
        res.body.should.have.property("error");
      });
    done();
  });

  it("Should return an error if no capacity is provided", done => {
    const user = {
      first_name: "Tobi",
      last_name: "Qwerty",
      email: "tobi@123.com"
    };
    const token = jwt.sign(user, "secretKey", { expiresIn: 3000 });
    const data = {
      number_plate: "123345ddd",
      manufacturer: "Toyota",
      model: "American",
      year: "2019",
      //   capacity: "4",
      token: `${token}`
    };

    chai
      .request(server)
      .post("/api/v1/buses", middleware.checkToken)
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.status.should.equal("Error");
        res.body.should.have.property("error");
      });
    done();
  });

  it("Should return an error if no token provided", done => {
    chai
      .request(server)
      .post("/api/v1/buses")
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("status");
        res.body.status.should.equal(401);
        res.body.should.have.property("error");
      });
    done();
  });

  it("should return an ERROR if Token is invalid", done => {
    const data = {
      bus_id: "2",
      origin: "Accre",
      destination: "Lagos",
      trip_date: "2019-01-01",
      fare: "40000",
      status: "1",
      token: `fakeToken`
    };
    chai
      .request(server)
      .post("/api/v1/buses", middleware.checkToken)
      .send(data)
      .end((err, res) => {
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
