const express = require('express');
const router = express.Router();
const { addStatus, getAllStatus, getMyStatus, addComment, upVote, deleteStatus } = require('../controllers/status_controller')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/status', addStatus)

router.get('/allStatus', getAllStatus)

router.post('/myStatus', getMyStatus)

router.post('/addComment', addComment)

router.post('/upvote', upVote)

router.delete('/:id', deleteStatus)

module.exports = router;
