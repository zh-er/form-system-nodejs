const passport = require("passport");
const {User} = require("../models/User.model");
const {JWT_SECRET} = require("../../config/config")
const {ExtractJwt} = require("passport-jwt")
const JwtStrategy = require("passport-jwt").Strategy

const opts = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}

const jwtStrategy = new JwtStrategy(
    opts,
    async (payload, done) => {
        try {
            // console.log('payload', payload);
            const user = await User.findOne({
                where: {
                    email: payload.user.email
                }
            })

            if (user) {
                return done(null, user)
            }
            return done(null, false)
        } catch (err) {
            return done(err, false);
        }

    }
)


module.exports = jwtStrategy

