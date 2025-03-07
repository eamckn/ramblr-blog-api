import prisma from "../config/prisma.js";

// READ queries
export const getAllCommentsFromPostId = async (id) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId: id,
    },
    include: {
      post: true,
    },
  });
  return comments;
};

// CREATE queries
export const createComment = async (postId, content) => {
  const comment = await prisma.comment.create({
    data: {
      content,
      postId,
    },
  });
  return comment;
};

// DELETE queries
export const deleteComment = async (id) => {
  const comment = await prisma.comment.delete({
    where: {
      id,
    },
  });
  return comment;
};
