const Joi = require('@hapi/joi');

//registration validation
exports.regValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  //validation
  return schema.validate(data);
};

//login validation
exports.logValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  //validation
  return schema.validate(data);
};
