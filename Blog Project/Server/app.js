require("./connects/connectToDB");
const express = require("express");
const app = express();
const postRouter = require("./Routes/Posts/postRouter");
const chalk = require("chalk");
const morgan = require("morgan");
const cors = require("cors");

app.use(morgan(chalk.cyan(":method :url :status :response-time ms")));
app.use(cors());

app.use(express.json());
app.use("/api/posts", postRouter);

const PORT = 8181;
app.listen(PORT, () =>
  console.log(chalk.blueBright.bold(`Server run on: http://:localhost:${PORT}`))
);
