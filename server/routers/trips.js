import express from "express";
import TripController from "../controllers/trips";

const router = express.Router();

router.get("/", TripController.getTrips);
router.post("/", TripController.createTrip);
router.patch("/:trip_id", TripController.cancelTrip);

export default router;
