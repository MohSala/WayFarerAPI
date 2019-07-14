import express from "express";
import BookingController from "../controllers/bookings";

const router = express.Router();

router.post("/bookings", BookingController.createBooking);
router.get("/bookings", BookingController.viewBookings);

export default router;
