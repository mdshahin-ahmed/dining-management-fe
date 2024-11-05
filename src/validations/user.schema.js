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
  role: Joi.string().valid("admin", "user", "manager").required().messages({
    "string.base": "Role must be a text.",
    "any.only": "Role must be one of admin or manager or user",
    "any.required": "Role is required.",
  }),
});

export const addBalanceSchema = Joi.object({
  amount: Joi.number().positive().min(40).required().messages({
    "number.base": "Amount must be a number",
    "number.positive": "Amount must be a positive number",
    "number.min": "Amount must be at least 50",
    "any.required": "Amount is required",
  }),
});

export const RechargeBalanceSchema = Joi.object({
  type: Joi.string().valid("bkash", "nagad").required().messages({
    "string.base": "Payment method must be a text",
    "any.only": "Payment method must be one of bkash or nagad",
    "any.required": "Payment method is required.",
  }),
  mobile: Joi.string()
    .length(11)
    .pattern(/^01\d+$/)
    .required()
    .messages({
      "string.length": "Please provide a valid number",
      "string.pattern.base": "Please provide a valid number",
      "any.required": "Mobile number is required.",
    }),
  amount: Joi.number()
    .positive() // Balance should be a positive number
    .required()
    .messages({
      "number.base": "Balance must be a number",
      "number.positive": "Balance must be a positive number",
      "any.required": "Balance is required",
    }),
  transactionNumber: Joi.string().required().messages({
    "string.base": "Transaction number is required",
    "any.required": "Transaction number is required",
  }),
});
