const express = require('express');
const passport = require("passport");
const {getUser} = require("./user.handler");
const {createUser} = require("./user.handler");
const {loginUser} = require("./user.handler");

const router = express.Router();

router.get('/info', passport.authenticate('jwt', {session: false}), getUser)
router.post('/login', loginUser)
router.post('/signup', createUser)

module.exports = router;
