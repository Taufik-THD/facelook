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

  },

  upVote (req, res) {
    let find = true

    Status.find({ _id: req.body.statId }, (err, data) => {
      const likeData = data[0].like

      for (let i = 0; i < likeData.length; i++) {
        if (likeData[i].userId == req.body.likers.userId) {
          find = false
          break
        }
      }

      if (find == true) {
        data[0].like.push(req.body.likers)
        data[0].save()
        res.status(200).json(data)
      } else {
        console.log('udah ngelike');
      }

    })
  },

  deleteStatus (req, res) {
    Status.deleteOne({ _id: req.params.id }, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        const userData = jwt.decode(req.body.token)
        Status.find({ email: userData.email }, (err, data) => {
          res.status(200).json(data)
        })
      }
    })
  }

};
