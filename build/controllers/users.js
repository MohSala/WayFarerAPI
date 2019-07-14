"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _db = _interopRequireDefault(require("../../db"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _users = _interopRequireDefault(require("../models/users"));

var pg = require("pg");

var pool = new pg.Pool(_db["default"]);

var validUser = function validUser(user) {
  var validEmail = /(.+)@(.+){2,}\.(.+){2,}/.test(user.email) && user.email.trim() !== "";
  var validPassword = typeof user.password === "string" && user.password.trim() !== "" && user.password.trim().length >= 6;
  return validEmail && validPassword;
};

var validateEmail = function validateEmail(email) {
  var validEmail = /(.+)@(.+){2,}\.(.+){2,}/.test(email) && email.trim() !== "";
  return validEmail;
};

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    (0, _classCallCheck2["default"])(this, UserController);
  }

  (0, _createClass2["default"])(UserController, null, [{
    key: "signup",
    value: function signup(req, res) {
      // eslint-disable-next-line object-curly-newline
      var _req$body = req.body,
          email = _req$body.email,
          first_name = _req$body.first_name,
          last_name = _req$body.last_name,
          password = _req$body.password,
          is_admin = _req$body.is_admin;
      var user = new _users["default"](email, first_name, last_name, password, is_admin);
      console.log(user);

      if (user.first_name === undefined || user.first_name.trim() === "") {
        res.status(400).json({
          status: "Error",
          error: "Firstname not supplied"
        });
        return;
      }

      if (user.last_name === undefined || user.last_name.trim() === "") {
        res.status(400).json({
          status: "Error",
          error: "Lastname not supplied"
        });
        return;
      }

      if (user.email === undefined || user.email.trim() === "") {
        res.status(400).json({
          status: "Error",
          error: "Email not supplied"
        });
        return;
      }

      if (user.password === undefined || user.password.trim() === "") {
        res.status(400).json({
          status: "Error",
          error: "Password not supplied"
        });
        return;
      } //   if (user.is_admin === undefined || user.is_admin.trim() === '') {
      //     res.status(400).json({
      //       status: 400,
      //       error: 'Admin not supplied',
      //     });
      //     return;
      //   }
      // check validity of user name & password


      if (validUser(user)) {
        pool.connect(function (err, client, done) {
          if (err) {
            res.status(400).json({
              status: "Error",
              error: "Something went wrong, please try again"
            });
          }

          client.query("SELECT email FROM users", function (err, result) {
            if (err) {
              console.log(err);
            }

            console.log(result.rows);
            var newArr = result.rows.map(function (val) {
              return val.email.trim();
            });
            console.log(newArr);

            if (newArr.includes(user.email)) {
              res.status(400).json({
                status: "Error",
                error: "Email already used"
              });
            } else {
              // Assign user ID
              user.id = newArr.length !== 0 ? newArr.length + 1 : 1; // save user in User Record

              var token = _jsonwebtoken["default"].sign({
                user: user
              }, "secretKey", {
                expiresIn: "1min"
              });

              console.log("New email being registered"); // encrypt the valid password with BCRYPT

              _bcrypt["default"].hash(user.password, 10).then(function (hash) {
                user.password = hash; // connect to the db and save credentials

                pool.connect(function (err, client, done) {
                  if (err) {
                    console.log(err);
                  }

                  client.query("INSERT INTO users (id,email, first_name, last_name, password, is_admin) VALUES ($1, $2, $3, $4, $5,$6)", [user.id, user.email, user.first_name, user.last_name, user.password, user.is_admin], function (err, result) {
                    if (err) {
                      console.log(err);
                    }

                    console.log(result.rows);
                    console.log("New User created");
                    res.status(201).json({
                      status: "Success",
                      data: {
                        token: token,
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                      }
                    });
                  });
                  done();
                });
              });
            }

            done();
          });
        }); // }
      } else {
        // send an error
        res.status(400).json({
          status: "Error",
          error: "Password must be minimum of 6 characters"
        });
      }
    }
  }, {
    key: "signin",
    value: function signin(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;
      var user = {
        email: email,
        password: password
      };
      var position = 0;

      if (user.email === undefined || user.email === "") {
        res.status(400).json({
          status: "Error",
          error: "Email not supplied"
        });
        return;
      }

      if (user.password === undefined || user.password === "") {
        res.status(400).json({
          status: "Error",
          error: "Password not supplied"
        });
        return;
      } // Query User Record for credentials


      pool.connect(function (err, client, done) {
        var query = "SELECT * FROM users where email=$1";
        var values = [user.email];
        client.query(query, values, function (error, result) {
          done();

          if (error) {
            res.status(400).json({
              error: error
            });
          }

          if (result.rows == 0) {
            res.status(400).json({
              status: "Error",
              message: "No User Found"
            });
          } else {
            _bcrypt["default"].compare(user.password, result.rows[0].password).then(function (result) {
              if (result == true) {
                var payload = {
                  id: result.id,
                  first_name: result.first_name,
                  last_name: result.last_name
                };

                _jsonwebtoken["default"].sign(payload, "secretKey", {
                  expiresIn: 3600
                }, function (err, token) {
                  res.status(200).send({
                    status: 200,
                    data: {
                      token: token,
                      email: user.email
                    }
                  });
                });
              } else {
                res.status(400).send({
                  status: "Error",
                  result: "Invalid Credentials"
                });
              }
            });
          }
        });
      });
    }
  }]);
  return UserController;
}(); //   module.exports = router;


var _default = UserController;
exports["default"] = _default;