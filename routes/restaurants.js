const express = require("express");
const {getRestaurants,getRestaurant,createRestaurant,updateRestaurant,deleteRestaurant} = require('../controllers/restaurants');
const reservationRouter=require('./reservations');
const memberRouter=require('./member');
const router = express.Router();

const {protect , authorize} = require('../middleware/auth');
router.use('/:restaurantId/reservations/',reservationRouter);
router.use('/:restaurantId/member/',memberRouter);
router.route('/').get(getRestaurants).post(protect, authorize('admin'),createRestaurant);
router.route('/:id').get(getRestaurant).put(protect ,authorize('admin'),updateRestaurant).delete(protect, authorize('admin'),deleteRestaurant);

module.exports = router;