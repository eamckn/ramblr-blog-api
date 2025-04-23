// App imports
import "dotenv/config";
import "./config/passport.js";
import express from "express";
import cors from "cors";
import postRouter from "./routes/postRouter.js";
import indexRouter from "./routes/indexRouter.js";

// App constants
const PORT = process.env.PORT || 8080;

// App initializations
const app = express();

// App level middlewares
app.use(express.json());
app.use(cors());

// Route level middlewares
app.use("/posts", postRouter);
app.use("/", indexRouter);

// Error middleware
app.use((err, req, res, next) => {
  res.status(500).send(err);
});

// App server
app.listen(PORT, () => {
  console.log(`Server is currently listening on port ${PORT}.`);
});
