import express from "express";
import BookingController from "../controllers/bookings";

const router = express.Router();

router.post("/bookings", BookingController.createBooking);

export default router;
