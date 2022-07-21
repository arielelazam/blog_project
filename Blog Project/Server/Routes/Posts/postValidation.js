const Joi = require("joi");

function validatedPost(product) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    image: Joi.string().min(11),
  });
  return schema.validate(product);
}
exports.validatedPost = validatedPost;
