const pg = require("pg");
import config from "../../db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/users";

const pool = new pg.Pool(config);

const validUser = user => {
  const validEmail =
    /(.+)@(.+){2,}\.(.+){2,}/.test(user.email) && user.email.trim() !== "";
  const validPassword =
    typeof user.password === "string" &&
    user.password.trim() !== "" &&
    user.password.trim().length >= 6;
  return validEmail && validPassword;
};

const validateEmail = email => {
  const validEmail =
    /(.+)@(.+){2,}\.(.+){2,}/.test(email) && email.trim() !== "";
  return validEmail;
};

class UserController {
  static signup(req, res) {
    // eslint-disable-next-line object-curly-newline
    const { email, first_name, last_name, password, is_admin } = req.body;

    const user = new User(email, first_name, last_name, password, is_admin);
    console.log(user);
    if (user.first_name === undefined || user.first_name.trim() === "") {
      res.status(400).json({
        status: 400,
        error: "Firstname not supplied"
      });
      return;
    }

    if (user.last_name === undefined || user.last_name.trim() === "") {
      res.status(400).json({
        status: 400,
        error: "Lastname not supplied"
      });
      return;
    }

    if (user.email === undefined || user.email.trim() === "") {
      res.status(400).json({
        status: 400,
        error: "Email not supplied"
      });
      return;
    }

    if (user.password === undefined || user.password.trim() === "") {
      res.status(400).json({
        status: 400,
        error: "Password not supplied"
      });
      return;
    }

    //   if (user.is_admin === undefined || user.is_admin.trim() === '') {
    //     res.status(400).json({
    //       status: 400,
    //       error: 'Admin not supplied',
    //     });
    //     return;
    //   }

    // check validity of user name & password
    if (validUser(user)) {
      pool.connect((err, client, done) => {
        if (err) {
          console.log(err);
        }
        client.query("SELECT email FROM users", (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log(result.rows);
          const newArr = result.rows.map(val => val.email.trim());
          console.log(newArr);

          if (newArr.includes(user.email)) {
            res.status(400).json({
              status: 400,
              error: "Email already used"
            });
          } else {
            // Assign user ID
            user.id = newArr.length !== 0 ? newArr.length + 1 : 1;
            // save user in User Record
            const token = jwt.sign({ user }, "secretKey", {
              expiresIn: "1min"
            });
            console.log("New email being registered");

            // encrypt the valid password with BCRYPT
            bcrypt
              .hash(user.password, 10)

              .then(hash => {
                user.password = hash;
                // connect to the db and save credentials
                pool.connect((err, client, done) => {
                  if (err) {
                    console.log(err);
                  }
                  client.query(
                    "INSERT INTO users (id,email, first_name, last_name, password, is_admin) VALUES ($1, $2, $3, $4, $5,$6)",
                    [
                      user.id,
                      user.email,
                      user.first_name,
                      user.last_name,
                      user.password,
                      user.is_admin
                    ],
                    (err, result) => {
                      if (err) {
                        console.log(err);
                      }
                      console.log(result.rows);
                      console.log("New User created");
                      res.status(201).json({
                        status: 201,
                        data: {
                          token,
                          id: user.id,
                          firstName: user.firstName,
                          lastName: user.lastName,
                          email: user.email
                        }
                      });
                    }
                  );
                  done();
                });
              });
          }
          done();
        });
      });
      // }
    } else {
      // send an error
      res.status(400).json({
        status: 400,
        error: "Password must be minimum of 6 characters"
      });
    }
  }

  static signin(req, res) {
    const { email, password } = req.body;
    const user = { email, password };
    let position = 0;

    if (user.email === undefined || user.email === "") {
      res.status(400).json({
        status: 400,
        error: "Email not supplied"
      });
      return;
    }

    if (user.password === undefined || user.password === "") {
      res.status(400).json({
        status: 400,
        error: "Password not supplied"
      });
      return;
    }

    // Query User Record for credentials
    pool.connect((err, client, done) => {
      const query = "SELECT * FROM users where email=$1";
      const values = [user.email];

      client.query(query, values, (error, result) => {
        done();
        if (error) {
          res.status(400).json({ error });
        }
        if (result.rows == 0) {
          res.status(400).json({
            status: "Failure",
            message: "No User Found"
          });
        } else {
          bcrypt
            .compare(user.password, result.rows[0].password)
            .then(result => {
              if (result == true) {
                const payload = {
                  id: result.id,
                  first_name: result.first_name,
                  last_name: result.last_name
                };
                jwt.sign(
                  payload,
                  "secretKey",
                  { expiresIn: 3600 },
                  (err, token) => {
                    res.status(200).send({
                      status: 200,
                      data: "Bearer " + token
                    });
                  }
                );
              } else {
                res.status(400).send({
                  status: "Failure",
                  result: "Invalid Credentials"
                });
              }
            });
        }
      });
    });
  }
}

//   module.exports = router;
export default UserController;
