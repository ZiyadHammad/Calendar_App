const { response } = require("express");
const asyncHandler = require("express-async-handler");
const Event = require("../models/eventSchema");
const User = require("../models/userSchema");


const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ user: req.user.id});

  res.status(200).json(events);
});

const postEvent = asyncHandler(async (req, res) => {
  const event = await Event.create({
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
    user_id: req.user.id
  });

  res.status(200).json(event);
});

const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(400);
    throw new Error(`Cannot find event ${req.params.id}`);
  }

  const user = await User.findById(req.user.id)
  // check for user
  if (!user) {
    res.status(401)
    throw new Error(`Cannot find user ${req.user.id}`);
  }
  // make sure logged in user matches goal user
  if (goal.user.toString() !== user.id) {
    res.status(401)
    throw new Error(`User not authorized`)
  }
  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedEvent);
});

const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(400);
    throw new Error(`Cannot find event ${req.params.id}`);
  }
  const user = await User.findById(req.user.id)
  // check for user
  if (!user) {
    res.status(401)
    throw new Error(`Cannot find user ${req.user.id}`);
  }
  // make sure logged in user matches goal user
  if (event.user.toString() !== user.id) {
    res.status(401)
    throw new Error(`User not authorized`)
  }
  await event.remove();
  res.status(200).json({ message: `Event ${req.params.id} has been deleted` });
});

module.exports = {
  getEvents,
  postEvent,
  updateEvent,
  deleteEvent,
};
