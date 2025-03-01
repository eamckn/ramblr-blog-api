import express from "express";
import passport from "passport";
import * as controller from "../controllers/indexController.js";

const router = express.Router();

router.post("/log-in", controller.logIn);

router.post("/register", controller.createUser);

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false, failureRedirect: "/failed" }),
  (req, res, next) => {
    //console.log(req.user);
    res.json({
      message: "You made it to the protected route",
      user: req.user,
    });
  }
);

router.get("/failed", (req, res, next) => {
  res.status(403).json({
    message: "Unauthorized",
  });
});

export default router;
