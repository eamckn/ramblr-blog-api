import * as db from "../db/postQueries.js";

export const getAllPosts = async (req, res, next) => {
  const posts = await db.getAllPosts();
  res.json(posts);
};

export const getPostById = async (req, res, next) => {
  const { postId } = req.params;
  const post = await db.getPostById(Number(postId));
  res.json(post);
};

export const createPost = async (req, res, next) => {
  // Sample info from req.body
  const reqBody = {
    title: "New post title",
    content: "Here is content for the blog post!",
    userId: 1, // Our sample ADMIN userId
  };
  const post = await db.createPost(
    reqBody.title,
    reqBody.content,
    reqBody.userId
  );
  res.json(post);
};

export const editPost = async (req, res, next) => {
  // Sample info from req.body
  const reqBody = {
    title: "Updated post title",
    content: "Here is updated content for the blog post!",
  };
  const { postId } = req.params;
  const { publish } = req.query;
  if (publish === "TRUE") {
    const post = await db.publishPost(Number(postId));
    res.json(post);
  } else {
    const post = await db.editPost(
      Number(postId),
      reqBody.title,
      reqBody.content
    );
    res.json(post);
  }
};

// export const publishPost = async (req, res, next) => {
//   const { postId } = req.params;
//   const post = await db.publishPost(Number(postId));
//   res.json(post);
// };

export const deletePost = async (req, res, next) => {
  const { postId } = req.params;
  const post = await db.deletePost(Number(postId));
  res.json(post);
};
