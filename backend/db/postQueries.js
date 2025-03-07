import prisma from "../config/prisma.js";

// READ queries
export const getAllPosts = async () => {
  const posts = prisma.post.findMany({
    include: {
      comments: true,
    },
  });
  return posts;
};

export const getPostById = async (id) => {
  const post = prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      comments: true,
    },
  });
  return post;
};

// CREATE queries
export const createPost = async (title, content, userId) => {
  const post = await prisma.post.create({
    data: {
      title,
      content,
      userId,
    },
  });
  return post;
};

// UPDATE queries
export const editPost = async (id, title, content) => {
  const post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      content,
    },
    include: {
      comments: true,
    },
  });
  return post;
};

export const publishPost = async (id) => {
  const post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      isPublished: true,
    },
    include: {
      comments: true,
    },
  });
  return post;
};

// DELETE queries
export const deletePost = async (id) => {
  const comments = prisma.comment.deleteMany({
    where: {
      postId: id,
    },
  });
  const post = prisma.post.delete({
    where: {
      id,
    },
  });
  const transaction = await prisma.$transaction([comments, post]);
  return transaction;
};
