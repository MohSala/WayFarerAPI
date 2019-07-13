import express from "express";
import TripController from "../controllers/trips";

const router = express.Router();

router.get("/", TripController.getTrips);
router.post("/", TripController.createTrip);

export default router;
