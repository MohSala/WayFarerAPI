const pg = require("pg");
import config from "../../db";
import Bus from "../models/buses";

const pool = new pg.Pool(config);

class BusController {
  static createBus(req, res) {
    const { number_plate, manufacturer, model, year, capacity } = req.body;

    const bus = new Bus(number_plate, manufacturer, model, year, capacity);
    console.log(bus);

    if (bus.number_plate === undefined || bus.number_plate.trim() === "") {
      res.status(400).json({
        status: "Error",
        error: "number plate not supplied"
      });
      return;
    }

    if (bus.manufacturer === undefined || bus.manufacturer.trim() === "") {
      res.status(400).json({
        status: "Error",
        error: "Manufacturer not supplied"
      });
      return;
    }

    if (bus.model === undefined || bus.model.trim() === "") {
      res.status(400).json({
        status: "Error",
        error: "Bus model not supplied"
      });
      return;
    }

    if (bus.year === undefined || bus.year.trim() === "") {
      res.status(400).json({
        status: "Error",
        error: "Year not supplied"
      });
      return;
    }

    if (bus.capacity === undefined || bus.capacity.trim() === "") {
      res.status(400).json({
        status: "Error",
        error: "Capacity not supplied"
      });
      return;
    }

    pool.connect((err, client, done) => {
      if (err) {
        res.status(400).json({
          status: "Error",
          error: "Something went wrong with the connection"
        });
      }
      client.query(
        "INSERT into buses (number_plate, manufacturer, model, year, capacity)  VALUES($1,$2,$3,$4,$5)",
        [bus.number_plate, bus.manufacturer, bus.model, bus.year, bus.capacity],
        (err, result) => {
          if (err) {
            res.status(400).json({
              status: "Error",
              error: "There was an error on insertion"
            });
          }
          res.status(201).json({
            status: "Success",
            data: {
              bus: {
                manufacturer: bus.manufacturer,
                number_plate: bus.number_plate,
                model: bus.model,
                year: bus.year,
                capacity: bus.capacity
              }
            }
          });
        }
      );
      done();
    });
  }
}

export default BusController;
