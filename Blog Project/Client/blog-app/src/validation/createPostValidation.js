import Joi from "joi-browser";

const createPostSchema = {
  title: Joi.string().min(2).max(256).required(),
  image: Joi.string().min(11),
};

export default createPostSchema;
