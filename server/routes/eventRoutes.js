const express = require("express");
const router = express.Router();
const {
  getEvents,
  postEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

router.route('/').get(getEvents).post(postEvent);
router.route('/:id').put(updateEvent).delete(deleteEvent);

module.exports = router;
