import Joi from "joi";

export const withdrawReqVSchema = Joi.object({
  amount: Joi.number().positive().required().messages({
    "number.base": "Amount must be a number",
    "number.positive": "Amount must be a positive number",
    "number.min": "Amount must be at least 49",
    "any.required": "Amount is required",
  }),
  reason: Joi.string().min(5).max(500).required().messages({
    "string.base": "Reason must be a text.",
    "string.empty": "Reason is required.",
    "string.min": "Reason must be at least 10 characters long.",
    "string.max": "Reason must be less than or equal to 500 characters long.",
    "any.required": "Reason is required.",
  }),
});
