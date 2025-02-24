import * as db from "../db/commentQueries.js";

export const getAllCommentsForPost = async (req, res, next) => {
  const { postId } = req.params;
  const comments = await db.getAllCommentsFromPostId(Number(postId));
  res.json(comments);
};

export const createComment = async (req, res, next) => {
  // Sample info from req.body
  const reqBody = {
    content: "Here is my first comment on a post!",
  };
  const { postId } = req.params;
  const comment = await db.createComment(Number(postId), reqBody.content);
  res.json(comment);
};

export const deleteComment = async (req, res, next) => {
  const { commentId } = req.params;
  const comment = await db.deleteComment(Number(commentId));
  res.json(comment);
};
