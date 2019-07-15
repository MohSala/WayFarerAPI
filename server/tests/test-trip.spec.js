// /* eslint-disable no-unused-expressions */
// /* eslint-disable no-undef */
// import chai from "chai";
// import chaiHttp from "chai-http";
// import server from "../server";
// import TripController from "../controllers/trips";
// import jwt from "jsonwebtoken";
// import middleware from "../middleware";
// // eslint-disable-next-line no-unused-vars
// const should = chai.should();

// chai.use(chaiHttp);

// describe("Trip Controller", () => {
//   it("Trip Controller should exist", () => {
//     TripController.should.exist;
//   });
// });

// //getTrip endpoints

// describe("Get Trips endpoint", () => {
//   it("Get Trip method should exist", () => {
//     TripController.getTrips.should.exist;
//   });

//   it("Get trips should return list of trips", done => {
//     const user = {
//       first_name: "Tobi",
//       last_name: "Qwerty",
//       email: "tobi@123.com"
//     };
//     const token = jwt.sign(user, "secretKey", { expiresIn: 3000 });
//     const data = {
//       token: `${token}`
//     };

//     chai
//       .request(server)
//       .get("/api/v1/trips", middleware.checkToken)
//       .send(data)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.should.be.json;
//         res.body.should.be.a("object");
//         res.body.should.have.property("status");
//         res.body.status.should.equal(200);
//         res.body.should.have.property("data");
//         res.body.data.should.be.a("object");
//       });
//     done();
//   });
// });

// describe("Get trips Endpoint Error Handling", () => {
//   it("should return an ERROR if Token is not supplied", done => {
//     chai
//       .request(server)
//       .get("/api/v1/trips")
//       .end((err, res) => {
//         res.should.have.status(401);
//         res.should.be.json;
//         res.body.should.have.property("status");
//         res.body.status.should.equal(401);
//         res.body.should.have.property("error");
//       });
//     done();
//   });

//   it("should return an ERROR if Token is invalid", done => {
//     const data = {
//       bus_id: "2",
//       origin: "Accre",
//       destination: "Lagos",
//       trip_date: "2019-01-01",
//       fare: "40000",
//       status: "1",
//       token: `fakeToken`
//     };
//     chai
//       .request(server)
//       .get("/api/v1/trips", middleware.checkToken)
//       .send(data)
//       .end((err, res) => {
//         res.should.have.status(401);
//         res.should.be.json;
//         res.body.should.have.property("status");
//         res.body.status.should.equal(401);
//         res.body.should.have.property("error");
//       });
//     done();
//   });
// });

// //post trip endpoints

// describe("Post Trips endpoint", () => {
//   it("Post Trip method should exist", () => {
//     TripController.createTrip.should.exist;
//   });

//   it("Post trips should create a trip", done => {
//     const user = {
//       first_name: "Tobi",
//       last_name: "Qwerty",
//       email: "tobi@123.com"
//     };
//     const token = jwt.sign(user, "secretKey", { expiresIn: 3000 });
//     const data = {
//       bus_id: "2",
//       origin: "Accre",
//       destination: "Lagos",
//       trip_date: "2019-01-01",
//       fare: "40000",
//       status: "1",
//       token: `${token}`
//     };

//     chai
//       .request(server)
//       .post("/api/v1/trips", middleware.checkToken)
//       .send(data)
//       .end((err, res) => {
//         res.should.have.status(201);
//         res.should.be.json;
//         res.body.should.be.a("object");
//         res.body.should.have.property("status");
//         res.body.status.should.equal(201);
//         res.body.should.have.property("data");
//         res.body.data.should.be.a("object");
//       });
//     done();
//   });
// });

// describe("Post Trips endpoint Error handling", () => {
//   it("Should return an error if no bus Id provided", done => {
//     const user = {
//       first_name: "Tobi",
//       last_name: "Qwerty",
//       email: "tobi@123.com"
//     };
//     const token = jwt.sign(user, "secretKey", { expiresIn: 3000 });
//     const data = {
//       //   bus_id: "2",
//       origin: "Accre",
//       destination: "Lagos",
//       trip_date: "2019-01-01",
//       fare: "40000",
//       status: "1",
//       token: `${token}`
//     };

//     chai
//       .request(server)
//       .post("/api/v1/trips", middleware.checkToken)
//       .send(data)
//       .end((err, res) => {
//         res.should.have.status(400);
//         res.should.be.json;
//         res.body.should.be.a("object");
//         res.body.should.have.property("status");
//         res.body.status.should.equal("Error");
//         res.body.should.have.property("error");
//       });
//     done();
//   });

