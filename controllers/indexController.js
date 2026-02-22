import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import issueToken from "../auth/issueToken.js";
import * as db from "../db/userQueries.js";

export const logIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await db.getUserByEmail(email);
  if (!user) {
    // User does not exist
    res.status(401).json({
      message: "User not found",
    });
  } else {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      // Password is incorrect
      res.status(401).json({
        message: "Invalid password",
      });
    } else {
      const token = await issueToken(user);
      //console.log(token);
      res.status(200).json({
        message: "Successful login",
        token,
      });
    }
  }
});

export const logInAdmin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await db.getUserByEmail(email);
  if (!user) {
    res.status(401).json({
      message: "User not found.",
    });
  } else if (user.role !== "ADMIN") {
    res.status(403).json({
      message: "User not authorized as an admin.",
    });
  } else {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({
        message: "Invalid admin password",
      });
    } else {
      const token = await issueToken(user);
      res.status(200).json({
        message: "Admin verified",
        token,
      });
    }
  }
});

export const createUser = asyncHandler(async (req, res, next) => {
  const { email, username, password } = req.body;
  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      return next(err);
    } else {
      const user = await db.createUser(email, username, hashedPassword);
      const token = await issueToken(user);
      res.json({
        message: "Success: User created",
        userCreated: user,
        token,
      });
    }
  });
});
