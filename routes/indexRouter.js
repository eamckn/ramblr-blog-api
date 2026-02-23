import express from "express";
import passport from "passport";
import * as controller from "../controllers/indexController.js";
import isAdmin from "../auth/admin.js";

const router = express.Router();

// POST routes
router.post("/log-in", controller.logIn);
router.post("/register", controller.createUser);
router.post("/admin", controller.logInAdmin);
// Logout route
router.post(
  "/log-out",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.sendStatus(200);
  }
);

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
  "/admin",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  (req, res, next) => {
    res.json({
      message: "Admin verified",
      user: req.user,
    });
  }
);

export default router;
