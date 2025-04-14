import express from "express";
import passport from "passport";
import * as controller from "../controllers/indexController.js";
import isAdmin from "../auth/admin.js";

const router = express.Router();

// POST routes
router.post("/log-in", controller.logIn);
router.post("/register", controller.createUser);

// Auth testing routes
router.get(
  "/verify",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({
      message: "Success",
      user: req.user,
    });
  }
);

router.get(
  "/verifyAdmin",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  (req, res, next) => {
    res.json({
      message: "Admin verified",
      user: req.user,
    });
  }
);

router.get("/log-out", (req, res, next) => {
  res.json({
    message: "Logout successful",
  });
});

export default router;
