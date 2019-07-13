import express from "express";
import BookingController from "../controllers/bookings";

const router = express.Router();

router.post("/bookings", BookingController.createBooking);
router.get("/bookings", BookingController.viewBookings);
router.delete("/bookings/:booking_id", BookingController.deleteBooking);

export default router;
