var express = require('express');
var router = express.Router();
const { getUsers, signUp, signIn } = require("../controllers/user_controller");

/* GET users listing. */

router.get("/:id", getUsers)
router.post("/signup", signUp)
router.post("/signIn", signIn)

module.exports = router;
