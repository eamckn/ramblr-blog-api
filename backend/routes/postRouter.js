import express from "express";
import * as controller from "../controllers/postController.js";

const router = express.Router();

// GET
router.get("/", controller.getAllPosts);
router.get("/:postId", controller.getPostById);

// POST
router.post("/", controller.createPost);

// PUT
router.put("/:postId", controller.editPost);
// router.put("/:postId/publish", controller.publishPost);

// DELETE
router.delete("/:postId", controller.deletePost);

export default router;
