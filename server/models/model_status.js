const mongoose = require('mongoose')
const Schema = mongoose.Schema

const statusSchema = new Schema ({
  status: { type: String, required:true },
  email: { type: String },
  userId: { type: String },
  like: [],
  comments: []
}, {
  timestamps: true
})

const Status = mongoose.model('Status', statusSchema)

module.exports = Status;
