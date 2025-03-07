import express from "express";
import commmentsRouter from "./commentRouter.js";
import * as controller from "../controllers/postController.js";

const router = express.Router();

router.use("/:postId/comments", commmentsRouter);

// GET
router.get("/", controller.getAllPosts);
router.get("/:postId", controller.getPostById);

// POST
router.post("/", controller.createPost);

// PUT
router.put("/:postId", controller.editPost);

// DELETE
router.delete("/:postId", controller.deletePost);

export default router;
