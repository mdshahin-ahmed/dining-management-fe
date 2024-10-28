import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({ tlds: { allow: false } }),
  mobile: Joi.string()
    .length(11)
    .pattern(/^01\d+$/)
    .required()
    .messages({
      "string.length": "Please provide a valid number",
      "string.pattern.base": "Please provide a valid number",
      "any.required": "Mobile number is required.",
    }),
  hostel: Joi.string().min(3).max(30),
  room: Joi.string().min(1).max(4),
  password: Joi.string().min(5).max(30),
  userId: Joi.string().required(),
  role: Joi.string().valid("admin", "user").required().messages({
    "string.base": "Role must be a text.",
    "any.only": "Role must be one of admin or user",
    "any.required": "Role is required.",
  }),
});

export const addBalanceSchema = Joi.object({
  balance: Joi.number()
    .positive() // Balance should be a positive number
    .required()
    .messages({
      "number.base": "Balance must be a number",
      "number.positive": "Balance must be a positive number",
      "any.required": "Balance is required",
    }),
});
