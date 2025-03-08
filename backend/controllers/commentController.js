import * as db from "../db/commentQueries.js";

export const createComment = async (req, res, next) => {
  const { content } = req.body;
  const { postId } = req.params;
  const comment = await db.createComment(Number(postId), content);
  res.json(comment);
};

export const getAllCommentsForPost = async (req, res, next) => {
  const { postId } = req.params;
  const comments = await db.getAllCommentsFromPostId(Number(postId));
  res.json(comments);
};

export const deleteComment = async (req, res, next) => {
  const { commentId } = req.params;
  const comment = await db.deleteComment(Number(commentId));
  res.json(comment);
};
