import express from "express";
import passport from "passport";
import * as controller from "../controllers/indexController.js";
import isAdmin from "../auth/admin.js";

const router = express.Router();

// GET routes
router.get("/log-in", controller.getLogInPage);
router.get("/register", controller.getRegisterPage);

// POST routes
router.post("/log-in", controller.logIn);
router.post("/register", controller.createUser);

// Auth testing routes
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

export default router;

// TODOS
// - create all routes
// - differentiate admin routes and user routes
