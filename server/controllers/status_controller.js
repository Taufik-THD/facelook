const Status = require("../models/model_status");
const jwt = require("jsonwebtoken");

module.exports = {

  addStatus (req, res) {
    const userData = jwt.decode(req.body.token)
    const newStatus = {
      status: req.body.status,
      email: userData.email,
      userId: userData.id
    }

    Status.create(newStatus, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        res.status(201).json('success post new status')
      }
    })
  },

  getAllStatus (req, res) {
    Status.find({}, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(data)
      }
    })
  },

  getMyStatus (req, res) {
    const userData = jwt.decode(req.body.token)
    Status.find({ email: userData.email }, (err, data) => {
      res.status(200).json(data)
    })
  },

  addComment (req, res) {
    const token = req.body.token

    const decoded = jwt.decode(token)

    Status.find({ _id: req.body.detail._id }, (err, data) => {
      const comments = {
        comment: req.body.comment,
        commentator: decoded,
        createdAt: new Date()
      }
      data[0].comments.push(comments)
      data[0].comments = data[0].comments.reverse()
      data[0].save()
      res.status(200).json(data)
    })

  }

};
