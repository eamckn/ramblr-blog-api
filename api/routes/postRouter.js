import express from "express";
import passport from "passport";
import commmentsRouter from "./commentRouter.js";
import * as controller from "../controllers/postController.js";
import isAdmin from "../auth/admin.js";

const router = express.Router();

router.use("/:postId/comments", commmentsRouter);

// GET
router.get("/", controller.getAllPosts);
router.get("/:postId", controller.getPostById);

// POST
router.post(
  "/",
  passport.authenticate("jwt", { session: false, failureRedirect: "/failed" }),
  isAdmin,
  controller.createPost
);

// PUT
router.put(
  "/:postId",
  passport.authenticate("jwt", { session: false, failureRedirect: "/failed" }),
  isAdmin,
  controller.editPost
);

// DELETE
router.delete(
  "/:postId",
  passport.authenticate("jwt", { session: false, failureRedirect: "/failed" }),
  isAdmin,
  controller.deletePost
);

export default router;
