import express from "express";
import BusController from "../controllers/buses";

const router = express.Router();

router.post("/buses", BusController.createBus);

export default router;
