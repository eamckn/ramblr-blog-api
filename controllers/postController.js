import * as db from "../db/postQueries.js";
import asyncHandler from "express-async-handler";

export const createPost = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;
  const { id } = req.user;
  const post = await db.createPost(title, content, id);
  res.json(post);
});

export const getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await db.getAllPosts();
  res.json(posts);
});

export const getAllDrafts = asyncHandler(async (req, res, next) => {
  const drafts = await db.getAllDrafts();
  res.json(drafts);
});

export const getAllPublished = asyncHandler(async (req, res, next) => {
  const publishedPosts = await db.getAllPublished();
  res.json(publishedPosts);
});

export const getPostById = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const post = await db.getPostById(Number(postId));
  res.json(post);
});

export const editPost = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;
  const { postId } = req.params;
  const { publish, unpublish } = req.query;
  if (publish === "t") {
    const post = await db.publishPost(Number(postId));
    res.json(post);
  } else if (unpublish === "t") {
    const post = await db.unpublishPost(Number(postId));
    res.json(post);
  } else {
    const post = await db.editPost(Number(postId), title, content);
    res.json(post);
  }
});

export const deletePost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const post = await db.deletePost(Number(postId));
  res.json(post);
});
