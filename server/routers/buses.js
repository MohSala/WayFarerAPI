import express from "express";
import BusController from "../controllers/buses";

const router = express.Router();

router.post("/buses", BusController.createBus);
router.get("/buses", BusController.viewBus);

export default router;
