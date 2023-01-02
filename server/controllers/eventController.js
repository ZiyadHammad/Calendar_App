const { response } = require("express");
const asyncHandler = require("express-async-handler");
const Event = require("../models/eventSchema");

const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();

  res.status(200).json(events);
});

const postEvent = asyncHandler(async (req, res) => {
  const event = await Event.create({
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
  });

  res.status(200).json(event);
});

const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(400);
    throw new Error(`Cannot find event ${req.params.id}`);
  }
  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedEvent);
});

const deleteEvent = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Deleted event ${req.params.id}` });
});

module.exports = {
  getEvents,
  postEvent,
  updateEvent,
  deleteEvent,
};
