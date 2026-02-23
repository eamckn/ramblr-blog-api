import passport from "passport";
import passportJWT from "passport-jwt";
import * as db from "../db/userQueries.js";

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

const verifyCallback = async (payload, done) => {
  try {
    const user = await db.getUserById(payload.id);
    if (!user) {
      console.log("user not found");
      return done(null, false);
    } else {
      console.log("user found");
      return done(null, user);
    }
  } catch (err) {
    return done(err);
  }
};

const strategy = new JwtStrategy(options, verifyCallback);

passport.use(strategy);
