import express from "express";
import passport from "passport";
import * as controller from "../controllers/commentController.js";
import isAdmin from "../auth/admin.js";

const router = express.Router({ mergeParams: true });

// GET
router.get("/", controller.getAllCommentsForPost);

// POST
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.createComment
);

// DELETE
router.delete(
  "/:commentId",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  controller.deleteComment
);

export default router;
