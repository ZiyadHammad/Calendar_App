const express = require("express");
const router = express.Router();
const {
  getEvents,
  postEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getEvents).post(protect,postEvent);
router.route('/:id').put(protect,updateEvent).delete(protect,deleteEvent);

module.exports = router;
