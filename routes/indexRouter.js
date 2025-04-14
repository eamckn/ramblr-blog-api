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
  "/admin",
  passport.authenticate("jwt", { session: false, failureRedirect: "/failed" }),
  isAdmin,
  (req, res, next) => {
    res.json({
      message: "you made it! hello admin eamon",
      user: req.user,
    });
  }
);

router.get("/failed", (req, res, next) => {
  res.status(403).json({
    message: "Unauthorized",
  });
});

router.get("/log-out", (req, res, next) => {
  res.json({
    message: "Logout successful",
  });
});

export default router;

// TODOS
// - create all routes
// - differentiate admin routes and user routes
