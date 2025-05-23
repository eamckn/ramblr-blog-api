import asyncHandler from "express-async-handler";
import * as db from "../db/commentQueries.js";

export const createComment = asyncHandler(async (req, res, next) => {
  const { content, userId } = req.body;
  const { postId } = req.params;
  const comment = await db.createComment(Number(postId), content, userId);
  res.json(comment);
});

export const getAllCommentsForPost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const comments = await db.getAllCommentsFromPostId(Number(postId));
  res.json(comments);
});

export const deleteComment = asyncHandler(async (req, res, next) => {
  const { commentId } = req.params;
  const comment = await db.deleteComment(Number(commentId));
  res.json(comment);
});
