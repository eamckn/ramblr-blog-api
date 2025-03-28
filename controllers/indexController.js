import * as db from "../db/userQueries.js";
import jwt from "jsonwebtoken";

const issueToken = async (user) => {
  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, "secret", { expiresIn: "7d" });
  return token;
};

export const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await db.getUserByEmail(email);
  if (!user) {
    // User does not exist
    // HANDLE NO USER
    res.status(401).json({ message: "User not found" });
  } else {
    const validPassword = password === user.password;
    if (!validPassword) {
      // Password is incorrect
      // HANDLE BAD PASSWORD
      res.status(401).json({ message: "Invalid password" });
    } else {
      const token = await issueToken(user);
      //console.log(token);
      res.status(200).json({
        message: "Successful login",
        token,
      });
    }
  }
};

export const createUser = async (req, res, next) => {
  const { email, username, password } = req.body;
  const user = await db.createUser(email, username, password);
  const token = await issueToken(user);
  res.json({
    message: "user created",
    userCreated: user,
    token,
  });
};

export const getLogInPage = async (req, res, next) => {
  res.json({
    message: "You made it to the log-in page.",
  });
};

export const getRegisterPage = async (req, res, next) => {
  res.json({
    message: "You made it to the register page.",
  });
};
