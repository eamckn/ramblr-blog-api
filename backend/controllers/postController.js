import * as db from "../db/postQueries.js";

export const createPost = async (req, res, next) => {
  const { title, content } = req.body;
  const userId = 1; // Our ADMIN ID
  const post = await db.createPost(title, content, userId);
  res.json(post);
};

export const getAllPosts = async (req, res, next) => {
  const posts = await db.getAllPosts();
  res.json(posts);
};

export const getPostById = async (req, res, next) => {
  const { postId } = req.params;
  const post = await db.getPostById(Number(postId));
  res.json(post);
};

export const editPost = async (req, res, next) => {
  const { title, content } = req.body;
  const { postId } = req.params;
  const { publish } = req.query;
  if (publish === "t") {
    const post = await db.publishPost(Number(postId));
    res.json(post);
  } else {
    const post = await db.editPost(Number(postId), title, content);
    res.json(post);
  }
};

export const deletePost = async (req, res, next) => {
  const { postId } = req.params;
  const post = await db.deletePost(Number(postId));
  res.json(post);
};
