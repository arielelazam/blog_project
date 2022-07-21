const { Post } = require("./postModel");
const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const { validatedPost } = require("./postValidation");

/* A route for present all the posts */
router.get("/allposts", async (req, res) => {
  try {
    const posts = await Post.find();
    return res.send(posts);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    res.status(500).send(error.message);
  }
});

/* A route for create a new post */
router.post("/createnewpost", async (req, res) => {
  try {
    let post = req.body;
    const { error } = validatedPost(post);
    if (error) {
      console.log(chalk.redBright(error.details[0].message));
      return res.status(400).send(error.details[0].message);
    }

    post = {
      title: post.title,
      description: post.description,
      image: post.image,
    };

    post = new Post(post);
    await post.save();

    return res.send(post);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    res.status(500).send(error.message);
  }
});

module.exports = router;
