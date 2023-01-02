const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    start: Date,
    end: Date,
    title: String,
},
  {
  timestamps: true,
})

module.exports = mongoose.model('Event', eventSchema)