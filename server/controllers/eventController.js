const asyncHandler = require('express-async-handler');

const getEvents = asyncHandler(async (req, res) => {
  res.status(200).json({message: 'Get events'})

})
const postEvent = asyncHandler(async (req, res) => {
  res.status(200).json({message: 'Set event'})

})
const updateEvent = asyncHandler(async (req, res) => {
  res.status(200).json({message: `Updated event ${req.params.id}`})

})
const deleteEvent = asyncHandler(async (req, res) => {
  res.status(200).json({message: `Deleted event ${req.params.id}`})

})


module.exports = {
  getEvents,
  postEvent,
  updateEvent,
  deleteEvent,
}