//   it("Should return an error if no origin provided", done => {
//     const user = {
//       first_name: "Tobi",
//       last_name: "Qwerty",
//       email: "tobi@123.com"
//     };
//     const token = jwt.sign(user, "secretKey", { expiresIn: 3000 });
//     const data = {
//       bus_id: "2",
//       //   origin: "Accre",
//       destination: "Lagos",
//       trip_date: "2019-01-01",
//       fare: "40000",
//       status: "1",
//       token: `${token}`
//     };

//     chai
//       .request(server)
//       .post("/api/v1/trips", middleware.checkToken)
//       .send(data)
//       .end((err, res) => {
//         res.should.have.status(400);
//         res.should.be.json;
//         res.body.should.be.a("object");
//         res.body.should.have.property("status");
//         res.body.status.should.equal("Error");
//         res.body.should.have.property("error");
//       });
//     done();
//   });

//   it("Should return an error if no destination provided", done => {
//     const user = {
//       first_name: "Tobi",
//       last_name: "Qwerty",
//       email: "tobi@123.com"
//     };
//     const token = jwt.sign(user, "secretKey", { expiresIn: 3000 });
//     const data = {
//       bus_id: "2",
//       origin: "Accre",
//       //   destination: "Lagos",
//       trip_date: "2019-01-01",
//       fare: "40000",
//       status: "1",
//       token: `${token}`
//     };

//     chai
//       .request(server)
//       .post("/api/v1/trips", middleware.checkToken)
//       .send(data)
//       .end((err, res) => {
//         res.should.have.status(400);
//         res.should.be.json;
//         res.body.should.be.a("object");
//         res.body.should.have.property("status");
//         res.body.status.should.equal("Error");
//         res.body.should.have.property("error");
//       });
//     done();
//   });

//   it("Should return an error if no trip day provided", done => {
//     const user = {
//       first_name: "Tobi",
//       last_name: "Qwerty",
//       email: "tobi@123.com"
//     };
//     const token = jwt.sign(user, "secretKey", { expiresIn: 3000 });
//     const data = {
//       bus_id: "2",
//       origin: "Accre",
//       destination: "Lagos",
//       //   trip_date: "2019-01-01",
//       fare: "40000",
//       status: "1",
//       token: `${token}`
//     };

//     chai
//       .request(server)
//       .post("/api/v1/trips", middleware.checkToken)
//       .send(data)
//       .end((err, res) => {
//         res.should.have.status(400);
//         res.should.be.json;
//         res.body.should.be.a("object");
//         res.body.should.have.property("status");
//         res.body.status.should.equal("Error");
//         res.body.should.have.property("error");
//       });
//     done();
//   });

//   it("Should return an error if no fare provided", done => {
//     const user = {
//       first_name: "Tobi",
//       last_name: "Qwerty",
//       email: "tobi@123.com"
//     };
//     const token = jwt.sign(user, "secretKey", { expiresIn: 3000 });
//     const data = {
//       bus_id: "2",
//       origin: "Accre",
//       destination: "Lagos",
//       trip_date: "2019-01-01",
//       //   fare: "40000",
//       status: "1",
//       token: `${token}`
//     };

//     chai
//       .request(server)
//       .post("/api/v1/trips", middleware.checkToken)
//       .send(data)
//       .end((err, res) => {
//         res.should.have.status(400);
//         res.should.be.json;
//         res.body.should.be.a("object");
//         res.body.should.have.property("status");
//         res.body.status.should.equal("Error");
//         res.body.should.have.property("error");
//       });
//     done();
//   });

//   it("Should return an error if no token provided", done => {
//     chai
//       .request(server)
//       .post("/api/v1/trips")
//       .end((err, res) => {
//         res.should.have.status(401);
//         res.should.be.json;
//         res.body.should.be.a("object");
//         res.body.should.have.property("status");
//         res.body.status.should.equal(401);
//         res.body.should.have.property("error");
//       });
//     done();
//   });

//   it("should return an ERROR if Token is invalid", done => {
//     const data = {
//       bus_id: "2",
//       origin: "Accre",
//       destination: "Lagos",
//       trip_date: "2019-01-01",
//       fare: "40000",
//       status: "1",
//       token: `fakeToken`
//     };
//     chai
//       .request(server)
//       .post("/api/v1/trips", middleware.checkToken)
//       .send(data)
//       .end((err, res) => {
//         res.should.have.status(401);
//         res.should.be.json;
//         res.body.should.be.a("object");
//         res.body.should.have.property("status");
//         res.body.status.should.equal(401);
//         res.body.should.have.property("error");
//       });
//     done();
//   });
// });
