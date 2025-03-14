import express from "express";
import * as controller from "../controllers/commentController.js";

const router = express.Router({ mergeParams: true });

// GET
router.get("/", controller.getAllCommentsForPost);

// POST
router.post("/", controller.createComment);

// DELETE
router.delete("/:commentId", controller.deleteComment);

export default router;
