import express from 'express';
import TripController from '../controllers/trips';

const router = express.Router();


router.get('/getTrips', TripController.getTrips);
// router.post('/createTrip', TripController.createTrip);

export default router;