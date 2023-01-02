const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  start: {
    type: Date,
    required: [true, 'Please add a start date'],

    },
  end: {
      type: Date,
      required: [true, 'Please add a end date'],

      },
  title: {
      type: String,
      required: [true, 'Please add a title'],
      },
},
  {
  timestamps: true,
})

module.exports = mongoose.model('Event', eventSchema)