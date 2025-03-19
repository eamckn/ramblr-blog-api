// App imports
import "dotenv/config";
import "./config/passport.js";
import express from "express";
import cors from "cors";
import path from "node:path";
import postRouter from "./routes/postRouter.js";
import indexRouter from "./routes/indexRouter.js";

// App constants
const PORT = process.env.PORT || 8080;
const __dirname = path.resolve();
const assetsPath = path.join(__dirname, "public");

// App initializations
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// App level middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));
app.use(cors());

// Route level middlewares
app.use("/posts", postRouter);
app.use("/", indexRouter);

// App server
app.listen(PORT, () => {
  console.log(`Server is currently listening on port ${PORT}.`);
});
