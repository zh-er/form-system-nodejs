const reports = require('./report.routes');
const users = require('./user.routes');

const express = require('express');
const router = express.Router();

// const bodyParser = require('body-parser');
const passport = require("passport");
const jwtStrategy = require('./auth/auth')

passport.use(jwtStrategy);

// router.use(bodyParser.urlencoded({extended: false}))
// router.use(bodyParser.json())
// router.use(cors())

router.use('/user', users);
router.use('/report', passport.authenticate('jwt', {session: false}), reports);

module.exports = router;
