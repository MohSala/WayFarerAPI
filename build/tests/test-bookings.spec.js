// /* eslint-disable no-unused-expressions */
// /* eslint-disable no-undef */
// import chai from "chai";
// import chaiHttp from "chai-http";
// import server from "../server";
// import BookingController from "../controllers/bookings";
// import jwt from "jsonwebtoken";
// import middleware from "../middleware";
// // eslint-disable-next-line no-unused-vars
// const should = chai.should();
// chai.use(chaiHttp);
// describe("Booking Controller", () => {
//   it("Booking Controller should exist", () => {
//     BookingController.should.exist;
//   });
// });
// describe("Get Bookings endpoint", () => {
//   it("Get Bookings method should exist", () => {
//     BookingController.viewBookings.should.exist;
//   });
//   it("Get bookings should return a list of bookings", done => {
//     const user = {
//       first_name: "Tobi",
//       last_name: "Qwerty",
//       email: "tobi@123.com"
//     };
//     const token = jwt.sign(user, "secretKey", { expiresIn: 3000 });
//     const data = {
//       id: "3",
//       token: `${token}`
//     };
//     chai
//       .request(server)
//       .get("/api/v1/bookings", middleware.checkToken)
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
// describe("Get Bookings error handling", () => {
//   it("should return an ERROR if Token is not supplied", done => {
//     chai
//       .request(server)
//       .get("/api/v1/bookings")
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
//       id: "3",
//       token: `fakeToken`
//     };
//     chai
//       .request(server)
//       .get("/api/v1/bookings", middleware.checkToken)
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
"use strict";