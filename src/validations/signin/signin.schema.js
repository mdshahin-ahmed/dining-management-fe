import Joi from "joi";

const signinSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({ tlds: { allow: false } }),
});
const signupSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({ tlds: { allow: false } }),
  mobile: Joi.string()
    .length(11)
    .pattern(/^01\d+$/)
    .required()
    .messages({
      "string.length": "Please provide a valid number",
      "string.pattern.base": "Please provide a valid number",
      "any.required": "Input is required.",
    }),
  hostel: Joi.string().min(3).max(30),
  room: Joi.string().min(1).max(4),
  password: Joi.string().min(5).max(30),
});

export { signinSchema, signupSchema };
