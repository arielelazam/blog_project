const mongoose = require("mongoose");
const chalk = require("chalk");

mongoose
  .connect("mongodb://localhost/blog_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(chalk.magentaBright.bold("Connected to MongoDb!")))
  .catch((error) =>
    console.log(chalk.redBright.bold(`Could not connect to mongoDb: ${error}`))
  );
